import { Flex, Container, Text } from '@mantine/core';
import { FormContext } from '../context/FormProvider.jsx';
import { useContext } from 'react';

function StatusBar() {
    const { response } = useContext(FormContext);
    const pad = (value, width, character = '0') => {
        value = value + '';
        return value.length >= width ? value : new Array(width - value.length + 1).join(character) + value;
    }
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
                <Text span>{pad(response.store.number, 4)}-{pad(response.register.number, 2)}</Text>
            </Container>
            <Container>
                <Text span visibleFrom='sm'>{response.uiTranslations.user}: </Text>
                <Text span>{response.user.name}</Text>
            </Container>
            <Container>
                <Text span visibleFrom='sm'>{response.uiTranslations.transaction}: </Text>
                <Text span>{pad(response.register.lastTxnNumber + 1, 6)}</Text>
            </Container>
            <Container>
                <Text span visibleFrom='sm'>{response.uiTranslations.status}: </Text>
                <Text span>{response.uiTranslations[response.register.status.toLowerCase()]}</Text>
            </Container>
        </Flex>
    )
}

export default StatusBar
