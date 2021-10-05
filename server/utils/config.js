import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// defining __dirname with the help of import.meta.url; otherwise __dirname will be undefined when using ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// processing the appropriate .env file
// in 'development' mode, the environment variables from .env.development will be used
// in 'production' mode, the environment variables from .env.production will be used
dotenv.config({
	path: path.resolve(__dirname, '..', `.env.${process.env.NODE_ENV}`),
});

const config = {
	PORT: process.env.PORT,

	MYSQL_USER: process.env.MYSQL_USER,
	MYSQL_HOST: process.env.MYSQL_HOST,
	MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
	MYSQL_DATABASE: process.env.MYSQL_DATABASE,

	JWT_SECRET: process.env.JWT_SECRET,
};
export default config;
