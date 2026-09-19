
// import jwt from "jsonwebtoken" ;
// export function authUser(req, res, next) {

//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).json({
//             message: "Unauthorized",
//             success: false,
//             err: "No token provided"
//         })
//     }

//     try {

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         req.user = decoded;

//         next();

//     } catch (err) {
//         return res.status(401).json({
//             message: "Unauthorized",
//             success: false,
//             err: "Invalid token"
//         })
//     }

// }


import jwt from "jsonwebtoken";
import redis from "../config/cache.js";

export async function authUser(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
            success: false,
            err: "No token provided"
        })
    }

    try {
        const isBlacklisted = await redis.get(`bl:${token}`);

        if (isBlacklisted) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false,
                err: "Token has been revoked"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized",
            success: false,
            err: "Invalid token"
        })
    }
}

