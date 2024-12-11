import { useEffect } from 'react'
import './Form.css'
import { imageApi } from '../api/imageApi.js'

function Form(props) {
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
    const focusChange = (i, target) => {
        if (target.id == props.inputFocused) {
            return false;
        }
        props.setInputFocused(target.id);
    }
    const quantityChange = (i, target, max) => {
        props.updateFormElements((draft) => {
            const value = draft[i].quantity + target.value * 1;
            if (value >= 0 && value <= max) {
                draft[i].quantity = value;
            }
        })
    }
    const change = (i, target) => {
        props.updateFormElements((draft) => {
            draft[i].value = target.value;
        })
    }
    const formButtonClick = (i) => {
        props.setRequestForm(props.formElements[i].button.form);
    }
    const submit = (evt) => {
        evt.preventDefault();
        props.setRequestForm({ ...props.response.view.form, elements: props.formElements });
    }
    useEffect(() => {
        if (!props.response.view.form.elements) {
            return;
        }
        const element = props.response.view.form.elements.find((element) => {
            return [
                "TEXT",
                "EMAIL",
                "NUMBER",
                "DECIMAL",
                "DATE",
                "PASSWORD",
            ].includes(element.type) && element.disabled != true;
        })
        if (element) {
            const id = props.response.view.name + ':' + element.key;
            props.setInputFocused(id);
        }
    }, [props.response.view]);
    return (
        <div id='form' className='document container no-print'>
            {props.response.error ? <div className='error'>{props.response.error}</div> : ""}
            <div id='message' className='margin-below'>{props.response.view.message}</div>
            <form onSubmit={submit}>
                <table><tbody>
                    {props.formElements.map((element, i) => {
                        let key = props.response.view.name + ':' + element.key;
                        switch (element.type) {
                            case 'TEXT':
                            case 'EMAIL':
                                return <tr key={key} style={{ display: element.hidden ? 'none' : 'table-row' }}>
                                    <td colSpan='2'>{element.label}</td>
                                    <td><input
                                        autoComplete="off"
                                        autoFocus={(key == props.inputFocused) ? true : false}
                                        className={key == props.inputFocused ? "focused" : ""}
                                        disabled={element.disabled}
                                        id={key}
                                        name={key}
                                        onChange={(evt) => { change(i, evt.target) }}
                                        onFocus={(evt) => { focusChange(i, evt.target) }}
                                        readOnly={props.showKeyboard}
                                        type='text'
                                        value={element.value ?? ''}
                                    /></td>
                                </tr>
                            case 'NUMBER':
                                return <tr key={key}>
                                    <td colSpan='2'>{element.label}</td>
                                    <td><input
                                        autoComplete="off"
                                        autoFocus={(key == props.inputFocused) ? true : false}
                                        className={key == props.inputFocused ? "focused" : ""}
                                        disabled={element.disabled}
                                        id={key}
                                        name={key}
                                        onChange={(evt) => { change(i, evt.target) }}
                                        onFocus={(evt) => { focusChange(i, evt.target) }}
                                        onKeyDown={numberOnly}
                                        readOnly={props.showKeyboard}
                                        type='text'
                                        value={element.value ?? ''}
                                    /></td>
                                </tr>
                            case 'DECIMAL':
                                return <tr key={key} style={{ display: element.hidden ? 'none' : 'table-row' }}>
                                    <td colSpan='2'>{element.label}</td>
                                    <td><input
                                        autoComplete="off"
                                        autoFocus={(key == props.inputFocused) ? true : false}
                                        className={key == props.inputFocused ? "focused" : ""}
                                        disabled={element.disabled}
                                        id={key}
                                        name={key}
                                        onChange={(evt) => { change(i, evt.target) }}
                                        onFocus={(evt) => { focusChange(i, evt.target) }}
                                        onKeyDown={decimalOnly}
                                        readOnly={props.showKeyboard}
                                        type='text'
                                        value={element.value ?? ''}
                                    /></td>
                                </tr>
                            case 'DATE':
                                return <tr key={key}>
                                    <td colSpan='2'>{element.label}</td>
                                    <td><input
                                        autoComplete="off"
                                        autoFocus={(key == props.inputFocused) ? true : false}
                                        className={key == props.inputFocused ? "focused" : ""}
                                        disabled={element.disabled}
                                        id={key}
                                        name={key}
                                        onChange={(evt) => { change(i, evt.target) }}
                                        onFocus={(evt) => { focusChange(i, evt.target) }}
                                        type='date'
                                        value={element.value ?? ''}
                                    /></td>
                                </tr>
                            case 'PASSWORD':
                                return <tr key={key} style={{ display: element.hidden ? 'none' : 'table-row' }}>
                                    <td colSpan='2'>{element.label}</td>
                                    <td><input
                                        autoComplete="off"
                                        autoFocus={(key == props.inputFocused) ? true : false}
                                        className={key == props.inputFocused ? "focused" : ""}
                                        disabled={element.disabled}
                                        id={key}
                                        name={key}
                                        onChange={(evt) => { change(i, evt.target) }}
                                        onFocus={(evt) => { focusChange(i, evt.target) }}
                                        readOnly={props.showKeyboard}
                                        type='password'
                                        value={element.value ?? ''}
                                    /></td>
                                </tr>
                            case 'SUBMIT':
                                return <tr key={key} style={{ display: element.hidden ? 'none' : 'table-row' }}>
                                    <td colSpan='3'><input
                                        className='primary'
                                        disabled={element.disabled}
                                        id={key}
                                        type='submit'
                                        value={element.label}
                                    /></td>
                                </tr>
                            case 'BUTTON':
                                return <tr key={key} style={{ display: element.hidden ? 'none' : 'table-row' }}>
                                    <td>{element.key}</td>
                                    <td>{element.value}</td>
                                    <td><button
                                        disabled={element.disabled}
                                        onClick={() => { formButtonClick(i) }}
                                        type='button'
                                    >
                                        {element.label}
                                    </button></td>
                                </tr>
                            case 'IMAGE':
                                if (element.image.substring(0, 5) == 'image') {
                                    element.image = imageApi().getUrl(element.image);
                                }
                                return <tr key={key} style={{ display: element.hidden ? 'none' : 'table-row' }}>
                                    <td><img src={element.image} /></td>
                                    <td>{element.key}</td>
                                    <td>{element.label}</td>
                                </tr>
                            case 'PRODUCT':
                            case 'PRODUCT_WEB':
                            case 'PRODUCT_DRINK':
                                if (element.image.substring(0, 5) == 'image') {
                                    element.image = imageApi().getUrl(element.image);
                                }
                                return <tr key={key} style={{ display: element.hidden ? 'none' : 'table-row' }}>
                                    <td className='imageBackground' colSpan='2'>
                                        <img src={element.image} />
                                    </td>
                                    <td>
                                        <div>{element.key}: {element.label}</div>
                                        <div>£{element.price.toFixed(2)}</div>
                                        <button
                                            className='tertiary'
                                            name={element.key} value='-1'
                                            onClick={(evt) => { quantityChange(i, evt.target, 99) }}
                                            type='button'
                                        >
                                            -
                                        </button>
                                        <span className='quantity'>{element.quantity}</span>
                                        <button
                                            className='tertiary'
                                            name={element.key}
                                            onClick={(evt) => { quantityChange(i, evt.target, 99) }}
                                            type='button'
                                            value='1'
                                        >
                                            +
                                        </button>
                                    </td>
                                </tr>
                            case 'RETURN':
                                return <tr key={key} id={key} style={{ display: element.hidden ? 'none' : 'table-row' }}>
                                    <td>
                                        <div>{element.value}x</div>
                                    </td>
                                    <td>
                                        <div>{element.label} @ £{element.price.toFixed(2)}</div>
                                    </td>
                                    <td>
                                        <button
                                            className='tertiary'
                                            name={element.key} value='-1'
                                            onClick={(evt) => { quantityChange(i, evt.target, element.value * 1) }}
                                            type='button'
                                        >
                                            -
                                        </button>
                                        <span className='quantity'>{element.quantity}</span>
                                        <button
                                            className='tertiary'
                                            name={element.key}
                                            onClick={(evt) => { quantityChange(i, evt.target, element.value * 1) }}
                                            type='button'
                                            value='1'
                                        >
                                            +
                                        </button>
                                    </td>
                                </tr>
                            case 'SELECT':
                                return <tr key={key} style={{ display: element.hidden ? 'none' : 'table-row' }}>
                                    <td style={{ display: element.label ? 'block' : 'none' }}>{element.label}</td>
                                    <td colSpan='2'>
                                        <select
                                            id={key}
                                            disabled={element.disabled}
                                            name={element.key}
                                            onChange={(evt) => { change(i, evt.target) }}
                                            value={element.value}
                                        >
                                            {element.options.map((option, i) => {
                                                if (option) {
                                                    const optionSplit = option.split("|");
                                                    return <option key={key + ':' + i} value={optionSplit[0]}> {optionSplit[1] ?? optionSplit[0]}</option>
                                                }
                                            })}
                                        </select>
                                    </td>
                                </tr>
                        }
                    })}
                </tbody></table>
            </form>
        </div >
    )
}

export default Form
