import { Box, Divider, Text } from "@mantine/core"

function PrintHeader(props) {
    return (
        <Box
            display={'none'}
        >
            <Divider mb={8} size='md' variant='dotted' />
            <Text><b>{props.response.uiTranslations.logo}</b></Text>
            <Text>{props.response.store.name}</Text>
            <Text>{props.response.store.address1}</Text>
            <Text>{props.response.store.address2}</Text>
            <Text>{props.response.store.city}</Text>
            <Text>{props.response.store.postCode}</Text>
            <Text>{props.response.store.countryCode}</Text>
            <Text>{props.response.store.phoneNumber}</Text>
            <Divider mb={8} size='md' variant='dotted' />
        </Box>
    )
}

export default PrintHeader
