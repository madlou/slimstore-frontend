import { Table } from "@mantine/core";

function Report({ report, uiTranslations }) {
    const camelToWords = (value) => {
        const step = value.replace(/([A-Z])/g, " $1");
        return step.charAt(0).toUpperCase() + step.slice(1);
    }
    const tableData = {
        head: Object.keys(report[0]).map((cell, i) => {
            let title = cell;
            const lookup = cell.toCamelCase().replace(/ /g, '_');
            if (uiTranslations[lookup]) {
                title = uiTranslations[lookup];
            }
            return <th key={'report-header:' + i}>{camelToWords(title)}</th>
        }),
        body: report.map((line, i) => {
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
