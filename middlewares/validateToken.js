const { request, response } = require('express');
const jwt = require('jsonwebtoken')

const validateJWT = (req = request, res = response, next) => {
    try {
        const token = req.header('x-token') // this header is personalized and is like react must send it to the back
        if(!token){
            return res.status(401).json({
                ok:false,
                msg: 'There is no exist token in the request'
            })
        }
        const payload = jwt.verify(token, process.env.JWT_KEY);
        req.uid = payload.uid  // is uid of the user
        next();        
    } catch (e) {
        return res.status(401).json({
            ok: false,
            msg: 'Token is not valid'
        });
    }
};

module.exports={
    validateJWT
}