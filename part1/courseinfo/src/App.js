import Content from "./components/content";
import Header from "./components/header";
import Total from "./components/total";

const App = () => {

    const course = {
        name: "Half Stack application development",
        parts: [
            { name: "Fundamentals of React", exercises: 10 },
            { name: "Using props to pass data", exercises: 7 },
            { name: "State of a component", exercises: 14 }]
    };

    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

export default App;
