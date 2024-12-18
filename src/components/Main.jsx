import { useState, useEffect, useContext } from 'react'
import { AppShell, SimpleGrid, Group, Button, ActionIcon, Container, Box, Slider, Title, Grid, Select, Stack } from '@mantine/core';
import ColorSchemeContext from '../ColorSchemeContext.jsx';
import { RxSun, RxMoon, RxZoomIn, RxZoomOut } from 'react-icons/rx';
import { TbKeyboard } from "react-icons/tb";
import { useImmer } from 'use-immer';
import postApi from '../util/postApi.js'
import dataSpec from '../util/dataSpec.js'
import Keyboard from './Keyboard.jsx'
import LanguageDropdown from './LanguageDropdown.jsx'
import Form from './Form.jsx'
import FunctionButtons from './FunctionButtons.jsx'
import Display from './Display.jsx'
import StatusBar from './StatusBar.jsx'
import LayoutDropdown from './LayoutDropdown.jsx';

function Main() {
    const [inputFocused, setInputFocused] = useState(null)
    const [showKeyboard, setShowKeyboard] = useState(false)
    const [viewName, setViewName] = useState('')
    const [response, setResponse] = useState(dataSpec)
    const [requestForm, setRequestForm] = useState(dataSpec.view.form);
    const [formElements, updateFormElements] = useImmer([])
    const [lang, setLang] = useState('EN');
    const colorSchemeContext = useContext(ColorSchemeContext);
    const dark = colorSchemeContext.colorScheme === 'dark';
    const [footerHeight, setFooterHeight] = useState(96);
    const [fontSize, setFontSize] = useState(26);
    const [layout, setLayout] = useState([6, 6]);
    const toggleKeyboard = () => {
        const kbHeight = 184;
        const toggle = !showKeyboard
        setFooterHeight(toggle ? footerHeight + kbHeight : footerHeight - kbHeight);
        setShowKeyboard(toggle);
    }
    const request = async (retryCounter = 0) => {
        if (requestForm.targetView != null) {
            const response = await postApi(requestForm, lang);
            if (response) {
                setResponse(response);
            } else {
                if (retryCounter > 5) {
                    window.location.reload();
                    return;
                }
                setResponse(dataSpec);
                // setTimeout(() => {
                //     request(retryCounter + 1);
                // }, 1000)
            }
        }
    }
    useEffect(() => {
        updateFormElements(response.view.form.elements ?? []);
        setViewName(response.view.name)
    }, [response]);
    useEffect(() => {
        request();
    }, [requestForm]);
    useEffect(() => {
        document.documentElement.style.fontSize = fontSize + 'px';
    }, [fontSize]);
    console.log(layout)
    return (
        <>
            <AppShell
                header={{ height: 16 * 3 }}
                footer={{ height: footerHeight }}
                padding='md'
            >
                <AppShell.Header
                    bg='rgba(0, 0, 0, .04)'
                >
                    <Group
                        pl='md'
                        pr='md'
                        justify='space-between'
                        style={{ flexWrap: 'nowrap' }}
                    >
                        <Group
                            style={{ flexWrap: 'nowrap' }}
                        >
                            <Title
                                order={1}
                                pt={5}
                                textWrap='nowrap'
                            >{response.uiTranslations.logo}</Title>
                            <Title
                                order={2}
                                pt={10}
                                fz={22}
                                textWrap='nowrap'
                            >{response.uiTranslations.header} - {response.view.title}</Title>
                        </Group>
                        <Group
                            style={{ flexWrap: 'nowrap' }}
                        >
                            <LayoutDropdown
                                layout={layout}
                                setLayout={setLayout}
                            />
                            <LanguageDropdown
                                setRequestForm={setRequestForm}
                                lang={lang}
                                setLang={setLang}
                                languages={response.languages}
                                viewName={viewName}
                            />
                            <Button
                                onClick={toggleKeyboard}
                                title='Toggle keyboard'
                            >
                                <TbKeyboard style={{ width: '1.6rem', height: '1.6rem' }} />
                            </Button>
                            <Button
                                onClick={() => { colorSchemeContext.onChange(dark ? 'light' : 'dark') }}
                                title='Toggle color scheme'
                            >
                                {dark ? (
                                    <RxSun style={{ width: '1.4rem', height: '1.4rem' }} />
                                ) : (
                                    <RxMoon style={{ width: '1.4rem', height: '1.4rem' }} />
                                )}
                            </Button>
                            <Button
                                onClick={() => { setFontSize(fontSize - 4) }}
                                title='Zoom Out'
                                disabled={fontSize < 20}
                            >
                                <RxZoomOut style={{ width: '1.6rem', height: '1.6rem' }} />
                            </Button>
                            <Button
                                onClick={() => { setFontSize(fontSize + 4) }}
                                title='Zoom In'
                                disabled={fontSize > 30}
                            >
                                <RxZoomIn style={{ width: '1.6rem', height: '1.6rem' }} />
                            </Button>
                        </Group>
                    </Group>
                </AppShell.Header>
                <AppShell.Main
                    bg='rgba(150, 150, 150, .2)'
                    display='flex'
                >
                    {layout[0] == 12 ? (
                        <Stack
                            w={'100%'}
                        >
                            <Display
                                layout={layout}
                                response={response}
                            />
                            <Form
                                response={response}
                                formElements={formElements}
                                inputFocused={inputFocused}
                                layout={layout}
                                setInputFocused={setInputFocused}
                                setRequestForm={setRequestForm}
                                showKeyboard={showKeyboard}
                                updateFormElements={updateFormElements}
                            />
                        </Stack>
                    ) : (
                        <Grid
                            flex={1}
                            display={layout[0] == 12 ? 'flex' : 'flex'}
                        >
                            <Grid.Col span={layout[0]} display={layout[0] == 12 ? 'block' : 'flex'} flex={layout[0] == 12 ? "unset" : 1}>
                                <Display
                                    layout={layout}
                                    response={response}
                                />
                            </Grid.Col>
                            <Grid.Col span={layout[1]} display={layout[1] == 12 ? 'block' : 'flex'} flex={layout[0] == 12 ? "unset" : 1}>
                                <Form
                                    response={response}
                                    formElements={formElements}
                                    inputFocused={inputFocused}
                                    layout={layout}
                                    setInputFocused={setInputFocused}
                                    setRequestForm={setRequestForm}
                                    showKeyboard={showKeyboard}
                                    updateFormElements={updateFormElements}
                                />
                            </Grid.Col>
                        </Grid>
                    )}
                </AppShell.Main>
                <AppShell.Footer
                    bg='rgba(0, 0, 0, .05)'
                >
                    <Keyboard
                        inputFocused={inputFocused}
                        setInputFocused={setInputFocused}
                        updateFormElements={updateFormElements}
                        viewName={viewName}
                        showKeyboard={showKeyboard}
                    />
                    <FunctionButtons
                        formElements={formElements}
                        response={response}
                        setRequestForm={setRequestForm}
                    />
                    <StatusBar
                        store={response.store}
                        register={response.register}
                        uiTranslations={response.uiTranslations}
                        user={response.user}
                    />
                </AppShell.Footer>
            </AppShell >
        </>
    )
}

export default Main;
