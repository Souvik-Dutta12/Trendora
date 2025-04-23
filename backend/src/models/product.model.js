import mongoose,{Schema} from "mongoose";

const productSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    price:{
        type: Number,
        required: true,
        trim: true,
    },
    stock_quantity:{
        type: Number,
        required: true,
        trim: true,
    },
    category_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    image_url:{
        type: String,  //cloudibary url
        reuired: true,
    }
},{timestamps: true});



// productSchema.plugin(mongooseAggregatePaginate);               need to install
export const Product = mongoose.model("Product", productSchema);