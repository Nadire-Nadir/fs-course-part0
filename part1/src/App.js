import Content from "./components/content";
import Header from "./components/header";
import Total from "./components/total";

const App = () => {
    const course = "Half Stack application development";

    const exercises = [
        { part1: "Fundamentals of React", exercises1: 10 },
        { part2: "Using props to pass data", exercises2: 7 },
        { part3: "State of a component", exercises3: 14 }
    ];

    const totalExercises =
        exercises[0].exercises1 +
        exercises[1].exercises2 +
        exercises[2].exercises3

    
    return (
        <div>
            <Header course={course} />
            <Content exercises={exercises} />
            <Total total={totalExercises} />
         </div>
    );
};

export default App;
