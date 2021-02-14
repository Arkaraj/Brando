const express = require('express');
const router = express.Router()
const Movies = require('../modles/favourite')


router.get('/', async (req, res) => {

    const movie = await Movies.find()

    res.status(200).send(movie)

})

router.get('/:id', async (req, res) => {

    try {
        const movie = await Movies.find({ id: req.params.id })

        if (movie.length == 0) {
            res.status(500).json({ error: "Internal server error" });
        }
        else {
            res.status(200).json(movie)
        }

    } catch (err) {
        console.log('Error: ' + err);
        res.status(500).json({ error: "Internal server error" })
    }

})

router.post('/', async (req, res) => {
    const { id, fav } = req.body

    let movie = new Movies({
        id,
        fav
    })
    try {
        movie = await movie.save();
        res.status(200).json(movie)
    } catch (err) {
        console.log('Error: ' + err);
        res.status(500).json({ error: "Internal server error" })
    }

})

router.put('/:id', async (req, res) => {
    const { id, fav } = req.body

    try {
        let movie = await Movies.updateOne(
            { id: req.params.id },
            {
                $set: {
                    id,
                    fav
                }
            }
        )
        res.status(200).json(movie)
    } catch (err) {
        console.log('Error: ' + err)
        res.status(500).json({ error: "Internal server error" })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Movies.findOneAndDelete({ id: req.params.id });
        res.status(200).json({ msg: 'done' })
    } catch (err) {
        console.log('Error: ' + err)
        res.status(500).json({ error: "Internal server error" })
    }
})


module.exports = router;