import React, { FC } from "react";
import FavouriteListItem from "./FavouriteListItem";

interface Props {
    favourites: Joke[];
    deleteFavourite: Consumer<Joke>;
}

const FavouriteList: FC<Props> = ({ favourites, deleteFavourite }) => {
    return (
        <div className="card">
            <ul className="list-group">
                {favourites.map(favourite => <FavouriteListItem key={favourite.id} favourite={favourite} deleteFavourite={deleteFavourite}></FavouriteListItem>)}
            </ul>
        </div>
    )
}

export default FavouriteList