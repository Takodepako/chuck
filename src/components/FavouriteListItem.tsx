import React from 'react';

interface Props {
    favourite: Joke;
    deleteFavourite: Consumer<Joke>;
}

const FavouriteListItem: React.FC<Props> = ({ favourite, deleteFavourite }) => {
    return (
        <li className="list-group-item" onClick={(): void => { deleteFavourite(favourite) }}>
            {favourite.text}
        </li>
    )
}

export default FavouriteListItem