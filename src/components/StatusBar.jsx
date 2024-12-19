import { Flex, Container, Text } from '@mantine/core';

function StatusBar(props) {
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
                <Text span visibleFrom='sm'>{props.uiTranslations.store}-{props.uiTranslations.register}: </Text>
                <Text span>{pad(props.store.number, 4)}-{pad(props.register.number, 2)}</Text>
            </Container>
            <Container>
                <Text span visibleFrom='sm'>{props.uiTranslations.user}: </Text>
                <Text span>{props.user.name}</Text>
            </Container>
            <Container>
                <Text span visibleFrom='sm'>{props.uiTranslations.transaction}: </Text>
                <Text span>{pad(props.register.lastTxnNumber + 1, 6)}</Text>
            </Container>
            <Container>
                <Text span visibleFrom='sm'>{props.uiTranslations.status}: </Text>
                <Text span>{props.register.status}</Text>
            </Container>
        </Flex>
    )
}

export default StatusBar
