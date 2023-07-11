const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const profileSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    tasks: [
        {   
            type: {
                type: String,
                required: false
            },
            taskDescription: {
                type: String,
                required: true
            },
            contactPhone: {
                type: String,
                required: false
            },
            dateCreated: {
                type: Date,
                default: Date.now
            },
            contactEmail: {
                type: String,
                required: false
            },
            contactFirstName: {
                type: String,
                required: true
            },
            contactLastName: {
                type: String,
                required: true
            },
            reminderDate: {
                type: Date,
                default: Date.now
            },
        }
    ]
});

// set up pre-save middleware to create password
profileSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
profileSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const Profile = model('Profile', profileSchema);

module.exports = Profile;
