import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  name: String,
  category: String,
  description: String,
  latitude: Number,
  longitude: Number,
  rating: Number,
  img: String,
  // listid: {
  //   type: Schema.Types.ObjectId,
  //   ref: "List",
  // },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);
