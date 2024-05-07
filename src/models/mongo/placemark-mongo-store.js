import { Placemark } from "./placemark.js";

export const placemarkMongoStore = {
  async getPlacemarksByListId(id) {
    const placemarks = await Placemark.find({ listid: id }).lean();
    return placemarks;
  },

  async getAllPlacemarks() {
    const placemarks = await Placemark.find().lean();
    return placemarks;
  },

  async deleteAllPlacemarks() {
    await Placemark.deleteMany({});
  },

  async addPlacemark(userID, placemark) {
    // placemark.listid = listId;
    placemark.userid = userID;
    const newPlacemark = new Placemark(placemark);
    const placemarkObj = await newPlacemark.save();
    return this.getPlacemarkById(placemarkObj._id);
  },

  async getPlacemarkById(id) {
    if (id) {
      const foundPlacemark = await Placemark.findOne({ _id: id }).lean();
      return foundPlacemark;
    }
    return null;
  },

  async deletePlacemark(id) {
    try {
      await Placemark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  // async getUserPlacemarks(id) {
  //   if (id) {
  //     const placemarks = await Placemark.findOne({ userid: id }).lean();
  //     return placemarks;
  //   }
  //   return null;
  // },

  async getUserPlacemarks(id) {
    const placemarks = await Placemark.find({ userid: id }).lean();
    return placemarks;
  },

  async getPlacemarksByCategory(userid, category) {

    const query = { userid };
 
    if (category) {
      query.category = category;
    }
    const placemarks = await Placemark.find(query).lean();
    return placemarks;
  },

  
  async updatePlacemark(placemarkId, updatedPlacemark) {
    const retrievedPlacemark = await Placemark.findOne({ _id: placemarkId });
    retrievedPlacemark.name = updatedPlacemark.name;
    retrievedPlacemark.category = updatedPlacemark.category;
    retrievedPlacemark.description = updatedPlacemark.description;
    retrievedPlacemark.location = updatedPlacemark.location;
    retrievedPlacemark.latitude = updatedPlacemark.latitude;
    retrievedPlacemark.longitude = updatedPlacemark.longitude;
    retrievedPlacemark.rating = updatedPlacemark.rating;
    retrievedPlacemark.img = updatedPlacemark.img;
    const updatedPlacemarkObject = await retrievedPlacemark.save();
    return updatedPlacemarkObject;
  },




};

