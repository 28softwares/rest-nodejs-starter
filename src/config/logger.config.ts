import winston, { format } from 'winston';
import { DotenvConfig, Environment } from './env.config';

const { printf, timestamp, combine, errors, json } = format;

const myFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

let transports: (
  | winston.transports.ConsoleTransportInstance
  | winston.transports.FileTransportInstance
)[];

if (DotenvConfig.NODE_ENV === Environment.DEVELOPMENT) {
  transports = [new winston.transports.Console()];
} else {
  transports = [
    new winston.transports.File({ filename: 'public/logs/log.json' }),
  ];
}

// warn: message.
const logger = winston.createLogger({
  level: DotenvConfig.LOG_LEVEL,
  format: combine(
    // colorize(),
    timestamp({ format: 'YYYY-mm-dd HH:mm' }),
    errors({ stack: true }),
    json(),
    // myFormat
  ), // text - format.
  transports,
});

export { logger };
