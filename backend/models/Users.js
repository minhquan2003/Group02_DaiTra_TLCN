import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userChema = mongoose.Schema(
    {
        user_id:{
            type: String,
            require: true
        },
        email:{
            type: String,
            require: true
        },
        username:{
            type: String,
            require: true
        },
        password:{
            type: String,
            require: true
        },
        name:{
            type: String,
            require: true
        },
        address:{
            type: String,
            require: true
        },
        phone:{
            type: Number,
            require: true
        },
        avatar_url:{
            type: String,
            require: true
        },
        role:{
            type: String,
            require: true
        },
        created_at:{
            type: Date,
            require: true
        },
        updated_at:{
            type: Date,
            require: true
        },
        status:{
            type: Boolean,
            require: true
        },
    },
    {
        timestamps: true
    }
);

userChema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

export const User = mongoose.model('Users', userChema)