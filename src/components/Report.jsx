import { Table } from "@mantine/core";

function Report(props) {
    const camelToWords = (value) => {
        const step = value.replace(/([A-Z])/g, " $1");
        return step.charAt(0).toUpperCase() + step.slice(1);
    }
    const tableData = {
        head: Object.keys(props.report[0]).map((cell, i) => {
            let title = cell;
            const lookup = cell.toCamelCase().replace(/ /g, '_');
            if (props.uiTranslations[lookup]) {
                title = props.uiTranslations[lookup];
            }
            return <th key={'report-header:' + i}>{camelToWords(title)}</th>
        }),
        body: props.report.map((line, i) => {
            return Object.values(line).map((cell, j) => {
                return cell
            });
        }),
    };
    return (
        <Table
            data={tableData}
            stickyHeader
        />
    )
}

export default Report
