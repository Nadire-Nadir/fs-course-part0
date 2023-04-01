import StatisticsLine from "./statisticLine";

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;
    const average = ((good * 1 + bad * (-1) + neutral * 0) / total).toFixed(1);
    const positive = (((good / total) * 100).toFixed(1)) + "%";

    return (
        <div>
            {good === 0 && neutral === 0 && bad === 0 ? (
                <p>No feedback given</p>
            ) : (
                <table>
                    <tbody>
                        <StatisticsLine text="Good" value={good} />
                        <StatisticsLine text="Neutral" value={neutral} />
                        <StatisticsLine text="Bad" value={bad} />
                        <StatisticsLine text="All" value={total} />

                        <StatisticsLine text="Average:" value={average} />
                        <StatisticsLine text="Positive:" value={positive} />
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Statistics;