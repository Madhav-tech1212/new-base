import mongoose from 'mongoose'
import { DB_URI, NODE_ENV } from '../config/env.js'

if(!DB_URI) {
  throw new Error('DB_URI is not defined')
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
    })
     
    console.log(`MongoDB connected to ${NODE_ENV} successfully`)
  } catch (error) {
    console.error('MongoDB connection error:', error.message)
    // eslint-disable-next-line no-undef
    process.exit(1)
  }
}


export default connectDB;