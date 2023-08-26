import {Sequelize } from "sequelize";
import * as dotenv from "dotenv";

// export let sequelize = new Sequelize("sqlite::memory:");
// if (process.env.NODE_ENV !== 'test') {
// 	sequelize = new Sequelize(process.env.DB_NAME ??
// 		'MISSING_DB_NAME_CONFIG',

// 		process.env.DB_USERNAME ??

// 		'MISSING_DB_USERNAME_CONFIG',

// 		process.env.DB_PASSWORD ??
// 		'MISSING_DB_PASSWORD_CONFIG', {
// 		host: process.env.DB_HOST ?? 'MISSING_DB_HOST_CONFIG',
// 		port: parseInt(process.env.DB_PORT as string) ??
// 			"MISSING_DB_PORT_CONFIG",
// 		dialect: (process.env.DB_DIALECT as Dialect) ??
// 			'postgres',
// 	});
// }
dotenv.config();

const connString = "postgres://postgres:322551Vfve!@127.0.0.1:5432/bookshop";
// const connString = `postgres://${process.env.PORT}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

export const sequelize = new Sequelize(connString);
