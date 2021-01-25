import React from "react";
import JokeItem from "./JokeListItem";


interface Props {
    jokes: Joke[];
    toggleJoke: Consumer<Joke>;
}
const JokeList: React.FC<Props> = ({ jokes, toggleJoke }) => {
    return (
        <div className="card">
            <ul className="list-group">
                {jokes.map(joke => <JokeItem key={joke.id} joke={joke} toggleJoke={toggleJoke} />)}
            </ul>
        </div>
    )
}

export default JokeList