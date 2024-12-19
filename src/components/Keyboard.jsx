import { Button, Container, Group, Paper } from '@mantine/core';

function Keyboard(props) {
    const tap = (evt) => {
        props.updateFormElements((draft) => {
            const idx = draft.findIndex((element) => {
                return props.viewName + ':' + element.key == props.inputFocused
            });
            if (idx >= 0) {
                let value = '';
                if (draft[idx].value) {
                    value += draft[idx].value;
                };
                const character = evt.target.textContent;
                if (character === 'DEL') {
                    value = value.substr(0, value.length - 1);
                } else if (character === 'SPACE') {
                    value = value + ' ';
                } else {
                    value = value + character;
                }
                draft[idx].value = value;
            }
        })
    }
    const display = props.showKeyboard ? 'block' : 'none';
    const bw = { base: 30, xs: 40, sm: 50, md: 60 };
    const bs = { root: { padding: '0' }, };
    const gap = 5;
    return (
        <Container
            id='keyboard'
            style={{ display: display, width: '100%' }}
        >
            <Group m={8} justify={'center'} wrap='nowrap' gap={gap}>
                <Button onClick={tap} w={bw} styles={bs}>1</Button>
                <Button onClick={tap} w={bw} styles={bs}>2</Button>
                <Button onClick={tap} w={bw} styles={bs}>3</Button>
                <Button onClick={tap} w={bw} styles={bs}>4</Button>
                <Button onClick={tap} w={bw} styles={bs}>5</Button>
                <Button onClick={tap} w={bw} styles={bs}>6</Button>
                <Button onClick={tap} w={bw} styles={bs}>7</Button>
                <Button onClick={tap} w={bw} styles={bs}>8</Button>
                <Button onClick={tap} w={bw} styles={bs}>9</Button>
                <Button onClick={tap} w={bw} styles={bs}>0</Button>
                <Button onClick={tap} w={bw} styles={bs}>DEL</Button>
            </Group>
            <Group m={8} justify={'center'} wrap='nowrap' gap={gap}>
                <Button onClick={tap} w={bw} styles={bs}>Q</Button>
                <Button onClick={tap} w={bw} styles={bs}>W</Button>
                <Button onClick={tap} w={bw} styles={bs}>E</Button>
                <Button onClick={tap} w={bw} styles={bs}>R</Button>
                <Button onClick={tap} w={bw} styles={bs}>T</Button>
                <Button onClick={tap} w={bw} styles={bs}>Y</Button>
                <Button onClick={tap} w={bw} styles={bs}>U</Button>
                <Button onClick={tap} w={bw} styles={bs}>I</Button>
                <Button onClick={tap} w={bw} styles={bs}>O</Button>
                <Button onClick={tap} w={bw} styles={bs}>P</Button>
            </Group>
            <Group m={8} justify={'center'} wrap='nowrap' gap={gap}>
                <Button onClick={tap} w={bw} styles={bs}>A</Button>
                <Button onClick={tap} w={bw} styles={bs}>S</Button>
                <Button onClick={tap} w={bw} styles={bs}>D</Button>
                <Button onClick={tap} w={bw} styles={bs}>F</Button>
                <Button onClick={tap} w={bw} styles={bs}>G</Button>
                <Button onClick={tap} w={bw} styles={bs}>H</Button>
                <Button onClick={tap} w={bw} styles={bs}>J</Button>
                <Button onClick={tap} w={bw} styles={bs}>K</Button>
                <Button onClick={tap} w={bw} styles={bs}>L</Button>
            </Group>
            <Group m={8} justify={'center'} wrap='nowrap' gap={gap}>
                <Button onClick={tap} w={bw} styles={bs}>Z</Button>
                <Button onClick={tap} w={bw} styles={bs}>X</Button>
                <Button onClick={tap} w={bw} styles={bs}>C</Button>
                <Button onClick={tap} w={bw} styles={bs}>V</Button>
                <Button onClick={tap} w={bw} styles={bs}>B</Button>
                <Button onClick={tap} w={bw} styles={bs}>N</Button>
                <Button onClick={tap} w={bw} styles={bs}>M</Button>
                <Button onClick={tap} w={bw} styles={bs}>,</Button>
                <Button onClick={tap} w={bw} styles={bs}>.</Button>
                <Button onClick={tap} w={bw} styles={bs}>SPACE</Button>
            </Group>
        </Container>

    )
}

export default Keyboard
