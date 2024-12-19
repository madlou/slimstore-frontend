import { useEffect, useRef, useCallback } from 'react'
import { useViewportSize } from '@mantine/hooks';
import { DatePickerInput } from '@mantine/dates';
import { TextInput, NumberInput, Paper, ScrollArea, Button, Box, Text, Group, Select, Image } from '@mantine/core';
import imageApi from '../util/imageApi.js'
import moneyConverter from '../util/moneyConverter.js';
import '@mantine/dates/styles.css';

function Form(props) {
    const focusChange = (i, id) => {
        if (id == props.inputFocused) {
            return false;
        }
        props.setInputFocused(id);
    }
    const quantityChange = (i, add, max) => {
        props.updateFormElements((draft) => {
            const value = draft[i].quantity + add * 1;
            if (value >= 0 && value <= max) {
                draft[i].quantity = value;
            }
        })
    }
    const valueChange = (i, value) => {
        props.updateFormElements((draft) => {
            draft[i].value = value;
        })
    }
    const formButtonClick = (i) => {
        props.setRequestForm(props.formElements[i].button.form);
    }
    const submit = (evt) => {
        evt.preventDefault();
        props.setRequestForm({ ...props.response.view.form, elements: props.formElements });
    }
    const { width, height } = useViewportSize();
    const mobileFix = height < 900 ? '112px ' : '80px';
    const scrollHeight = props.layout[1] == 12 ?
        'calc((100vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px) - ' + mobileFix + ')/2)' :
        'calc(100vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px) - 48px)';
    const scrollWidth = props.layout[1] == 12 ?
        'calc(100vw - 48px)' :
        'calc((100vw * ' + (props.layout[1] / 12) + ') - 96px )';
    useEffect(() => {
        if (!props.response.view.form.elements) {
            return;
        }
        const element = props.response.view.form.elements.find((element) => {
            return [
                'TEXT',
                'EMAIL',
                'NUMBER',
                'DECIMAL',
                'DATE',
                'PASSWORD',
            ].includes(element.type) && element.disabled != true;
        })
        if (element) {
            const id = props.response.view.name + ':' + element.key;
            props.setInputFocused(id);
        }
    }, [props.response.view]);
    return (
        <Paper
            shadow='md'
            radius='md'
            flex={1}
        >
            <ScrollArea.Autosize
                mx='auto'
                pt='xl'
                pr='xs'
                pb='xl'
                pl='xl'
                mah={scrollHeight}
            >
                {props.response.error ? <Text c={'salmon'}>{props.response.error}</Text> : ''}
                <Text id='message'>{props.response.view.message}</Text>
                <form onSubmit={submit}>
                    {props.formElements.map((element, i) => {
                        let key = props.response.view.name + ':' + element.key;
                        switch (element.type) {
                            case 'ERROR':
                                return <Text
                                    className='error'
                                    c={'salmon'}
                                    key={key}
                                    type='text'
                                    w={'95%'}
                                >{element.label}</Text>
                            case 'TEXT':
                            case 'EMAIL':
                                return <TextInput
                                    autoComplete='off'
                                    autoFocus={(key == props.inputFocused) ? true : false}
                                    className={key == props.inputFocused ? 'focused' : ''}
                                    disabled={element.disabled}
                                    display={element.hidden ? 'none' : 'block'}
                                    id={key}
                                    key={key}
                                    label={element.label}
                                    mt='md'
                                    name={key}
                                    onChange={(evt) => { valueChange(i, evt.currentTarget.value) }}
                                    onFocus={(evt) => { focusChange(i, evt.target.id) }}
                                    readOnly={props.showKeyboard}
                                    type='text'
                                    value={element.value ?? ''}
                                    w={'95%'}
                                />
                            case 'NUMBER':
                                return <NumberInput
                                    autoComplete='off'
                                    autoFocus={(key == props.inputFocused) ? true : false}
                                    className={key == props.inputFocused ? 'focused' : ''}
                                    disabled={element.disabled}
                                    display={element.hidden ? 'none' : 'block'}
                                    id={key}
                                    key={key}
                                    label={element.label}
                                    mt='md'
                                    name={key}
                                    onChange={(value) => { valueChange(i, value) }}
                                    onFocus={(evt) => { focusChange(i, evt.target.id) }}
                                    readOnly={props.showKeyboard}
                                    type='text'
                                    value={element.value ?? ''}
                                    w={'95%'}
                                />
                            case 'DECIMAL':
                                return <NumberInput
                                    autoComplete='off'
                                    autoFocus={(key == props.inputFocused) ? true : false}
                                    className={key == props.inputFocused ? 'focused' : ''}
                                    disabled={element.disabled}
                                    display={element.hidden ? 'none' : 'block'}
                                    id={key}
                                    key={key}
                                    label={element.label}
                                    mt='md'
                                    name={key}
                                    onChange={(value) => { valueChange(i, value) }}
                                    onFocus={(evt) => { focusChange(i, evt.target.id) }}
                                    readOnly={props.showKeyboard}
                                    type='text'
                                    value={element.value ?? ''}
                                    w={'95%'}
                                />
                            case 'DATE':
                                return <DatePickerInput
                                    autoComplete='off'
                                    className={key == props.inputFocused ? 'focused' : ''}
                                    disabled={element.disabled}
                                    display={element.hidden ? 'none' : 'block'}
                                    id={key}
                                    key={key}
                                    label={element.label}
                                    mt='md'
                                    name={key}
                                    valueFormat={props.response.uiTranslations.dateFormat.toUpperCase()}
                                    onChange={(value) => { valueChange(i, value.toISOString().slice(0, 10)) }}
                                    value={element.value ? new Date(element.value) : null}
                                    w={'95%'}
                                />
                            case 'PASSWORD':
                                return <TextInput
                                    autoComplete='off'
                                    autoFocus={(key == props.inputFocused) ? true : false}
                                    className={key == props.inputFocused ? 'focused' : ''}
                                    disabled={element.disabled}
                                    display={element.hidden ? 'none' : 'block'}
                                    id={key}
                                    key={key}
                                    label={element.label}
                                    mt='md'
                                    name={key}
                                    onChange={(evt) => { valueChange(i, evt.currentTarget.value) }}
                                    onFocus={(evt) => { focusChange(i, evt.target.id) }}
                                    readOnly={props.showKeyboard}
                                    type='password'
                                    value={element.value ?? ''}
                                    w={'95%'}
                                />
                            case 'SUBMIT':
                                return <Button
                                    className='primary'
                                    disabled={element.disabled}
                                    display={element.hidden ? 'none' : 'block'}
                                    id={key}
                                    key={key}
                                    label={element.label}
                                    mt='lg'
                                    type='submit'                                >
                                    {element.label}
                                </Button>
                            case 'BUTTON':
                                return <Group
                                    mt='sm'
                                    w={'95%'}
                                >
                                    <Button
                                        disabled={element.disabled}
                                        display={element.hidden ? 'none' : 'block'}
                                        onClick={() => { formButtonClick(i) }}
                                        key={key}
                                    >{element.label}</Button>
                                    <Text>{element.key + ' - ' + element.value}</Text>
                                </Group>
                            case 'IMAGE':
                                return <Box
                                    display={element.hidden ? 'none' : 'block'}
                                    key={key}
                                    w={'95%'}
                                >
                                    <img src={imageApi(element.image)} />
                                    <Text>{element.key}</Text>
                                    <Text>{element.label}</Text>
                                </Box>
                            case 'PRODUCT':
                            case 'PRODUCT_WEB':
                            case 'PRODUCT_DRINK':
                                return <Group
                                    key={key}
                                    mt='sm'
                                    style={{ flexWrap: 'nowrap' }}
                                    w={'95%'}
                                >
                                    <Box
                                        ta={'center'}
                                        w={16 * 6}
                                        h={16 * 6}
                                        bg='white'
                                    >
                                        <Image
                                            src={imageApi(element.image)}
                                            h={16 * 5}
                                            w={16 * 5}
                                            m={16 * 0.5}
                                        />
                                    </Box>
                                    <Box>
                                        <Box
                                            style={{ textWrap: 'nowrap' }}
                                        >{element.key}  {element.label}</Box>
                                        <Text>{moneyConverter(
                                            props.response.store.countryCode,
                                            props.response.store.currencyCode,
                                            element.price,
                                        )}</Text>
                                        <Group>
                                            <Button
                                                name={element.key} value='-1'
                                                onClick={(evt) => { quantityChange(i, -1, 99) }}
                                                type='button'
                                            >-</Button>
                                            <span className='quantity'>{element.quantity}</span>
                                            <Button
                                                name={element.key}
                                                onClick={(evt) => { quantityChange(i, 1, 99) }}
                                                type='button'
                                                value='1'
                                            >+</Button>
                                        </Group>
                                    </Box>
                                </Group>
                            case 'RETURN':
                                return <Group
                                    key={key}
                                    mt='sm'
                                    w={'95%'}
                                >
                                    <Box
                                        justify='normal'
                                    >
                                        <Box>{element.key}  {element.label}</Box>
                                        <Text>{element.value + 'x ' + moneyConverter(
                                            props.response.store.countryCode,
                                            props.response.store.currencyCode,
                                            element.price,
                                        )}</Text>
                                        <Group>
                                            <Button
                                                name={element.key} value='-1'
                                                onClick={(evt) => { quantityChange(i, -1, element.value * 1) }}
                                                type='button'
                                            >-</Button>
                                            <span className='quantity'>{element.quantity}</span>
                                            <Button
                                                name={element.key}
                                                onClick={(evt) => { quantityChange(i, 1, element.value * 1) }}
                                                type='button'
                                                value='1'
                                            >+</Button>
                                        </Group>
                                    </Box>
                                </Group>
                            case 'SELECT':
                                let selectOptions = [];
                                if (Array.isArray(element.options)) {
                                    selectOptions = element.options.map((option, i) => {
                                        if (option) {
                                            const optionSplit = option.split('|');
                                            return {
                                                value: optionSplit[0],
                                                label: optionSplit[1] ?? optionSplit[0],
                                            }
                                        }
                                    })
                                }
                                return <Select
                                    label={element.label}
                                    disabled={element.disabled}
                                    display={element.hidden ? 'none' : 'block'}
                                    data={selectOptions}
                                    id={key}
                                    key={key}
                                    mt='lg'
                                    name={element.key}
                                    onChange={(value) => { valueChange(i, value) }}
                                    value={element.value}
                                    w={'95%'}
                                />
                        }
                    })}
                </form>
            </ScrollArea.Autosize >
        </Paper >
    )
}

export default Form
