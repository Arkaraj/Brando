import React, { useState, useEffect } from 'react'

const Person = (props) => {

    const personId = props.match.params.id

    const [actor, setActor] = useState([])

    const [actorMovies, setActorMovies] = useState([])

    const [loaded, setLoaded] = useState(false)

    const getActor = async (id) => {

        fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setActor(data)

            })

    }

    const getActorMovies = async (id) => {

        fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data.cast)
                let x = data.cast ? setActorMovies(data.cast) : null
            })

    }

    useEffect(() => {

        const fetchData = async (id) => {
            await getActor(id);
            await getActorMovies(id);
            setLoaded(true)
        }

        fetchData(personId);

    }, [personId])

    const { name, biography, profile_path } = actor
    // /tLelKoPNiyJCSEtQTz1FGv4TLGc.jpg
    const image = "http://image.tmdb.org/t/p/w300_and_h450_bestv2" + profile_path

    return (
        <>
            {
                loaded ?
                    <div>
                        <img src={image} alt={name} />
                        <h1>Name: {name}</h1>
                Biography:
                <h3>{biography}</h3>
                Known For:
                <div className="gridx">
                            {
                                actorMovies.length > 0 ?
                                    actorMovies.slice(0, 8).map(mov => (
                                        <>
                                            <h1>{mov.title}</h1>
                                            <p>{mov.vote_average}</p>
                                        </>
                                    ))
                                    : <p>No Movies</p>
                            }
                        </div>
                    </div>
                    :
                    <p className="loading"></p>

            }
        </>
    )
}

export default Person
