import { Flex, Container, Text } from '@mantine/core';

function StatusBar({ store, register, uiTranslations, user }) {
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
                <Text span visibleFrom='sm'>{uiTranslations.store}-{uiTranslations.register}: </Text>
                <Text span>{pad(store.number, 4)}-{pad(register.number, 2)}</Text>
            </Container>
            <Container>
                <Text span visibleFrom='sm'>{uiTranslations.user}: </Text>
                <Text span>{user.name}</Text>
            </Container>
            <Container>
                <Text span visibleFrom='sm'>{uiTranslations.transaction}: </Text>
                <Text span>{pad(register.lastTxnNumber + 1, 6)}</Text>
            </Container>
            <Container>
                <Text span visibleFrom='sm'>{uiTranslations.status}: </Text>
                <Text span>{register.status}</Text>
            </Container>
        </Flex>
    )
}

export default StatusBar
