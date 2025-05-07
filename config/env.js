import {config} from 'dotenv';
import process from 'node:process';

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const { 
    PORT,
    SERVER_URL,
    NODE_ENV,
    DB_URI,
    JWT_SECRET, JWT_EXPIRES_IN,
    ARCJET_ENV,ARCJET_KEY,
    ARCJET_API_KEY,ARCJET_API_URL,
    QSTASH_URL,QSTASH_TOKEN,QSTASH_CURRENT_SIGNING_KEY,QSTASH_NEXT_SIGNING_KEY
    

    
    
} = process.env;
