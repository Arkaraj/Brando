import React from 'react';

const Actor = (actor) => {

    const { name, character, profile_path } = actor.actor

    console.log(actor)
    return (
        <div className="flex-col">
            <img className="actorImg" src={`http://image.tmdb.org/t/p/w154/${profile_path}`} alt={name}></img>
            <div>
                <h1 className="text-xl">{name}</h1>
                <p className=" text-gray-600">{character}</p>
            </div>
        </div>
    );
}

export default Actor;
