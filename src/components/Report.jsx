import './Report.css'

function Report(props) {
    const camelToWords = (value) => {
        const step = value.replace(/([A-Z])/g, " $1");
        return step.charAt(0).toUpperCase() + step.slice(1);
    }
    return (
        <div id='report' className='document container'>
            <table><tbody>
                <tr>
                    {Object.keys(props.report[0]).map((cell, i) => {
                        let title = cell;
                        const lookup = cell.toCamelCase().replace(/ /g, "_");
                        if (props.uiTranslations[lookup]) {
                            title = props.uiTranslations[lookup];
                        }
                        return <th key={'report-header:' + i}>{camelToWords(title)}</th>
                    })}
                </tr>
                {props.report.map((line, i) => {
                    return (
                        <tr key={'report:' + i}>
                            {Object.values(line).map((cell, j) => {
                                return <td key={i + ':' + j}>{cell}</td>
                            })}
                        </tr>
                    );
                })}
            </tbody></table>
        </div>
    )
}

export default Report
