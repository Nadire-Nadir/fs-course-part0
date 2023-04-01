const StatisticsLine = ({ text, value}) => {
    return (
        <tr>
            <th>{text}</th>
            <td>{value}</td>
        </tr>
    )
}

export default StatisticsLine;