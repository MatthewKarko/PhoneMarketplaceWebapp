var User = require("../models/userList.js");



async function checkEmailExists(req, res){
    User.checkEmailExists(req.params.email, function(err, result){
		if (err){
			console.log("Query error!")
		} else {
			return res.json(JSON.stringify({ message: {... result} }));
		}
	})
}

async function updateUserInfo(req, res){
    User.updateUserInfo(req.params.id, req.params.firstname, req.params.lastname, req.params.email, function(err, result){
		if (err){
		  	console.log("Query error!")
		} else {
			return res.json(JSON.stringify({ message: {... result} }));
		}
	  })
}

async function getPassword(req, res){
    User.getPassword(req.params.id, (err, result) => {
        if (err) {
            console.log("Query error!")
        } else {
			return res.json(JSON.stringify({ message: {... result} }));
        }
    });
}

async function updatePassword(req, res){
    User.updatePassword(req.params.id, req.params.password, function(err, result){
		if (err){
		  	console.log("Query error!")
		} else {
			return res.json(JSON.stringify({ message: {... result} }));
		}
	  })
}

async function checkLogin(req, res) {
	User.checkLogin(
	  req.params.email,
	  req.params.password,
	  function (err, result) {
		if (err) {
		  console.log(err);
		} else {
		  return res.json(JSON.stringify({ message: { ...result } }));
		}
	  }
	);
  }
  async function addUser(req, res) {
	User.addUser(
	  req.params.firstname,
	  req.params.lastname,
	  req.params.email,
	  req.params.password
	)
	  .then((result) => {
		return res.json(result._id);
	  })
	  .catch((err) => {
		res.status(500).send(err);
	  });
  }
  
  async function getUsers(req, res) {
	User.getUsers((err, result) => {
	  if (err) {
		console.log("Cannot find users!");
	  } else {
		return res.json(JSON.stringify({ message: { ...result } }));
	  }
	});
  }
  



module.exports = {
    checkEmailExists : checkEmailExists,
    updateUserInfo : updateUserInfo,
	getPassword : getPassword,
	updatePassword : updatePassword,
	getUsers : getUsers,
	addUser : addUser,
	checkLogin : checkLogin,

}


