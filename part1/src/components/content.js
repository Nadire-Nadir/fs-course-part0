import Part from "./part";

const Content = (props) => {
    const { exercises } = props;

    return (
        <div>
            <Part part={exercises[0].part} exercises={exercises[0].exercises} />
            <Part part={exercises[1].part} exercises={exercises[1].exercises} />
            <Part part={exercises[2].part} exercises={exercises[2].exercises} />
        </div>
    );
}

export default Content;