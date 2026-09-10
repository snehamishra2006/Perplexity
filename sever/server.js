


import "dotenv/config"

import app from "./src/app.js"
import http from "http"
import connectToDb from "./src/config/database.js"
import { initSocket } from "./src/sockets/server.socket.js"

const PORT = process.env.PORT || 8000

const httpServer = http.createServer(app)

initSocket(httpServer)

connectToDb()

.catch((err)=>{
    console.log("mongoDB connection failed")
    process.exit(1)
})

httpServer.listen(PORT, ()=>{
    console.log(`Server running on porrt ${PORT}`)

})