// eslint-disable-next-line import/no-anonymous-default-export
export default {

    view: (_id) => {
        return fetch('/user/').then(res => res.json()).then(data => {
            // gives all users, extract from them all expect mine
            // data is an array
            const otherUser = data.filter(d => d._id !== _id)

            return otherUser
        })
    },
    allFavMovies: (_id) => {

        return fetch(`/user/movies/${_id}`)
            .then(res => res.json())
            .then(data => {
                // data.favourites gives array of all the fav movies
                const list = data.favourites

                return list

            })
    },
    rateMovies: (id, score) => {

        const rate = {
            rating: score
        }

        return fetch(`/user/movies/rating/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(rate)
        }).then(res => res.json()).then(data => data)

    },
    rateUser: (id, score) => {

        const rate = {
            rating: score
        }

        return fetch(`/user/rating/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(rate)
        }).then(res => res.json()).then(data => data)
    },
    updateStatus: (status, id) => {
        const feel = {
            status
        }

        return fetch(`/user/status/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(feel)
        }).then(res => res.json()).then(data => data)
    },
    updateVote: (vote, id) => {

        const n = vote ? -1 : 1
        const upvote = {
            vote: n
        }

        return fetch(`/user/vote/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(upvote)
        }).then(res => res.json()).then(data => data)
    }

}