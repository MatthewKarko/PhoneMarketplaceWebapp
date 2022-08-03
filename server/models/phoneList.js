var mongoose = require('mongoose');


var PhoneListSchema = new mongoose.Schema(
  {
    title: String,
    brand: String,
    image: String,
    stock: Number,
    seller: String,
    price: Number,
    reviews: [
      {
        reviewer: String,
        rating: Number,
        comment: String,
      },
    ],
    disabled: String,
  },
  { versionKey: false }
);

PhoneListSchema.statics.soldOutSoon = function(callback) {
  return this
          .find({stock: {"$gt": 0}, disabled: {$exists: false} })
          .sort({'stock':1})
          .limit(10)
          .exec(callback)
}

PhoneListSchema.statics.bestSellers = function(callback) {
  return this
          .aggregate([{$addFields:{averageRating: {$avg: "$reviews.rating"}, numberOfRatings: {$size : "$reviews"}}}])
          .match({disabled: {$exists: false}, numberOfRatings: {"$gt": 1}})
          .sort({averageRating:-1})
          .limit(10)
          .exec(callback)
}

PhoneListSchema.statics.getPhones = function(callback) {
  return this.find({disabled: {$exists: false}}).exec(callback);
}

PhoneListSchema.statics.searchItemsBySellerID = function(seller_id, callback) {
  return this
          .find({seller: seller_id})
          .exec(callback)
}

PhoneListSchema.statics.deleteItem = function(id, callback){
  return this
          .remove({_id: id})
          .exec(callback)
}

PhoneListSchema.statics.addPhone = function(title, brand, stock, seller, price){
  let newPhone = new Phone({
      title: title, 
      brand: brand,
      stock:stock,
      seller:seller,
      price:price,
      versionKey: false 
    });
  return newPhone.save();
}



const Phone = mongoose.model('Phone', PhoneListSchema, 'phoneList')


module.exports = Phone
