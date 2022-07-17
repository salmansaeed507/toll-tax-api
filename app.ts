import express, { Express, Request, Response } from "express";
import router from "./routes";
import mongoose, { mongo } from "mongoose";

const app: Express = express()

//connect to db
mongoose.connect('mongodb+srv://salman507:ra6oKzdWGQ0GBCwZ@cluster0.3dr7o.mongodb.net/tolltax?retryWrites=true&w=majority');
const connection = mongoose.connection
console.log("Connecting to database...")
connection.on("error", () => {
  console.log("Could not connect to mongodb")
})
connection.on("connected", () => {
  console.log("Connected to mongodb successfully!!")
})

//other
app.use(express.json())
app.use('/', router)

app.use((err: any, req: Request, res: Response, next: Function) => {
  res.status(500).send('Something broke!')
})

//start server
app.listen(3000, () => {
  console.log("listening...")
})