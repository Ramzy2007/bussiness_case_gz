const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger = createLogger({
    format: logFormat,
    transports: [
        new transports.Console(), // Log to console
        new transports.DailyRotateFile({ // Log to daily files
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d' // Keep logs for 14 days
        })
    ]
});

module.exports = logger;