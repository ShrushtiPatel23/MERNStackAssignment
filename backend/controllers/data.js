
const Data = require('../models/data')

module.exports = {

    //get all user
    getData: async (req, res) => {
        try {
            const datas = await Data.find();
            console.log(datas)
            return res.json({
                datas
            });


        } catch (error) {

            return res.json({
                success: 0,
                message: error.message
            });
        }
    },

    //search by name
    searchName: async (req, res) => {
        console.log(req.params.key)
        try {
            // let data = await Data.find(
            //     {
            //         "$or": [
            //             { "name": { $regex: req.params.key.toUpperCase() } },
            //             { "name": { $regex: req.params.key.toLowerCase() } }
            //         ]
            //     }
            // )

            const searchQuery = req.query.query; // Get the search query from the client
            const data = await Data.find({ name: { $regex: searchQuery, $options: 'i' } });
            res.json(data);
           // res.send(data)
        } catch (error) {
            return res.json({
                success: 0,
                message: error.message
            });
        }
    },

    //filter amount range
    searchAmount1: async (req, res) => {

        try {
            let data = await Data.find(
                {
                    amount: {
                        $gte: req.body.gte

                    }
                }
            )
            res.send(data)
        } catch (error) {
            return res.json({
                success: 0,
                message: error.message
            });
        }
    },

    searchAmount2: async (req, res) => {

        try {
            let data = await Data.find(
                {
                    amount: {
                        $lte: req.body.lte

                    }
                }
            )
            res.send(data)
        } catch (error) {
            return res.json({
                success: 0,
                message: error.message
            });
        }
    },

    searchAmount3: async (req, res) => {

        try {
            let data = await Data.find(
                {
                    "$and": [
                        { "amount": { $gte: req.body.gte } },
                        { "amount": { $lte: req.body.lte } }
                    ]
                }
            )
            res.send(data)
        } catch (error) {
            return res.json({
                success: 0,
                message: error.message
            });
        }
    },

    //filter date range
    searchDate: async (req, res) => {

        try {
            let data = await Data.find(
                {
                    "$and": [
                        { "date": { $gte: req.body.start } },
                        { "date": { $lte: req.body.end } }
                    ]
                }
            )

            res.send(data)
        } catch (error) {
            return res.json({
                success: 0,
                message: error.message
            });
        }
    }


}