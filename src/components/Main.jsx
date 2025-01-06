import { useState, useEffect, useRef } from 'react'
import { AppShell, Group, Box, Title, Grid, Stack, Burger, Drawer } from '@mantine/core';
import { useImmer } from 'use-immer';
import postApi from '../util/postApi.js'
import dataSpec from '../util/dataSpec.js'
import Keyboard from './Keyboard.jsx'
import Form from './Form.jsx'
import FunctionButtons from './FunctionButtons.jsx'
import Display from './Display.jsx'
import StatusBar from './StatusBar.jsx'
import MenuButtons from './MenuButtons.jsx';

function Main() {
    const [menuOpened, setMenuOpened] = useState(false);
    const [inputFocused, setInputFocused] = useState(null)
    const [showKeyboard, setShowKeyboard] = useState(false)
    const [viewName, setViewName] = useState('')
    const [response, setResponse] = useState(dataSpec)
    const [requestForm, setRequestForm] = useState(dataSpec.view.form);
    const [formElements, updateFormElements] = useImmer([])
    const [lang, setLang] = useState('EN');
    const [footerHeight, setFooterHeight] = useState(96);
    const [layout, setLayout] = useState([6, 6]);
    const logoutTimer = useRef(null);
    const autoLogoutMinutes = 10;
    const request = async (retryCounter = 0) => {
        if (requestForm.targetView != null) {
            const response = await postApi(requestForm, lang);
            if (response) {
                setResponse(response);
                clearTimeout(logoutTimer.current);
                logoutTimer.current = setTimeout(() => {
                    setRequestForm({
                        ...response.view.form,
                        targetView: 'LOGIN',
                        serverProcess: 'LOGOUT'
                    })
                }, autoLogoutMinutes * 60 * 1000)
            } else {
                if (retryCounter > 5) {
                    window.location.reload();
                    return;
                }
                setResponse(dataSpec);
                setTimeout(() => {
                    request(retryCounter + 1);
                }, 1000)
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
                                visibleFrom='lg'
                            >{response.uiTranslations.header} - </Title>
                            <Title
                                order={2}
                                pt={10}
                                fz={22}
                                textWrap='nowrap'
                            >{response.view.title}</Title>
                        </Group>
                        <Box visibleFrom='sm'>
                            <MenuButtons
                                footerHeight={footerHeight}
                                setFooterHeight={setFooterHeight}
                                menuOpened={menuOpened}
                                layout={layout}
                                setLayout={setLayout}
                                lang={lang}
                                setLang={setLang}
                                response={response}
                                requestForm={requestForm}
                                setRequestForm={setRequestForm}
                                showKeyboard={showKeyboard}
                                setShowKeyboard={setShowKeyboard}
                            />
                        </Box>
                        <Drawer
                            opened={menuOpened}
                            onClose={() => { setMenuOpened(false) }}
                            size='40%'
                            padding='md'
                            position='right'
                            title={response.uiTranslations.header}
                            hiddenFrom='sm'
                            zIndex={100}
                        >
                            <MenuButtons
                                footerHeight={footerHeight}
                                setFooterHeight={setFooterHeight}
                                menuOpened={menuOpened}
                                layout={layout}
                                setLayout={setLayout}
                                lang={lang}
                                setLang={setLang}
                                response={response}
                                requestForm={requestForm}
                                setRequestForm={setRequestForm}
                                showKeyboard={showKeyboard}
                                setShowKeyboard={setShowKeyboard}
                            />
                        </Drawer>
                        <Burger
                            opened={menuOpened}
                            onClick={() => { setMenuOpened(!menuOpened) }}
                            hiddenFrom='sm'
                            size='md'
                        />
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
                            <Grid.Col
                                span={layout[0]}
                                display={layout[0] == 12 ? 'block' : 'flex'}
                                flex={layout[0] == 12 ? 'unset' : 1}
                            >
                                <Display
                                    layout={layout}
                                    response={response}
                                />
                            </Grid.Col>
                            <Grid.Col
                                span={layout[1]}
                                display={layout[1] == 12 ? 'block' : 'flex'}
                                flex={layout[0] == 12 ? 'unset' : 1}
                            >
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
