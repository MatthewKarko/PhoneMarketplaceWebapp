var mongoose = require("mongoose");
var crypto = require('crypto-js')

var userListSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  }
);


userListSchema.statics.checkEmailExists = function(email, callback) {
  return this
          .find({email: email})
          .exec(callback)
}


userListSchema.statics.getUsers = function (callback) {
  return this.find({}).exec(callback);
};

// Use crypto-js to hash password
function toMD5(password) {
  return crypto.MD5(password).toString();
}

userListSchema.statics.checkLogin = function (
  email,
  password,
  callback
) {
  return this.find({ email: email, password: toMD5(password) }).exec(callback);
};

userListSchema.statics.addUser = function (
  newFirstname,
  newLastname,
  newEmail,
  newPassword
) {
  let newUser = new User({
    firstname: newFirstname,
    lastname: newLastname,
    email: newEmail,
    password: toMD5(newPassword),
    versionKey: false,
  });
  return newUser.save();
};

userListSchema.statics.updateUserInfo = function(id, newFirstName, newLastName, newEmail, callback) {
  return this
        .update({_id: id}, {$set:{'firstname':newFirstName, 'lastname':newLastName, 'email':newEmail}})
        .exec(callback)
}
userListSchema.statics.updatePassword = function(id, newPassword, callback) {
  return this
        .update({_id: id}, {$set:{'password':toMD5(newPassword)}})
        .exec(callback);
}
// get users' password 
userListSchema.statics.getPassword = function(id, callback){
  return this
        .find({_id: id})
        .select('password')
        .exec(callback)
}


var User = mongoose.model("User", userListSchema, "userList");
User.createIndexes();

module.exports = User
