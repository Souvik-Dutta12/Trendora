import mongoose,{Schema} from "mongoose";

const contactMessageSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    subject:{
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    message:{
        type: String,
        required: true,
        trim: true,
        index:true,
    }
},{timestamps: true});


export const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);