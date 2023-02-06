import express from "express"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import helmet from "helmet"
import dotenv from "dotenv"
import cors from "cors"

//error handler

//routes
import authRoute from "./routes/auth.js"
import userRoutes from "./routes/usersRoutes.js"


const app = express()
app.use(cors())
app.use(cookieParser())
dotenv.config()
// app.use(errorHandler)
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_DB_URL).then(() => console.log("DB Running")).catch((err) => {
	console.log(err)
})
mongoose.connection.on("disconnected", () => {
    console.log("MongoDb disconnected")
})
app.use(helmet())
app.use(express.json())
//routes
app.use("/api/users", authRoute)
app.use("/api/users", userRoutes)
app.listen(process.env.PORT || 5000, () => {
	console.log("Backend is running")
})