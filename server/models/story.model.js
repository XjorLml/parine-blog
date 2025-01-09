const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const travelStorySchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    story: {
        type: String,
        required: true
    },
    visitedLocation: {
        type: String,
        required: true,
    },
    isFavorite: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    visitedDate: {
        date: Date,
        required: true,
    }
},{ timestamps: true }); 