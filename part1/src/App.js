import Content from "./components/content";
import Header from "./components/header";
import Total from "./components/total";

const App = () => {
    const course = "Half Stack application development";

    const exercises = [
        { part: "Fundamentals of React", exercises: 10 },
        { part: "Using props to pass data", exercises: 7 },
        { part: "State of a component", exercises: 14 }
    ];

    const totalExercises =
        exercises[0].exercises +
        exercises[1].exercises +
        exercises[2].exercises

    
    return (
        <div>
            <Header course={course} />
            <Content exercises={exercises} />
            <Total total={totalExercises} />
        </div>
    );
};

export default App;
