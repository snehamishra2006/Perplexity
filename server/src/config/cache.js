import { createClient } from "redis"

const redis = createClient({
    username: "default",
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
})

redis.on("error", (err) => console.log("Redis error:", err.message))

await redis.connect()
console.log("connected to redis")

export default redis