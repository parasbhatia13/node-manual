import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import http from "http"
import router from "./routes/api.js";
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8081
const server = http.createServer(app);


app.use(cors());
app.use(express.json())

app.use("/api", router)


app.use((err, req, res, next) => {
    console.log(err, "Error in starting the server")
    res.status(500).json({ error: 'Internal server error' });
})

server.listen(PORT, ()=>{
    console.log(`App is listening to http://localhost:${PORT}`)
})