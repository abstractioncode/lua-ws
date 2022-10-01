const logger = require('npmlog');
const fs    = require('fs');
const path  = require('path');
const logs = fs.createWriteStream(path.join(__dirname+"./../../Logs/", 'logs.txt'), { flags: 'a' });
exports.LogWarn = function (message) {
    logger.info(message);
    logs.write(message +"\n");
}
exports.LogInfo = function (message) {
    logger.info(message);
    logs.write(message +"\n");
}
exports.LogError = function (message) {
    logger.error(message);
    logs.write(message +"\n");
}