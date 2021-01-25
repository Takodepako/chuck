import React, { ReactElement } from "react";

interface Props {
    joke: Joke;
    toggleJoke: Consumer<Joke>;
}

const JokeListItem: React.FC<Props> = ({ joke, toggleJoke }): ReactElement => {
    return (
        <li className="list-group-item m-1" onClick={(): void => { toggleJoke(joke) }}>
            {joke.text}
            <span style={{ color: "orange" }} className={`glyphicon ${joke.isFavourite ? "glyphicon-star" : "glyphicon-star-empty"}`}></span>
        </li>
    )
}

export default JokeListItem