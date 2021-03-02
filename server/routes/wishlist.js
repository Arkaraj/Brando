const express = require('express')
const router = express.Router()
const Users = require('../modles/User')
const WishList = require('../modles/wishList')

// Get all wishLists of an individual, id is mongo _id of user
router.get('/:_id', (req, res) => {

    Users.findById({ _id: req.params._id }).populate('wishlist').exec((err, document) => {
        if (err) {

            res.status(500).json({ message: { msg: "Error has occured", msgError: true } });
        }
        else {
            res.status(200).json({ wishlist: document.wishlist, authenticated: true })
        }
    })

})

// Add movies to favourites, id=> tmdb movie id
router.post('/:id', (req, res) => {
    // wish is gonna be true
    const { wish } = req.body

    const watch = new WishList({ id: req.params.id, wishlist: wish })

    watch.save(err => {
        if (err) {
            res.status(500).json({ message: { msg: "Error has occured", msgError: true } })
        }
        else {
            req.user.wishlist.push(watch);
            req.user.save(err => {
                if (err) {
                    res.status(500).json({ message: { msg: "Error has occured", msgError: true } })
                }
                else
                    res.status(200).json(watch);
            });
        }
    })

})

// Delete movie from wishList, id is books mongo _id, unique
router.delete('/:_id', async (req, res) => {
    // await WishList.findByIdAndDelete(req.params.id);

    try {
        await WishList.findOneAndDelete({ _id: req.params._id });
        // pop from Users Array
        req.user.wishlist = req.user.wishlist.filter(movie => movie.toString() !== req.params._id)


        req.user.save(err => {
            if (err) {
                res.status(500).json({ error: "Internal server error" })
            } else {
                res.status(200).json({ done: true, wishlist: req.user.wishlist });
            }
        })

    } catch (err) {
        console.log('Error: ' + err)
        res.status(500).json({ error: "Internal server error" })
    }
})

module.exports = router