import React from "react";

interface Props {
    handler: () => void;
    jokes: Joke[];
}

const AddRandomJokes: React.FC<Props> = ({ handler, jokes }) => {

    return (
        <button
            className="btn btn-primary m-1"
            onClick={handler}
        >
            {jokes.length > 0 ? '10 new jokes' : 'get 10 jokes'}
        </button>
    )
}

export default AddRandomJokes;
