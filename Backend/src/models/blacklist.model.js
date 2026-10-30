import mongoose from "mongoose";

const blacklistokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required to be added in blacklist"]
    }
},{
    timestamps: true,
})

const tokenBlacklistModel = mongoose.model("blacklistokenSchema" , blacklistokenSchema);

export default tokenBlacklistModel;