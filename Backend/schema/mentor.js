const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const mentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    role: {
        type: String,
        required: true
    },
    technologies: {
        type: [String],
        required: true
    },
    imageUrl: {
        type: String
    },

    password: {
        type: String,
        required: true
    }
});

mentorSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mentorSchema;