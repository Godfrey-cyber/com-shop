import express from "express"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import helmet from "helmet"
import dotenv from "dotenv"
import cors from "cors"
import { errorHandler } from "./middleware/errorMiddleware.js"

//error handler

//routes
import authRoute from "./routes/auth.js"
import userRoutes from "./routes/usersRoutes.js"
import productRoutes from "./routes/productsRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import subCategoryRoutes from "./routes/subCategoryRoutes.js"
import stripeRoute from "./routes/stripeRoute.js"
const app = express()
app.use(cookieParser())
dotenv.config()
app.use(errorHandler)
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_DB_URL).then(() => console.log("Database running")).catch((err) => {
	console.log(err)
})
mongoose.connection.on("disconnected", () => {
    console.log("MongoDb disconnected")
})
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use("/api/users", authRoute)
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/subcategory", subCategoryRoutes)
app.use("/api/checkout", stripeRoute)
app.listen(process.env.PORT || 5000, () => {
	console.log(`Backend running on port ${process.env.PORT}`)
})