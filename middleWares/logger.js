const logger = (req, res, next) => {
  console.log(`${rq.method} ${req.url}`);
  next();
};

module.exports = logger;
