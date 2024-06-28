const Product = require('../models/product');
const ProductModel = require('../models/product');

module.exports = {
    getAll: (req, res) => {
        ProductModel.find({})
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                res.status(500).json(error);
            })
    },
    getOne: async (req, res) => {
        try {
            const item = await ProductModel.findById(req.params.id);
            res.json(item);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    add: async (req, res) => {
        try {
            const savedItem = await new ProductModel(req.body).save();
            res.json(savedItem);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    update: async (req, res) => {
        try {
            const item = await ProductModel.findByIdAndUpdate(req.params.id,
                { $set: req.body },
                {
                    new: true
                }
            );
            res.json(item);
        } catch {
            res.status(500).json(error);
        }
    },
    search: async (req, res) => {
        try {
            const { page = 1, limit = 10, title } = req.query;

            const query = {};
            if (title) {
                query.title = { $regex: title, $options: 'i' }; // Case-insensitive regex search
            }

            const products = await ProductModel.find(query)
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();

            const count = await ProductModel.countDocuments(query);

            res.json({
                products,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}