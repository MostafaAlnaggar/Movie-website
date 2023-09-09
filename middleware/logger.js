const fs = require("fs");
const path = require("path");

const logger = (req, res, next) => {
  const method = req.method;
  const date = new Date();
  const reqPath = req.path;
  const theLog = method + reqPath + date + "\n";

  const logRelativePath = "../log.txt";

  const logFilePath = path.resolve(__dirname, logRelativePath);

  fs.appendFile(logFilePath, theLog, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
  next();
};

module.exports = logger;
