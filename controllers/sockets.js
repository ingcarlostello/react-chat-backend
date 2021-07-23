const usersChat = require("../models/usersChat")
const Message = require("../models/message")

const userConnected = async (uid) => {
    const user = await usersChat.findById(uid);
    user.online = true;
    await user.save();
    return user;
}


const userDisconnected = async (uid) => {
    const user = await usersChat.findById(uid);
    user.online = false;
    await user.save();
    return user;
}

const getUsers = async () => {
   const users = await usersChat.find().sort('-online');
   return users
}

const saveMessagesInBD = async (payload) => {
    try {
        const message = new Message(payload)
        await message.save();       
        return message; 
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    getUsers,
    saveMessagesInBD,
    userConnected,
    userDisconnected,
}