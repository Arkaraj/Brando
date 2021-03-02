import React from 'react';

const Actor = (actor) => {

    const { name, character, profile_path } = actor.actor

    const noImage = "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"

    return (
        <div className="flex-col">
            <img className="actorImg" src={profile_path ? `http://image.tmdb.org/t/p/w154/${profile_path}` : noImage} alt={name}></img>
            <div>
                <h1 className="text-xl">{name}</h1>
                <p className=" text-gray-600">{character}</p>
            </div>
        </div>
    );
}

export default Actor;
