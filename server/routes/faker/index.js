const express = require('express');
const router = express.Router();

let data = [{ id: 1, name: 'vasya' }, { id: 2, name: 'petya' }];


const controller = {
    get: (req, res) => res.status(200).json(data),
    post: (req, res) => {
        const { name } = req.body;
        const item = { id: Date.now(), name };
        data.push(item);
        res.status(201).json(item)
    }
};


router.get('/', controller.get);
router.post('/', controller.post);

module.exports = router;