// Health check endpoint for VastraVerse API
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    },
    body: JSON.stringify({
      success: true,
      message: 'VastraVerse API is running on Netlify Functions!',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    })
  };
};
