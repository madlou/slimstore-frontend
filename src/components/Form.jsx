import { useEffect } from 'react'
import './Form.css'

function Form(props) {
    const submit = () => { }
    const focusChange = (evt) => {
        if (props.lastInputFocused?.target?.id === evt.target.id) {
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
            const input = { target: document.getElementById('input-0') };
            if (input) {
                focusChange(input);
                input.target.focus();
            }
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
                                return <tr key={key}>
                                    <td>{element.key}</td>
                                    <td><input id={'input-' + i} type='text' onFocus={focusChange} autoComplete="off" /></td>
                                </tr>
                            case 'password':
                                return <tr key={key}>
                                    <td>{element.key}</td>
                                    <td><input id={'input-' + i} type='password' onFocus={focusChange} autoComplete="off" /></td>
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
