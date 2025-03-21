import debug from "debug";

const logger = debug("http");

const loggerMiddleware = (req, res, next) => {
  logger(`${req.method} - ${req.url}`);
  next();
};

export default loggerMiddleware;
