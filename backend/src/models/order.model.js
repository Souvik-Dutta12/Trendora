import mongoose,{Schema} from "mongoose";

const orderSchema = new Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    order_date:{
        type: Date,
        default: Date.now,
    },
    status:{
        type: String,
        enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",
    },
    total_amount:{
        type: Number,
        required: true,
    },
    shipping_address:{
        type: String,
        required: true,
    },
    payment_method:{
        type: String,
        enum: ["Credit Card", "Debit Card", "PayPal"],
        required: true,
    }
},{timestamps: true});

export const Order = mongoose.model("Order", orderSchema);