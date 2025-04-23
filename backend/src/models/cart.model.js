import mongoose,{Schema} from "mongoose";

const cartSchema = new Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},{timestamps: true});

export const Cart = mongoose.model("Cart", cartSchema);