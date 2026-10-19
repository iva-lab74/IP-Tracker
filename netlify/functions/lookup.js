exports.handler = async (event) => {
  const query = event.queryStringParameters?.q || "";
  const isIP = /^(\d{1,3}\.){3}\d{1,3}$/.test(query);

  let param = "";
  if (query) {
    param = isIP ? `&ipAddress=${query}` : `&domain=${query}`;
  } else {
    // The middleman runs on Netlify's computer, so "my IP" would be Netlify's.
    // Netlify tells us the visitor's real IP in this header.
    const visitorIP = event.headers["x-nf-client-connection-ip"];
    if (visitorIP && visitorIP !== "::1" && visitorIP !== "127.0.0.1") {
      param = `&ipAddress=${visitorIP}`;
    }
  }

  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.IPIFY_API_KEY}${param}`;

  const response = await fetch(url);
  const data = await response.json();

  return { statusCode: response.status, body: JSON.stringify(data) };
};

//this is needed for api