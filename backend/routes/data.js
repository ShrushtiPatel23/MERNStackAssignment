const express = require('express');
const { getData, searchName,searchAmount1, searchDate, searchAmount2, searchAmount3} = require('../controllers/data.js');


const router = express.Router();

//get all user
router.get('/', getData);

//search data by name
router.get('/search', searchName)

//search data by amount
router.post('/amount1', searchAmount1)

//search data by name
router.post('/amount2', searchAmount2)

//search data by name
router.post('/amount3', searchAmount3)

//search data by date
router.post('/date', searchDate)

module.exports = router;