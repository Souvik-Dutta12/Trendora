import mongoose,{Schema} from "mongoose";

const deliverySchema = new Schema({
    order_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    delivery_status:{
        type: String,
        enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",
    },
    delivery_date:{
        type: Date,
        default: Date.now,
    },
    tracking_number:{
        type: String,
        required: true,
    }
},{timestamps: true});

export const Delivery = mongoose.model("Delivery", deliverySchema);