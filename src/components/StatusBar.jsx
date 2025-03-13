import { Flex, Container, Text } from '@mantine/core';
import { FormContext } from '../providers/FormProvider.jsx';
import { LocationContext } from '../providers/LocationProvider.jsx';
import { TranslationContext } from '../providers/TranslationProvider.jsx';
import { useContext } from 'react';

function StatusBar() {
    const { response } = useContext(FormContext);
    const { store, register } = useContext(LocationContext);
    const { translations } = useContext(TranslationContext);
    const storeNumber = (store?.number ?? 0).toString().padStart(4, "0");
    const registerNumber = (register?.number ?? 0).toString().padStart(2, "0");
    const registerStatus = (register?.status ?? '').toLowerCase();
    const transactionNumber = (register?.lastTxnNumber + 1).toString().padStart(6, "0");
    return (
        <Flex
            id='function-buttons'
            height={32}
            gap='md'
            justify='space-around'
            align='center'
            direction='row'
            wrap='nowrap'
        >
            <Container>
                <Text span visibleFrom='sm'>{translations.store}-{translations.register}: </Text>
                <Text span>{storeNumber}-{registerNumber}</Text>
            </Container>
            <Container>
                <Text span visibleFrom='sm'>{translations.user}: </Text>
                <Text span>{response.user.name}</Text>
            </Container>
            <Container>
                <Text span visibleFrom='sm'>{translations.transaction}: </Text>
                <Text span>{transactionNumber}</Text>
            </Container>
            <Container>
                <Text span visibleFrom='sm'>{translations.status}: </Text>
                <Text span>{translations[registerStatus]}</Text>
            </Container>
        </Flex>
    )
}

export default StatusBar
