import { createLogger, format, transports } from 'winston';

const { combine, timestamp, json, metadata } = format;

// eslint-disable-next-line import/prefer-default-export
export const logger = createLogger({
	transports: [
		new transports.Console({
			level: 'debug',
			handleExceptions: true,
			format: combine(metadata(), timestamp(), json())
		})
	]
});

