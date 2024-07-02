const winston = require('winston');
const { combine, timestamp, printf, splat } = winston.format;

const logFormat = printf(({ timestamp, level, message, ...metadata }) => {
  const ts = timestamp.slice(0, 19).replace('T', ' ');
  return `${ts} [${level.toUpperCase()}]: ${message} ${
    Object.keys(metadata).length ? JSON.stringify(metadata, null, 2) : ''
  }`;
});


const logger = winston.createLogger({
  level: 'info', 
  format: combine(
    timestamp(), 
    splat(), 
    logFormat 
  ),
  transports: [
    new winston.transports.Console(), 
    new winston.transports.File({ filename: 'error.log', level: 'error' }), 
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = logger;