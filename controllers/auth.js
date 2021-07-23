const { response }  = require("express");
const User          = require('../models/usersChat');
const bcrypt        = require('bcryptjs');
const { generateJWT } = require("../helpers/jwt");

const createNewUser = async (req, res = response) => {  
    try {
        const {email, password} = req.body;

        // we validate here if email does not exists
        const existsEmail = await User.findOne({email: email})
        if(existsEmail){
            return res.status(400).json({
                ok: false,
                msg: "There is an account with this email"
            })
        }
        
        const userChat = new User(req.body)

        // Encrypt password
        const salt = bcrypt.genSaltSync()
        userChat.password = bcrypt.hashSync(password, salt)

        // save user in DB
        await userChat.save()

        // generate jsonweb token (JWT)
        const token = await generateJWT(userChat.id)

        res.json({
            ok: true,
            userChat,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Internal server error. please contact the admin"
        })
    }
};

const login = async (req, res = response) => {
    const {email, password} = req.body;
    try {
        const userInDB = await User.findOne({email})

        // if user does no exist
        if(!userInDB){
            return res.status(400).json({
                ok: false,
                msg: 'Email not found'
            });
        }
        // validate password
        const validPassword = bcrypt.compareSync(password, userInDB.password)
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Wrong password'
            })
        }

         // generate JWT
        const token = await generateJWT(userInDB.id);
        res.json({
            ok: true,
            user: userInDB,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Internal server error. please contact the admin"
        });
    }

   
};

const renewToken = async (req, res) => {
    const uid = req.uid;
    // generate new JWT
    const token = await generateJWT(uid)

    // get user by uid
    const user = await User.findById(uid)
    res.json({
        ok: true,
        user, 
        token
    })
};

module.exports = {
    createNewUser,
    login,
    renewToken
}