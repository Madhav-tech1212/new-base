import {config} from 'dotenv';
import process from 'node:process';

config({path: `${process.env.NODE_ENV || 'development'}.local`}); // eslint-disable-line no-undef

export const { PORT,NODE_END} = process.env;