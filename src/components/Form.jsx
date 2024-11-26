import { useState, useEffect } from 'react'
import './Form.css'
import { imageApi } from '../api/imageApi.js'

function Form(props) {
    const [formElements, setFormElements] = useState([]);
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
    const addProduct = (evt) => {
        setFormElements(formElements.map((element, i) => {
            if (element.key === evt.target.name) {
                element.value = element.value * 1 + 1;
            }
            return element;
        }));
    }
    const removeProduct = (evt) => {
        setFormElements(formElements.map((element, i) => {
            if (element.key === evt.target.name && element.value != '0') {
                element.value = element.value * 1 - 1;
            }
            return element;
        }));
    }
    const buttonClick = (evt) => {
        const key = evt.target.attributes.data.value;
        const element = formElements.find((element) => {
            return element.key == key ? true : false;
        })
        const formAction = element.button.action;
        const formProcess = element.button.form.process ?? "";
        const formSubmitElements = element.button.form.elements ?? [];
        props.getData(formAction, formSubmitElements, formProcess)
    }
    useEffect(() => {
        setTimeout(() => {
            const node = document.getElementById('form').querySelector('input[type=text]:not([disabled])');
            if (node) {
                const input = { target: node };
                focusChange(input);
                input.target.focus();
            }
            props.data.view.formElements.map((element, i) => {
                let key = props.data.view.name + ':' + i;
                if (element.value && document.getElementById(key) && document.getElementById(key).value == "") {
                    document.getElementById(key).value = element.value;
                }
            })
        }, 300)
        setFormElements(props.data.view.formElements);
    }, [props.data]);
    return (
        <div id='form' className='document container no-print'>
            {props.data.error ? <div className='error'>{props.data.error}</div> : ""}
            <div id='message' className='margin-below'>{props.data.view.message}</div>
            <form onSubmit={props.submit}>
                <table><tbody>
                    {formElements.map((element, i) => {
                        let key = props.data.view.name + ':' + i;
                        switch (element.type) {
                            case 'text':
                            case 'email':
                                return <tr key={key}>
                                    <td colSpan='2'>{element.label}</td>
                                    <td><input id={key} type='text' onFocus={focusChange} autoComplete="off" name={key} readOnly={props.showKeyboard} /></td>
                                </tr>
                            case 'disabled':
                                return <tr key={key}>
                                    <td colSpan='2'>{element.label}</td>
                                    <td><input id={key} type='text' name={key} disabled={true} /></td>
                                </tr>
                            case 'number':
                                return <tr key={key}>
                                    <td colSpan='2'>{element.label}</td>
                                    <td><input id={key} type='text' onFocus={focusChange} autoComplete="off" onKeyDown={numberOnly} name={key} readOnly={props.showKeyboard} /></td>
                                </tr>
                            case 'decimal':
                                return <tr key={key}>
                                    <td colSpan='2'>{element.label}</td>
                                    <td><input id={key} type='text' onFocus={focusChange} autoComplete="off" onKeyDown={decimalOnly} name={key} readOnly={props.showKeyboard} /></td>
                                </tr>
                            case 'date':
                                return <tr key={key}>
                                    <td colSpan='2'>{element.label}</td>
                                    <td><input id={key} type='date' onFocus={focusChange} autoComplete="off" name={key} onKeyDown={() => { }} /></td>
                                </tr>
                            case 'password':
                                return <tr key={key}>
                                    <td colSpan='2'>{element.label}</td>
                                    <td><input id={key} type='password' onFocus={focusChange} autoComplete="off" name={key} readOnly={props.showKeyboard} onKeyDown={() => { }} /></td>
                                </tr>
                            case 'submit':
                                return <tr key={key}>
                                    <td colSpan='3'><input id={key} type='submit' value={element.value} className='primary' /></td>
                                </tr>
                            case 'button':
                                return <tr key={key}>
                                    <td>{element.key}</td>
                                    <td>{element.value}</td>
                                    <td><button type='button' data={element.key} onClick={buttonClick}>{element.label}</button></td>
                                </tr>
                            case 'image':
                                if (element.image.substring(0, 5) == 'image') {
                                    element.image = imageApi().getUrl(element.image);
                                }
                                return <tr key={key}>
                                    <td><img src={element.image} /></td>
                                    <td>{element.key}</td>
                                    <td>{element.label}</td>
                                </tr>
                            case 'product':
                                if (element.image.substring(0, 5) == 'image') {
                                    element.image = imageApi().getUrl(element.image);
                                }
                                return <tr key={key}>
                                    <td className='imageBackground' colSpan='2'>
                                        <img src={element.image} />
                                    </td>
                                    <td>
                                        <div>{element.key}: {element.label}</div>
                                        <div>£{element.price.toFixed(2)}</div>
                                        <button type='button' className='tertiary' onClick={removeProduct} name={element.key}>-</button>
                                        <span className='quantity'>{element.value}</span>
                                        <button type='button' className='tertiary' onClick={addProduct} name={element.key}>+</button>
                                    </td>
                                </tr>
                            case 'select':
                                return <tr key={key}>
                                    <td>{element.label}</td>
                                    <td colSpan='2'>
                                        <select name={element.key}>
                                            {element.options.map((option, i) => {
                                                return <option key={key + ':' + i}>{option}</option>
                                            })}
                                        </select>
                                    </td>
                                </tr>
                        }
                    })}
                </tbody></table>
            </form>
        </div>
    )
}

export default Form
