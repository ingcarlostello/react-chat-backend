const { Schema, model } = require("mongoose");

const UserSchema = Schema ({   
    email: {
        required: true,
        type: String,
        unique:true,
    },
    name: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    online: {
        type: Boolean,
        default: false
    },

});

UserSchema.method('toJSON', function () {
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id
    return object
});

module.exports=model('User', UserSchema)