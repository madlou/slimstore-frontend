import { Box, Divider } from "@mantine/core";
import { FormContext } from '../context/FormProvider.jsx';
import { useContext } from "react";

function PrintFooter() {
    const { response } = useContext(FormContext);
    const date = new Date();
    const dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const timeString = date.getHours() + ':' + date.getMinutes() + ':' + date.getMinutes();
    return (
        <Box
            display={'none'}
        >
            <Divider mb={8} size='md' variant='dotted' />
            {/* <Text>{response.uiTranslations.store}: {response.store.number}</Text>
            <Text>{response.uiTranslations.register}: {response.register.number}</Text>
            <Text>{response.uiTranslations.transaction_number}: {response.register.lastTxnNumber + 1}</Text>
            <Text>{response.uiTranslations.date}: {dateString}</Text>
            <Text>{response.uiTranslations.time}: {timeString}</Text> */}
            <Divider mb={8} size='md' variant='dotted' />
        </Box >
    )
}

export default PrintFooter
