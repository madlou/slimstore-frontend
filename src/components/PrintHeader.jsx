import { Box, Divider, Text } from "@mantine/core"
import { FormContext } from '../providers/FormProvider.jsx';
import { useContext } from "react";

function PrintHeader() {
    const { response } = useContext(FormContext);
    return (
        <Box
            className="printonly"
        >
            <Text fw={700}>
                {response.uiTranslations.logo}
                {response.store.name}
            </Text>
            <Text>
                {response.store.address1}
                {response.store.address2 ? ', ' + response.store.address2 : ''}
            </Text>
            <Text>
                {response.store.city}
                {response.store.postCode ? ', ' + response.store.postCode : ''}
            </Text>
            <Text>
                {response.store.phoneNumber}
            </Text>
            <Divider mb={8} size='md' variant='dotted' />
        </Box>
    )
}

export default PrintHeader
