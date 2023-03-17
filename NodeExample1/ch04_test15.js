var winston = require("winston"); // 로그 처리 모듈
var winstonDaily = require("winston-daily-rotate-file"); // 로그 일별 처리 모듈
var moment = require("moment"); // 시간 처리 모듈

function timeStampFormat() {
  return moment().format("YYYY-MM-DD HH:mm:ss.SSS ZZ");
}

var logger = new winston.Logger({
  transports: [
    new winstonDaily({
      name: "info-file",
      filename: "./log/server",
      datePattern: "_yyyy-MM-dd.log",
      colorize: false,
      maxsize: 5000000,
      maxFiles: 1000,
      level: "info",
      showLevel: true,
      json: false,
      timestamp: timeStampFormat,
    }),
    /*  new winston.transport({
      name: "debug-console",
      colorize: true,
      level: "debug",
      showLevel: true,
      json: false,
      timestamp: timeStampFormat,
    }), */
  ],
});

logger.debug("디버깅 메세지입니다.");
logger.error("에러 메세지입니다.");
