var express = require('express');
var controller = require('../controller/phone.controller.js');

// import serverController from '../controller/phone.server.controller.js'
const router = express.Router();

router.get('/soldOutSoon', controller.soldOutSoon)
router.get('/bestSellers', controller.bestSellers)
router.get('/getPhones', controller.getPhones)
router.get('/searchItemsBySellerID/:seller_id', controller.searchItemsBySellerID)
router.get('/deleteItem/:id', controller.deleteItem)
router.get('/addPhone/:title/:brand/:stock/:seller/:price', controller.addPhone) 

module.exports = router