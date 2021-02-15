const express = require('express');
const router = express.Router()
const Users = require('../modles/User')
const bcrypt = require('bcrypt');
const Movies = require('../modles/favourite')

router.get('/', async (req, res) => {
    const user = await Users.find()
    try {
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ msg: "Error has occured" })
    }
})

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body
    Users.findOne({ email }, (err, emailPresent) => {
        if (err)
            res.status(500).json({ message: { msg: "Error has occured", msgError: true } });
        if (emailPresent)
            res.status(400).json({ message: { msg: "email is already taken", msgError: true } });
        else {
            const newUser = new Users({ username, password, email });
            newUser.save(err => {
                if (err)
                    res.status(500).json({ message: { msg: "Error has occured", msgError: true } });
                else
                    res.status(201).json({ message: { msg: "Account successfully created", msgError: false } });
            })
        }
    });

})

// Authorization needed

router.post('/login', (req, res) => {

    const { email, password } = req.body

    Users.findOne({ email }, function (err, user) {
        if (err) {
            res.status(500).json({ message: { msg: "Error has occured", msgError: true } });
        }
        if (!user) {
            res.status(400).json({ message: { msg: "Invalid Email", msgError: true } });
        }
        bcrypt.compare(password, user.password, function (err, validate) {
            if (err) {
                res.status(500).json({ message: { msg: "Error has occured in bcrypt", msgError: true } });
            }
            if (!validate) {
                res.status(400).json({ message: { msg: "Invalid Password", msgError: true } });
            }
            else {
                // Logged in 
                res.status(200).json(user)
            }
        })
    })
})

router.post('/:_id/movies', async (req, res) => {
    const { id, fav } = req.body
    let movie = new Movies({ id, fav })
    const favUser = await Users.findById({ _id: req.params._id })

    favUser.favourites.push(movie)

    try {
        favUser.save()
        res.status(200).json(favUser)
    } catch (err) {
        console.log('Error: ' + err);
        res.status(500).json({ error: "Internal server error" })
    }

})

router.get('/:_id/movies', (req, res) => {
    Users.findById({ _id: req.params._id }).then((document, err) => {
        if (err) {
            console.log('Error: ' + err)
            res.status(500).json({ message: { msg: "Error has occured", msgError: true } });
        } else {
            res.status(200).json({ favourites: document.favourites, authenticated: true })
        }
    })
})


module.exports = router