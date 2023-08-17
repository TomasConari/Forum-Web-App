import Jwt from "jsonwebtoken";

export const tokenVerify = (req, res, next) => {
    const token = req.headers["auth-token"];
    if(!token){
        return res.status(401).json({
            message: "Access Denied"
        });
    };
    try{
        Jwt.verify(token, "secretKey", (err, decoded) => {
            if(err){
                return res.status(401).json({
                    message: "Access Denied"
                });
            }
            req.user = decoded;
            next();
        });
    }catch(error) {
        res.status(400).json({
            message: error
        });
    };
};