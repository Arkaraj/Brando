const express = require('express');
const router = express.Router()
const Movies = require('../modles/favourite')

router.get('/', (req, res) => {
    res.status(200).json({ msg: 'dummy text' })
})

module.exports = router;