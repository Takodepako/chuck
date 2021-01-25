import React, { useEffect, useState, useRef, ReactElement } from 'react'
import JokeList from './JokeList'
import FavouriteList from './FavouriteList'
import AddRandomFavourite from './AddRandomFavourite'
import AddRandomJokes from './AddRandomJokes'

function App(): ReactElement {
  const [addJokeAutomatically, setAddJokeAutomatically] = useState(true)
  const intervalId = useRef<NodeJS.Timer | null>(null)
  const [jokes, setJokes] = useState<Joke[]>([]);
  const initFavourites: Joke[] = []
  const [favourites, setFavourites] = useState<Joke[]>(initFavourites)
  const [favouritePending, setFavouritePending] = useState(false)
  const sessionFavourites = "favourites"

  const getJokes = (): void => {
    fetch("http://api.icndb.com/jokes/random/10")
      .then(res => res.json())
      .then((response) => {
        const jokesFromSource = response.value;
        const jokes: Joke[] = jokesFromSource.map((joke: JokeFromSource) => { return { id: joke.id, text: joke.joke, isFavourite: false } });
        return jokes
      })
      .then((jokes) => jokes.map(joke =>
        favourites.some(fav => fav.id === joke.id) ?
          { ...joke, isFavourite: true } : joke))
      .then((jokes) => setJokes(jokes))
      .catch((error) => alert("Error: " + error))
  }

  const getJoke = (favourites: Joke[]): Promise<Joke | void> => {
    return fetch("http://api.icndb.com/jokes/random/1")
      .then(res => res.json())
      .then((response) => {
        const jokesFromSource = response.value;
        const joke: Joke = (jokesFromSource.map((joke: JokeFromSource) => { return { id: joke.id, text: joke.joke, isFavourite: false } }))[0];
        if (favourites.indexOf(joke) >= 0) {
          return getJoke(favourites);
        }
        else {
          return joke;
        }
      })
      .catch((error) => {alert("Error: " + error)})
  }

  const activateInterval = (): void => {
    intervalId.current = setInterval(() => { setFavouritePending(true) }, 1000);
  }

  const getFavouritesFromSession = (): void => {
    const favouritesFromSession = sessionStorage.getItem(sessionFavourites)
    if (favouritesFromSession) {
      setFavourites(JSON.parse(favouritesFromSession))
    }
  }

  const removeJokeFromFavourites: Consumer<Joke> = joke => {
    // const newFavourites: Joke[] = []
    // favourites.forEach(f => { if (f.id !== joke.id) newFavourites.push(f) })
    setFavourites(
      (oldFavourites) => {
        const newFavourites: Joke[] = []
        oldFavourites.forEach(f => { if (f.id !== joke.id) newFavourites.push(f) })
        return newFavourites
      },
    );
    /* if joke present in jokes list, unmark joke as favourite */
    setJokes((oldJokes) => (oldJokes.map(j => (j.id === joke.id) ? { ...j, isFavourite: false } : j)))
  }

  const addJokeToFavourites: Consumer<Joke> = joke => {
    // const newFavourites: Joke[] = [...favourites];
    // newFavourites.unshift(joke)
    setFavourites(
      (oldFavourites) => {
        const newFavourites: Joke[] = [...oldFavourites]
        newFavourites.unshift(joke)
        return newFavourites})
    /* if joke present in jokes list, mark joke as favourite */
    setJokes((oldJokes) => (oldJokes.map(j => (j.id === joke.id) ? { ...j, isFavourite: true } : j)))
  }

  const addUniqueJokeToFavourites = async (): Promise<void> => {
    let joke: Joke | void;
    do {
      joke = await getJoke(favourites)
    }
    /* if joke already in favourites list, get a new joke */
    while (joke && favourites.some(fav => fav.id === (joke as Joke).id))
    addJokeToFavourites(joke as Joke);
  }

  const addJokeToFavouritesWhenEligible = (): void => {
    if (addJokeAutomatically && favourites.length < 10 && favouritePending) {
      addUniqueJokeToFavourites();
    }
    setFavouritePending(false)
  }

  const toggleJoke: Consumer<Joke> = selectedJoke => {
    if (selectedJoke.isFavourite) {
      removeJokeFromFavourites(selectedJoke);
    }
    else {
      addJokeToFavourites(selectedJoke);
    }
  }

  const toggleActivateButton = (): void => {
    setAddJokeAutomatically(!addJokeAutomatically)
    if (addJokeAutomatically)
      activateInterval()
    else
      intervalId.current && clearInterval(intervalId.current)
  }

  const storeFavourites = (): void => sessionStorage.setItem(sessionFavourites, JSON.stringify(favourites))

  useEffect(activateInterval, [])
  useEffect(getFavouritesFromSession, [])
  useEffect(addJokeToFavouritesWhenEligible, [favouritePending])
  useEffect(storeFavourites ,[favourites])
  return (
    <div className="container my-4">
      <div className="col-lg-4 col-md-12 mb-4">
        <h3>Jokes</h3>
        <AddRandomJokes handler={getJokes} jokes={jokes}></AddRandomJokes>
        <JokeList jokes={jokes} toggleJoke={toggleJoke}></JokeList>
      </div>
      <div className="col-lg-4 col-md-12 mb-4">
        <h3>Favourites</h3>
        <AddRandomFavourite active={addJokeAutomatically} toggle={toggleActivateButton}></AddRandomFavourite>
        <FavouriteList favourites={favourites} deleteFavourite={removeJokeFromFavourites}></FavouriteList>
      </div>
    </div>
  );
}

export default App;
