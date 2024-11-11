import { useEffect } from 'react'
import './Form.css'

function Form(props) {
    const submit = (evt) => {
        evt.preventDefault();
        for (let i = 0; i < evt.target.length; i++) {
            props.formElements[i].value = evt.target[i].value;
        }
        props.setRequestForm(props.formElements)
        props.setAction(props.formSuccess);
    }
    const numberOnly = (evt) => {
        if (evt.which > 57) {
            evt.preventDefault();
        }
    }
    const decimalOnly = (evt) => {
        if (evt.which > 57 && evt.which != 190) {
            evt.preventDefault();
        }
    }
    const focusChange = (evt) => {
        if (!evt.target || props.lastInputFocused?.target?.id === evt.target.id) {
            return;
        }
        if (props.lastInputFocused?.target) {
            props.lastInputFocused.target.style.backgroundColor = 'lightgrey';
        }
        evt.target.style.backgroundColor = 'yellow';
        props.setLastInputFocused(evt)
    }
    useEffect(() => {
        setTimeout(() => {
            const node = document.getElementById('input-0');
            if (!node) {
                return;
            }
            const input = { target: node };
            focusChange(input);
            input.target.focus();
        }, 300)
    }, [props.action]);
    return (
        <div id='form' className='document container'>
            <div id='message' className='margin-below'>{props.message}</div>
            <form onSubmit={submit}>
                <table><tbody>
                    {props.formElements.map((element, i) => {
                        const key = props.action + ':' + i;
                        switch (element.type) {
                            case 'text':
                            case 'email':
                                return <tr key={key}>
                                    <td>{element.label}</td>
                                    <td><input id={'input-' + i} type='text' onFocus={focusChange} autoComplete="off" name={key} /></td>
                                </tr>
                            case 'number':
                                return <tr key={key}>
                                    <td>{element.label}</td>
                                    <td><input id={'input-' + i} type='text' onFocus={focusChange} autoComplete="off" onKeyDown={numberOnly} name={key} /></td>
                                </tr>
                            case 'decimal':
                                return <tr key={key}>
                                    <td>{element.label}</td>
                                    <td><input id={'input-' + i} type='text' onFocus={focusChange} autoComplete="off" onKeyDown={decimalOnly} name={key} /></td>
                                </tr>
                            case 'date':
                                return <tr key={key}>
                                    <td>{element.label}</td>
                                    <td><input id={'input-' + i} type='date' onFocus={focusChange} autoComplete="off" name={key} /></td>
                                </tr>
                            case 'password':
                                return <tr key={key}>
                                    <td>{element.label}</td>
                                    <td><input id={'input-' + i} type='password' onFocus={focusChange} autoComplete="off" name={key} /></td>
                                </tr>
                            case 'submit':
                                return <tr key={key}>
                                    <td colSpan='2'><input id={'input-' + i} type='submit' value={element.value} className='primary' /></td>
                                </tr>
                            case 'button':
                                return <tr key={key}>
                                    <td colSpan='2'><button>{element.value}</button></td>
                                </tr>
                            case 'image':
                                return <tr key={key}>
                                    <td><img src={element.value} /></td><td>{element.key} - {element.label}</td>
                                </tr>
                        }
                    })}
                </tbody></table>
            </form>
        </div>
    )
}

export default Form
