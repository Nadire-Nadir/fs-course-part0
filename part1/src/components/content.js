const Content = (props) => {
    const { exercises } = props;
    return (
      <div>
        <p>
          {exercises[0].part1} {exercises[0].exercises1}
        </p>
        <p>
          {exercises[1].part2} {exercises[1].exercises2}
        </p>
        <p>
          {exercises[2].part3} {exercises[2].exercises3}
        </p>
      </div>
    );
}

export default Content;