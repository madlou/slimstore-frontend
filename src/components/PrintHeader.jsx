import { Box, Divider, Text } from "@mantine/core"

function PrintHeader({ response }) {
    return (
        <Box
            display={'none'}
        >
            <Divider mb={8} size='md' variant='dotted' />
            <Text><b>{response.uiTranslations.logo}</b></Text>
            <Text>{response.store.name}</Text>
            <Text>{response.store.address1}</Text>
            <Text>{response.store.address2}</Text>
            <Text>{response.store.city}</Text>
            <Text>{response.store.postCode}</Text>
            <Text>{response.store.countryCode}</Text>
            <Text>{response.store.phoneNumber}</Text>
            <Divider mb={8} size='md' variant='dotted' />
        </Box>
    )
}

export default PrintHeader
