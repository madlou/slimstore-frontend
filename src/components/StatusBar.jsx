import { Flex, Container, Text } from '@mantine/core';
import { FormContext } from '../providers/FormProvider.jsx';
import { useContext } from 'react';

function StatusBar() {
    const { response } = useContext(FormContext);
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
                <Text span visibleFrom='sm'>{response.uiTranslations.store}-{response.uiTranslations.register}: </Text>
                <Text span>{response.store.number.toString().padStart(4, "0")}-{response.register.number.toString().padStart(2, "0")}</Text>
            </Container>
            <Container>
                <Text span visibleFrom='sm'>{response.uiTranslations.user}: </Text>
                <Text span>{response.user.name}</Text>
            </Container>
            <Container>
                <Text span visibleFrom='sm'>{response.uiTranslations.transaction}: </Text>
                <Text span>{(response.register.lastTxnNumber + 1).toString().padStart(6, "0")}</Text>
            </Container>
            <Container>
                <Text span visibleFrom='sm'>{response.uiTranslations.status}: </Text>
                <Text span>{response.uiTranslations[response.register?.status.toLowerCase() ?? '']}</Text>
            </Container>
        </Flex>
    )
}

export default StatusBar
