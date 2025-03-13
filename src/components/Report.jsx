import { useContext } from "react";
import { Table } from "@mantine/core";
import { FormContext } from '../providers/FormProvider.jsx';
import { TranslationContext } from '../providers/TranslationProvider.jsx';

function Report() {
    const { response } = useContext(FormContext);
    const { translations } = useContext(TranslationContext);
    const camelToWords = (value) => {
        const step = value.replace(/([A-Z])/g, " $1");
        return step.charAt(0).toUpperCase() + step.slice(1);
    }
    const headers = Object.keys(response.report[0]);
    const tableData = {
        head: headers.map((cell) => {
            let title = cell;
            const lookup = cell.toCamelCase().replace(/ /g, '_');
            if (translations[lookup]) {
                title = translations[lookup];
            }
            return camelToWords(title)
        }),
        body: response.report.map((line) => {
            return Object.values(line).map((cell, j) => {
                if (headers[j] == 'type') {
                    return translations[cell.toLowerCase()]
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
