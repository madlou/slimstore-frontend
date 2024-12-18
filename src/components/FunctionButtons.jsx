import { useEffect } from 'react'
import { Flex, Button, Tooltip } from '@mantine/core';

function FunctionButtons(props) {
    const fixedButtons = [];
    for (let i = 0; i < 8; i++) {
        fixedButtons[i + 1] = {
            label: '',
            position: i + 1,
        };
    }
    props.response.view.functionButtons.forEach(button => {
        fixedButtons[button.position] = button;
    });
    const checkCondition = (value) => {
        if (!value) {
            return true;
        }
        const condition = value.split(' ');
        let first = null;
        let second = condition[2];
        switch (condition[0]) {
            case 'user.role':
                first = props.response.user.role;
                break;
            case 'basket.length':
                first = props.response.basket.length;
                break;
            case 'tender.length':
                first = props.response.tender.length;
                break;
            case 'basket.total':
                first = 0;
                props.response.basket.map((row) => {
                    first += row.quantity * row.unitValue * (row.type == 'RETURN' ? -1 : 1);
                })
                break;
        }
        switch (condition[1]) {
            case '=':
            case '==':
                return first == second;
            case '!=':
                return first != second;
            case '<':
                return first < second;
            case '<=':
                return first <= second;
            case '>':
                return first > second;
            case '>=':
                return first >= second;
        }
    }
    const submit = (i, evt) => {
        const button = fixedButtons[i];
        if (button.primaryFormSubmit) {
            props.setRequestForm({ ...props.response.view.form, elements: props.formElements });
        } else {
            props.setRequestForm(button.form);
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8'].includes(e.key)) {
                e.preventDefault();
                document.getElementById(e.key).click();
            }
        }, false);
    }, []);
    return (
        <Flex
            id='function-buttons'
            gap='md'
            justify='space-around'
            align='center'
            direction='row'
            wrap='nowrap'
            pt='sm'
            pb='sm'
            pl='md'
            pr='md'
        >
            {
                fixedButtons.map((button, i) => {
                    return (
                        <Tooltip
                            label={'F' + button.position + ' - ' + button.label}
                            key={'F' + i}
                        >
                            <Button
                                id={'F' + button.position}
                                style={{ visibility: (button.label && checkCondition(button.condition)) ? '' : ' hidden' }}
                                onClick={(evt) => { submit(i, evt) }}
                                disabled={!checkCondition(button.condition)}
                                flex={1}
                                mih={48}
                                mah={48}
                                styles={{
                                    root: {
                                        padding: '0.2rem'
                                    },
                                    label: { textWrap: 'balance' },
                                }}

                            >
                                {/* <div>{'F' + button.position}</div> */}
                                {button.label}
                            </Button>
                        </Tooltip>
                    )
                })
            }
        </Flex >
    )
}

export default FunctionButtons
