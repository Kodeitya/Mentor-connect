const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const menteeSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        unique:true,
        // required: true
    },
    imageUrl:{
        type: String,
    },
    password:{
        type: String,
        required: true, 

    }
});


menteeSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = menteeSchema;