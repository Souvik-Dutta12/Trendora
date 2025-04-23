import mongoose,{Schema} from "mongoose";

const cartItemSchema = new Schema({
    cart_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true,
    },
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
        default: 1,
    }
},{timestamps: true});

export const CartItem = mongoose.model("CartItem", cartItemSchema);