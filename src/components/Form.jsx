import { useContext, useEffect } from 'react';
import { Box, Button, Group, Image, NumberInput, Paper, ScrollArea, Select, Text, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useViewportSize } from '@mantine/hooks';
import moneyConverter from '../util/moneyConverter.js';
import '@mantine/dates/styles.css';
import { LayoutContext } from '../context/LayoutProvider.jsx';
import { FormContext } from '../context/FormProvider.jsx';

function Form() {
    const { inputFocused, setInputFocused, layout, showKeyboard } = useContext(LayoutContext);
    const { formElements, updateFormElements, setRequestForm, response } = useContext(FormContext);
    const focusChange = (i, id) => {
        if (id == inputFocused) {
            return false;
        }
        setInputFocused(id);
    }
    const quantityChange = (i, add, max) => {
        updateFormElements((draft) => {
            const value = draft[i].quantity + add * 1;
            if (value >= 0 && value <= max) {
                draft[i].quantity = value;
            }
        })
    }
    const valueChange = (i, value) => {
        updateFormElements((draft) => {
            draft[i].value = value;
        })
    }
    const formButtonClick = (i) => {
        setRequestForm(formElements[i].button.form);
    }
    const getImageUrl = (url) => {
        if (url.substring(0, 5) == 'image') {
            return import.meta.env.VITE_BACKEND_URL + url;
        }
        return url;
    }
    const submit = (evt) => {
        evt.preventDefault();
        let validForm = true;
        formElements.map((element) => {
            if (element.required && !element.value) {
                validForm = false;
            }
        });
        if (validForm) {
            setRequestForm({ ...response.view.form, elements: formElements });
        }
    }
    const { width, height } = useViewportSize();
    const mobileFix = height < 900 ? '112px ' : '80px';
    const scrollHeight = layout[1] == 12 ?
        'calc((100vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px) - ' + mobileFix + ')/2)' :
        'calc(100vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px) - 48px)';
    const scrollWidth = layout[1] == 12 ?
        'calc(100vw - 48px)' :
        'calc((100vw * ' + (layout[1] / 12) + ') - 96px )';
    useEffect(() => {
        if (!response.view.form.elements) {
            return;
        }
        const element = response.view.form.elements.find((element) => {
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
            const id = response.view.name + ':' + element.key;
            setInputFocused(id);
        }
    }, [response.view]);
    return (
        <Paper
            shadow='md'
            radius='md'
            flex={1}
            className='noprint'
        >
            <ScrollArea.Autosize
                mx='auto'
                pt='xl'
                pr='xs'
                pb='xl'
                pl='xl'
                mah={scrollHeight}
            >
                {response.error ? <Text c={'salmon'}>{response.error}</Text> : ''}
                <Text id='message'>{response.view.message}</Text>
                <form onSubmit={submit}>
                    {formElements.map((element, i) => {
                        let key = response.view.name + ':' + element.key;
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
                                    autoFocus={(key == inputFocused) ? true : false}
                                    className={key == inputFocused ? 'focused' : ''}
                                    disabled={element.disabled}
                                    display={element.hidden ? 'none' : 'block'}
                                    id={key}
                                    key={key}
                                    label={element.label}
                                    mt='md'
                                    name={key}
                                    onChange={(evt) => { valueChange(i, evt.currentTarget.value) }}
                                    onFocus={(evt) => { focusChange(i, evt.target.id) }}
                                    readOnly={showKeyboard}
                                    required={element.required}
                                    type='text'
                                    value={element.value ?? ''}
                                    w={'95%'}
                                />
                            case 'NUMBER':
                                return <NumberInput
                                    autoComplete='off'
                                    autoFocus={(key == inputFocused) ? true : false}
                                    className={key == inputFocused ? 'focused' : ''}
                                    disabled={element.disabled}
                                    display={element.hidden ? 'none' : 'block'}
                                    id={key}
                                    key={key}
                                    label={element.label}
                                    mt='md'
                                    name={key}
                                    onChange={(value) => { valueChange(i, value) }}
                                    onFocus={(evt) => { focusChange(i, evt.target.id) }}
                                    readOnly={showKeyboard}
                                    required={element.required}
                                    type='text'
                                    value={element.value ?? ''}
                                    w={'95%'}
                                />
                            case 'DECIMAL':
                                return <NumberInput
                                    autoComplete='off'
                                    autoFocus={(key == inputFocused) ? true : false}
                                    className={key == inputFocused ? 'focused' : ''}
                                    disabled={element.disabled}
                                    display={element.hidden ? 'none' : 'block'}
                                    id={key}
                                    key={key}
                                    label={element.label}
                                    mt='md'
                                    name={key}
                                    onChange={(value) => { valueChange(i, value) }}
                                    onFocus={(evt) => { focusChange(i, evt.target.id) }}
                                    readOnly={showKeyboard}
                                    required={element.required}
                                    type='text'
                                    value={element.value ?? ''}
                                    w={'95%'}
                                />
                            case 'DATE':
                                return <DatePickerInput
                                    autoComplete='off'
                                    className={key == inputFocused ? 'focused' : ''}
                                    disabled={element.disabled}
                                    display={element.hidden ? 'none' : 'block'}
                                    id={key}
                                    key={key}
                                    label={element.label}
                                    mt='md'
                                    name={key}
                                    required={element.required}
                                    valueFormat={response.uiTranslations.dateFormat.toUpperCase()}
                                    onChange={(value) => { valueChange(i, value.toISOString().slice(0, 10)) }}
                                    value={element.value ? new Date(element.value) : null}
                                    w={'95%'}
                                />
                            case 'PASSWORD':
                                return <TextInput
                                    autoComplete='off'
                                    autoFocus={(key == inputFocused) ? true : false}
                                    className={key == inputFocused ? 'focused' : ''}
                                    disabled={element.disabled}
                                    display={element.hidden ? 'none' : 'block'}
                                    id={key}
                                    key={key}
                                    label={element.label}
                                    mt='md'
                                    name={key}
                                    onChange={(evt) => { valueChange(i, evt.currentTarget.value) }}
                                    onFocus={(evt) => { focusChange(i, evt.target.id) }}
                                    readOnly={showKeyboard}
                                    required={element.required}
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
                                const elementLabel = response.uiTranslations[element.label.toLowerCase()] ?? element.label;
                                return <Group
                                    mt='sm'
                                    w={'95%'}
                                    key={key}
                                >
                                    <Button
                                        disabled={element.disabled}
                                        display={element.hidden ? 'none' : 'block'}
                                        onClick={() => { formButtonClick(i) }}
                                        key={key}
                                    >{element.button.label}</Button>
                                    <Text>{
                                        element.key + ' - ' + 
                                        elementLabel + ' - ' + 
                                        element.value
                                    }</Text>
                                </Group>
                            case 'IMAGE':
                                return <Box
                                    display={element.hidden ? 'none' : 'block'}
                                    key={key}
                                    w={'95%'}
                                >
                                    <img src={getImageUrl(element.image)} />
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
                                            src={getImageUrl(element.image)}
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
                                            response.store.countryCode,
                                            response.store.currencyCode,
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
                                            response.store.countryCode,
                                            response.store.currencyCode,
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
                                    required={element.required}
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
