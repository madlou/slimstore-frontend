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
    return (
        <Container
            id='keyboard'
            style={{ display: display, width: '100%' }}
        >
            <Group m={8} justify={'center'}>
                <Button onClick={tap}>1</Button>
                <Button onClick={tap}>2</Button>
                <Button onClick={tap}>3</Button>
                <Button onClick={tap}>4</Button>
                <Button onClick={tap}>5</Button>
                <Button onClick={tap}>6</Button>
                <Button onClick={tap}>7</Button>
                <Button onClick={tap}>8</Button>
                <Button onClick={tap}>9</Button>
                <Button onClick={tap}>0</Button>
                <Button onClick={tap}>DEL</Button>
            </Group>
            <Group m={8} justify={'center'}>
                <Button onClick={tap}>Q</Button>
                <Button onClick={tap}>W</Button>
                <Button onClick={tap}>E</Button>
                <Button onClick={tap}>R</Button>
                <Button onClick={tap}>T</Button>
                <Button onClick={tap}>Y</Button>
                <Button onClick={tap}>U</Button>
                <Button onClick={tap}>I</Button>
                <Button onClick={tap}>O</Button>
                <Button onClick={tap}>P</Button>
            </Group>
            <Group m={8} justify={'center'}>
                <Button onClick={tap}>A</Button>
                <Button onClick={tap}>S</Button>
                <Button onClick={tap}>D</Button>
                <Button onClick={tap}>F</Button>
                <Button onClick={tap}>G</Button>
                <Button onClick={tap}>H</Button>
                <Button onClick={tap}>J</Button>
                <Button onClick={tap}>K</Button>
                <Button onClick={tap}>L</Button>
            </Group>
            <Group m={8} justify={'center'}>
                <Button onClick={tap}>Z</Button>
                <Button onClick={tap}>X</Button>
                <Button onClick={tap}>C</Button>
                <Button onClick={tap}>V</Button>
                <Button onClick={tap}>B</Button>
                <Button onClick={tap}>N</Button>
                <Button onClick={tap}>M</Button>
                <Button onClick={tap}>,</Button>
                <Button onClick={tap}>.</Button>
                <Button onClick={tap}>SPACE</Button>
            </Group>
        </Container>

    )
}

export default Keyboard
