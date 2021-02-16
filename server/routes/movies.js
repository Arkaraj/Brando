const express = require('express');
const router = express.Router()
const Movies = require('../modles/favourite')
const Users = require('../modles/User')

// For all entries, Not necessery
router.get('/', async (req, res) => {

    const movie = await Movies.find()

    res.status(200).send(movie)

})

// get movies of particular/Specific User, with _id
router.get('/:_id', async (req, res) => {
    // _id: req.user._id
    Users.findById({ _id: req.params._id }).populate('favourites').exec((err, document) => {
        if (err)
            res.status(500).json({ message: { msg: "Error has occured", msgError: true } });
        else {
            res.status(200).json({ favourites: document.favourites, authenticated: true })
        }
    })

})

// To add to favourites of an individual user, _id: user's id
router.post('/', async (req, res) => {
    const { id, fav } = req.body
    let movie = new Movies({ id, fav })

    movie.save(err => {
        if (err) {
            res.status(500).json({ message: { msg: "Error has occured", msgError: true } })
        }
        else {
            req.user.favourites.push(movie);
            req.user.save(err => {
                if (err) {
                    res.status(500).json({ message: { msg: "Error has occured", msgError: true } })
                }
                else
                    res.status(200).json({ message: { msg: "Succesfully created todo", msgError: false } });
            });
        }
    })

})

router.put('/:id', async (req, res) => {
    const { id, fav } = req.body
    // Should pass _id instead
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

    /*try {
        const favUser = await Users.findOne({ _id: req.params._id })
        const movie = favUser.favourites.filter(mov => mov.id !== parseInt(req.params.id))
        try {
            await Users.updateOne({ _id: req.params._id }, { $set: { favourites: movie } })

            res.status(200).json({ msg: "Deleted Movie" })
        } catch (err) {
            console.log('Error: ' + err);
            res.status(500).json({ error: "Internal server error" })
        }

    } catch (err) {
        console.log('Error: ' + err);
        res.status(500).json({ error: "Internal server error" })
    }*/
    try {
        // Should pass _id instead
        await Movies.findOneAndDelete({ id: req.params.id });
        res.status(200).json({ msg: 'done' })
    } catch (err) {
        console.log('Error: ' + err)
        res.status(500).json({ error: "Internal server error" })
    }
})


module.exports = router;