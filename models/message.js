const { Schema, model } = require("mongoose");

const MessageSchema = Schema ({   
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    toWho: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    }
},{
    // add the creation date and modification date
    timestamps: true
});

MessageSchema.method('toJSON', function () {
    const {__v, ...object} = this.toObject();
    return object
});

module.exports=model('Message', MessageSchema)