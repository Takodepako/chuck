import React from "react";

interface Props {
    active: boolean;
    toggle: () => void;
}

const AddRandomFavourite: React.FC<Props> = ({ active, toggle }) => {

    return (
        <button
            className="btn btn-primary m-1"
            onClick={toggle}
        >
            {active ? "Stop adding jokes" : "Start adding jokes"}
        </button>
    )
}

export default AddRandomFavourite;
