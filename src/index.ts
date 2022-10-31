import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import routes from './routes/routes'
import cookieParser from 'cookie-parser'


void async function() {
  const app = express()
  app.use(cors({
    origin: ["*"],
    credentials: true,
    methods: ["POST", "GET", "OPTIONS", "DELETE"],
    exposedHeaders: ["*", "Authorization"],
    allowedHeaders: ["*", "Authorization"],
  }))
  app.use(cookieParser())
  app.use(express.json())
  app.use(routes)
  app.listen(8080, () => console.log("Server is running")) 
}()