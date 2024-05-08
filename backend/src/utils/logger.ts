import {createLogger, format, transports} from 'winston';

const {combine, timestamp} = format;

import DailyRotateFile from 'winston-daily-rotate-file';

const genericOptions = {
    handleExceptions: true,
    json: false,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    maxSize: '20m',
    maxFiles: 20,
    extension:'.log'
};

const logOptions = {
    fileDebug: new DailyRotateFile({
        filename: './log/debug',
        level:'debug',
        ...genericOptions
    }),
    fileInfo: new DailyRotateFile({
        filename: './log/info',
        level: 'info',
        ...genericOptions
    }),
    fileError: new DailyRotateFile({
        level: 'error',
        filename: './log/error',
        ...genericOptions
    }),
    fileWarn: new DailyRotateFile({
        level: 'warn',
        filename: './log/warning',
        ...genericOptions
    }),
    console: {
        level: process.env.NODE_ENV === 'test' ? 'error' : 'info',
        handleExceptions: true,
        json: true,
        colorize: true,
    },
};
const logger = createLogger({
    format: combine(
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        //@ts-ignore
        format.printf(i => `${i.timestamp} | ${i.message}`)
    ),
    transports: [
        new transports.Console(logOptions.console),
        logOptions.fileInfo,
        logOptions.fileError,
        logOptions.fileWarn,
        logOptions.fileDebug,
    ],
    exitOnError: false,
});

export default logger;
