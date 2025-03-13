import { Box, Divider, Group, Text } from "@mantine/core";
import { LocationContext } from '../providers/LocationProvider.jsx';
import { TranslationContext } from '../providers/TranslationProvider.jsx';
import { useContext } from "react";

function PrintFooter() {
    const { register, store } = useContext(LocationContext);
    const { translations } = useContext(TranslationContext);
    const date = new Date();
    const dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const timeString = date.getHours() + ':' + date.getMinutes() + ':' + date.getMinutes();
    return (
        <Box
            className="printonly"
        >
            { register && store && (<>
                <Divider mb={8} size='md' variant='dotted' />
                <Group
                    justify={'space-between'}
                >
                    <Text>{translations.store}: {store.number}</Text>
                    <Text>{translations.register}: {register.number}</Text>
                    <Text>{translations.transaction}: {register.lastTxnNumber + 1}</Text>
                </Group>
                <Group
                    justify={'space-between'}
                >
                    <Text>{translations.date}: { dateString }</Text>
                    <Text>{translations.time}: { timeString }</Text>
                </Group>
                <Divider mb={8} size='md' variant='dotted' />
            </>) }
        </Box >
    )
}

export default PrintFooter
