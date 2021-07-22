import React from 'react';
import { Link } from 'react-router-dom';

const Actor = (actor) => {

    const { id, name, character, profile_path } = actor.actor

    const noImage = "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"

    return (
        <div className="flex-col">
            <img className="actorImg rounded-md" src={profile_path ? `http://image.tmdb.org/t/p/w154/${profile_path}` : noImage} alt={name}></img>
            <div>
                <Link to={`/person/${id}`}>
                    <h1 className="text-xl hover:text-blue-500 hover:underline">{name}</h1>
                </Link>
                <p className=" text-gray-600">{character}</p>
            </div>
        </div>
    );
}

export default Actor;
