import { useEffect } from 'react'
import './FunctionButtons.css'

function FunctionButtons(props) {
    const fixedButtons = [];
    for (let i = 0; i < 8; i++) {
        fixedButtons[i + 1] = {
            label: "",
            position: i + 1,
        };
    }
    props.buttons.forEach(button => {
        fixedButtons[button.position] = button;
    });
    const checkCondition = (value) => {
        if (!value) {
            return true;
        }
        const condition = value.split(' ');
        let first = null;
        let second = condition[2] * 1;
        switch (condition[0]) {
            case 'basket.length':
                first = props.response.basket.length;
                break;
            case 'tender.length':
                first = props.response.tender.length;
                break;
            case 'basket.total':
                first = 0;
                props.response.basket.map((row) => {
                    first += row.quantity * row.unitValue * (row.type == "RETURN" ? -1 : 1);
                })
                break;
        }
        switch (condition[1]) {
            case '=':
            case '==':
                return first == second;
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
        document.addEventListener("keydown", (e) => {
            if (["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8"].includes(e.key)) {
                e.preventDefault();
                document.getElementById(e.key).click();
            }
        }, false);
    }, []);
    return (
        <div id="function-buttons">
            {fixedButtons.map((button, i) => {
                return (
                    <button
                        key={"F" + i}
                        id={"F" + button.position}
                        className={'secondary' + (button.label ? '' : ' invisible')}
                        onClick={(evt) => { submit(i, evt) }}
                        disabled={!checkCondition(button.condition)}
                    >
                        <div>{"F" + button.position}</div>
                        <div>{button.label}</div>
                    </button>
                )
            })}
        </div>
    )
}

export default FunctionButtons
