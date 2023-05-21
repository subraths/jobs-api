import mongoose from "mongoose";

export default async (uri) => mongoose.connect(uri);
