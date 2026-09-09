import "dotenv/config"


import app from "./src/app.js"
import connectToDb from "./src/config/database.js"

const PORT = process.env.PORT || 8000


connectToDb()

.catch((err)=>{
    console.log("mongoDB connection failed")
    process.exit(1)
})

app.listen(PORT, ()=>{
    console.log(`Server running on porrt ${PORT}`)

})