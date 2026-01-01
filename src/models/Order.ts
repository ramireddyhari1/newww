import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
    orderId: { type: String, required: true, unique: true },
    customer: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    items: { type: String, required: true }, // Keeping simple string for now to match current usage
    paymentId: { type: String, required: true },
    paymentMethod: { type: String, enum: ['COD', 'ONLINE'], required: true },
    awb: { type: String },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
