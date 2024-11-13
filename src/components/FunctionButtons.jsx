import { useEffect } from 'react'
import './FunctionButtons.css'
import Basket from './Basket';

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
    const doAction = (evt) => {
        if (evt.target.attributes.data.value.substring(0, 6) == 'submit') {
            props.submit(evt);
        } else {
            const data = evt.target.attributes.data.value.split(',');
            props.setProcess(data[1]);
            props.setAction(data[0]);
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
    const checkCondition = (value) => {
        if (!value) {
            return true;
        }
        const condition = value.split(' ');
        let first = '';
        let second = condition[2];
        switch (condition[0]) {
            case 'basket.length':
                first = props.data.basket.length;
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
    return (
        <div id="function-buttons">
            {fixedButtons.map((button, i) => {
                return (
                    <button
                        key={"F" + i}
                        id={"F" + button.position}
                        className={'secondary' + (button.label ? '' : ' invisible')}
                        onClick={doAction}
                        data={[button.action, button.process]}
                        disabled={!checkCondition(button.condition)}
                    >
                        <div data={[button.action, button.process]}>{"F" + button.position}</div>
                        <div data={[button.action, button.process]}>{button.label}</div>
                    </button>
                )
            })}
        </div>
    )
}

export default FunctionButtons
