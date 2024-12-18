import { Flex, Container } from '@mantine/core';

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
                <label>{props.uiTranslations.store}-{props.uiTranslations.register}: </label>
                <span>{pad(props.store.number, 4)}-{pad(props.register.number, 2)}</span>
            </Container>
            <Container>
                <label>{props.uiTranslations.user}: </label>
                <span>{props.user.name}</span>
            </Container>
            <Container>
                <label>{props.uiTranslations.transaction}: </label>
                <span>{pad(props.register.lastTxnNumber + 1, 6)}</span>
            </Container>
            <Container>
                <label>{props.uiTranslations.status}: </label>
                <span>{props.register.status}</span>
            </Container>
        </Flex>
    )
}

export default StatusBar
