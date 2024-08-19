const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const registerSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    phonenumber: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        trim: true,
    },
    branch: {
        type: String,
        trim: true,
    }
})
// By default, mongodb uses username field for authentication
// The username field shows dat the user won't be using a username but instead will use the email
// Field must be a capital letter n mind the sp of email be it capital letter
registerSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
});
module.exports = mongoose.model("Register", registerSchema);