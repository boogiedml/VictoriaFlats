import jwt from "jsonwebtoken";

const apiRoute = "/api/v1";

const verifyJwt = (req, res, next) => {
  const publicRoutes = [
    { path: `/`, method: "GET" },
    { path: `${apiRoute}/admin/login`, method: "POST" },
    { path: `${apiRoute}/admin/register`, method: "POST" },
    { path: `${apiRoute}/bookings`, method: "GET" },
    { path: `${apiRoute}/rooms`, method: "GET" },
    { path: `${apiRoute}/bookings`, method: "POST" },
    { path: `${apiRoute}/bookings`, method: "PUT" },
  ];

  const isPublicRoute = publicRoutes.some(
    (route) => req.path.startsWith(route.path) && req.method === route.method
  );

  if (isPublicRoute) {
    // Skip token verification for public routes
    next();
  } else if (req.headers.token && req.headers.token.startsWith("Bearer ")) {
    const token = req.headers.token.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403).json({
          error: true,
          message: "Invalid or expired token",
          code: 403,
        });
      } else {
        // Verification successful, call next() to proceed
        next();
      }
    });
  } else {
    res.status(401).json({
      error: true,
      message: "Token is missing",
      code: 401,
    });
  }
};

export default verifyJwt;
