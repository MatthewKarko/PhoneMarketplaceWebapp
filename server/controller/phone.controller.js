var Phone = require("../models/phoneList.js");


// find top five lowest in stock 
async function soldOutSoon(req, res){
	Phone.soldOutSoon((err, result) => {
		if (err) {
			console.log("Query issue")
		} else {
			return res.json(JSON.stringify({ message: {... result} }));
		}	
	});
}

//Find the best sellers
async function bestSellers(req, res){
	Phone.bestSellers((err, result) => {
		if (err) {
			console.log("Query issue")
		} else {
			return res.json(JSON.stringify({ message: {... result} }));
		}	
	});
}

// Find all phones
async function getPhones(req, res) {
	Phone.getPhones((err, result) => {
		if (err) {
			console.log("Query error!")
		} else {
			return res.json(JSON.stringify({ message: {... result} }));
		}	
	})
}

async function searchItemsBySellerID(req, res){
	Phone.searchItemsBySellerID(req.params.seller_id, function(err, result) {
        if (err){
          	console.log("Query issue")
        } else {
			return res.json(JSON.stringify({ message: {... result} }));
        }
      })
}
async function deleteItem(req, res){
	Phone.deleteItem(req.params.id, function(err, result) {
        if (err){
          	console.log("Query issue")
        } else {
			console.log("Item removed")
        }
      })
}
async function addPhone(req, res){
	Phone.addPhone(req.params.title, req.params.brand, parseInt(req.params.stock), req.params.seller, parseInt(req.params.price)).then(result => {
		return res.json(result._id);
	})
	.catch(err => {
		res.status(500).send(err);
	})
}

module.exports = {
	soldOutSoon : soldOutSoon,
	bestSellers : bestSellers,
	searchItemsBySellerID : searchItemsBySellerID,
	getPhones : getPhones,
	deleteItem : deleteItem,
	addPhone : addPhone,
}

