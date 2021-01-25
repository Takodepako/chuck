interface Joke {
    id: number;
    text: string;
    isFavourite: boolean;
}

interface JokeFromSource {
    id: number;
    joke: string;
}

type ToggleJoke = (joke: Joke) => void;
type Consumer<T> = (t: T) => void;