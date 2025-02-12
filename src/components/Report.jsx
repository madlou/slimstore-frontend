import { Table } from "@mantine/core";
import { FormContext } from '../providers/FormProvider.jsx';
import { useContext } from "react";

function Report() {
    const { response } = useContext(FormContext);
    const camelToWords = (value) => {
        const step = value.replace(/([A-Z])/g, " $1");
        return step.charAt(0).toUpperCase() + step.slice(1);
    }
    const headers = Object.keys(response.report[0]);
    const tableData = {
        head: headers.map((cell) => {
            let title = cell;
            const lookup = cell.toCamelCase().replace(/ /g, '_');
            if (response.uiTranslations[lookup]) {
                title = response.uiTranslations[lookup];
            }
            return camelToWords(title)
        }),
        body: response.report.map((line) => {
            return Object.values(line).map((cell, j) => {
                if (headers[j] == 'type') {
                    return response.uiTranslations[cell.toLowerCase()]
                }
                return cell
            });
        }),
    };
    return (
        <Table
            data={ tableData }
            stickyHeader
        />
    )
}

export default Report
