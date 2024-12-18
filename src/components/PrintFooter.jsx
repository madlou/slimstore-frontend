import { Box, Divider } from "@mantine/core";

function PrintFooter(props) {
    const date = new Date();
    const dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const timeString = date.getHours() + ':' + date.getMinutes() + ':' + date.getMinutes();
    return (
        <Box
            display={'none'}
        >
            <Divider mb={8} size='md' variant='dotted' />
            {/* <Text>{props.response.uiTranslations.store}: {props.response.store.number}</Text>
            <Text>{props.response.uiTranslations.register}: {props.response.register.number}</Text>
            <Text>{props.response.uiTranslations.transaction_number}: {props.response.register.lastTxnNumber + 1}</Text>
            <Text>{props.response.uiTranslations.date}: {dateString}</Text>
            <Text>{props.response.uiTranslations.time}: {timeString}</Text> */}
            <Divider mb={8} size='md' variant='dotted' />
        </Box >
    )
}

export default PrintFooter
