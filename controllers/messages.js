const Message = require('../models/message')

const getChat = async (req, res) => {
  
    const myId = req.uid
    console.log('my id ----->',myId);
    const messagesFrom = req.params.from

    const last30Messages = await Message.find({
        $or:[
            {
                from: myId,
                toWho: messagesFrom
            },
            {
                from: messagesFrom,
                toWho: myId
            },
        ]
    }).sort({createAt: 'asc'}).limit(40)




    res.json({
        ok:true,
        messages: last30Messages
    })
}

module.exports = {
    getChat
}