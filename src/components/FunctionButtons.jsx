import { useContext, useEffect } from 'react'
import { Flex, Button, Tooltip } from '@mantine/core';
import { LayoutContext } from '../providers/LayoutProvider.jsx';
import { FormContext } from '../providers/FormProvider.jsx';

function FunctionButtons() {
    const { formatMoney, formElements, setRequestForm, response } = useContext(FormContext);
    const { showFunctionNumbers } = useContext(LayoutContext);
    const fixedButtons = new Array(8).fill({}, 1, 8).map((e, i) => {return {
            label: '',
            position: i + 1,
        }
    });
    response.view.functionButtons.forEach(button => {
        fixedButtons[button.position] = button;
    });
    const isReturn = (line) => {
        if (['RETURN', 'RETURN_MANUAL'].includes(line.type)) {
            return true;
        }
        return false;
    }
    const checkCondition = (value) => {
        if (!value) {
            return true;
        }
        const condition = value.split(' ');
        let first = null;
        let second = condition[2];
        switch (condition[0]) {
            case 'user.role':
                first = response.user.role;
                break;
            case 'basket.length':
                first = response.basket.length;
                break;
            case 'tender.length':
                first = response.tender.length;
                break;
            case 'basket.total':
                first = 0;
                response.basket.map((line) => {
                    first += line.quantity * line.unitValue * (isReturn(line) ? -1 : 1);
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
    const submit = (i) => {
        const button = fixedButtons[i];
        if (button.primaryFormSubmit) {
            let validForm = true;
            formElements.map((element) => {
                if (element.required && !element.value) {
                    validForm = false;
                }
            });
            if (validForm) {
                setRequestForm({ ...response.view.form, elements: formElements });
            }
        } else {
            setRequestForm(button.form);
        }
    }
    const isNumeric = (str) => {
        if (typeof str != "string") {
            return false;
        }
        return !isNaN(str) && !isNaN(parseFloat(str));
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
            wrap='wrap'
            pt='sm'
            pb='sm'
            pl='md'
            pr='md'
        >
            {
                fixedButtons.map((button, i) => {
                    const label = response.view.name.substring(0, 6) == 'TENDER' && isNumeric(button.label) ?
                        formatMoney(button.label) : button.label;
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
                                miw={{ base: '20%', sm: 'auto' }}
                                styles={{
                                    root: {
                                        padding: '0.2rem'
                                    },
                                    label: { textWrap: 'balance' },
                                }}
                            >
                                { showFunctionNumbers ? <div>{'F' + button.position}&nbsp;-&nbsp;</div> : ''}
                                <div>{label}</div>
                            </Button>
                        </Tooltip>
                    )
                })
            }
        </Flex >
    )
}

export default FunctionButtons