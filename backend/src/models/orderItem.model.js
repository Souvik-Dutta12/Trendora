import mongoose,{Schema} from "mongoose";

const orderItemSchema = new Schema({
    order_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
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
    },
    price:{
        type: Number,
        required: true,
    }
},{timestamps: true});


export const OrderItem = mongoose.model("OrderItem", orderItemSchema);