import { Box, Divider, Group, Text } from "@mantine/core";
import { FormContext } from '../providers/FormProvider.jsx';
import { useContext } from "react";

function PrintFooter() {
    const { response } = useContext(FormContext);
    const date = new Date();
    const dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const timeString = date.getHours() + ':' + date.getMinutes() + ':' + date.getMinutes();
    return (
        <Box
            className="printonly"
        >
            <Divider mb={8} size='md' variant='dotted' />
            <Group
                justify={'space-between'}
            >
                <Text>{response.uiTranslations.store}: {response.store.number}</Text>
                <Text>{response.uiTranslations.register}: {response.register.number}</Text>
                <Text>{response.uiTranslations.transaction}: {response.register.lastTxnNumber + 1}</Text>
            </Group>
            <Group
                justify={'space-between'}
            >
                <Text>{response.uiTranslations.date}: { dateString }</Text>
                <Text>{response.uiTranslations.time}: { timeString }</Text>
            </Group>
            <Divider mb={8} size='md' variant='dotted' />
        </Box >
    )
}

export default PrintFooter
