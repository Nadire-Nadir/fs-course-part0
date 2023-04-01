import { useState } from "react";
import Button from "./components/button";
import Header from "./components/header";
import Statistics from "./components/statistics";

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
      <div>
        <Header text="Give Feedback" />
        <Button text="Good" handleClick={() => setGood(good + 1)} />
        <Button text="Neutral" handleClick={() => setNeutral(neutral + 1)} />
        <Button text="Bad" handleClick={() => setBad(bad + 1)} />
        <Header text="Statistics" />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    );
};

export default App;
