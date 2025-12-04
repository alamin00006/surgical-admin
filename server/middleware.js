// server/middleware.js
module.exports = (req, res, next) => {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // Log requests
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  // Delay simulation for development
  if (process.env.NODE_ENV === "development") {
    const delay = Math.floor(Math.random() * 1000) + 200; // 200ms - 1200ms
    setTimeout(next, delay);
  } else {
    next();
  }
};
