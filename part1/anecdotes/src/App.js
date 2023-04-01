import { useState } from "react";
import Button from "./components/button";
import Header from "./components/header";
import Anecdote from "./components/anecdote";

const App = () => {
    const [selected, setSelected] = useState(0);
    const [allVotes, setAllVotes] = useState(Array(8).fill(0));

    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well.",
    ];

    const handleAnecdoteClick = () => {
        const voteIndex = Math.floor(Math.random() * anecdotes.length);
        setSelected(voteIndex); 
    }

    const handleVoteClick = () => {
        const newAllVotes = [...allVotes];
        newAllVotes[selected] += 1;
        setAllVotes(newAllVotes); 
    };

    const maxVote = Math.max(...allVotes);
    const maxVoteIndex = allVotes.indexOf(maxVote);

    return (
        <div>
            <Header text="Anecdote of the day" />
            <Anecdote anecdote={anecdotes[selected]} votes={allVotes[selected]} />
            <Button text="Vote" onClick={handleVoteClick} />
            <Button text="Next anecdote" onClick={handleAnecdoteClick} />

            <Header text="Anecdote with most votes" />
            <Anecdote anecdote={anecdotes[maxVoteIndex]} votes={allVotes[maxVoteIndex]} />
        </div>
    );
};

export default App;
