import mongoose,{Schema} from "mongoose";

const paymentSchema = new Schema({
    order_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    payment_date:{
        type: Date,
        default: Date.now,
    },
    amount:{
        type: Number,
        required: true,
    },
    payment_method:{
        type: String,
        enum: ["Credit Card", "Debit Card", "Paypal"],
        required: true,
    },
    status:{
        type: String,
        enum: ["Pending", "Completed", "Failed"],
        default: "Pending",
    }
},{timestamps: true});

export const Payment = mongoose.model("Payment", paymentSchema);