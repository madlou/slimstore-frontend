import { useContext } from "react";
import { Box, Divider, Text } from "@mantine/core"
import { LocationContext } from '../providers/LocationProvider.jsx';
import { TranslationContext } from '../providers/TranslationProvider.jsx';

function PrintHeader() {
    const { store } = useContext(LocationContext);
    const { translations } = useContext(TranslationContext);
    return (
        <Box
            className="printonly"
        >
            { store && (<>
                <Text fw={700}>
                    {translations.logo}
                    {store.name}
                </Text>
                <Text>
                    {store.address1}
                    {store.address2 ? ', ' + store.address2 : ''}
                </Text>
                <Text>
                    {store.city}
                    {store.postCode ? ', ' + store.postCode : ''}
                </Text>
                <Text>
                    {store.phoneNumber}
                </Text>
                <Divider mb={8} size='md' variant='dotted' />
            </>) }
        </Box>
    )
}

export default PrintHeader
