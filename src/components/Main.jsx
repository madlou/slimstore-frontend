import { useContext } from 'react'
import { AppShell, Box, Burger, Drawer, Grid, Group, Stack, Title } from '@mantine/core';
import Display from './Display.jsx'
import Form from './Form.jsx'
import FunctionButtons from './FunctionButtons.jsx'
import Keyboard from './Keyboard.jsx'
import MenuButtons from './MenuButtons.jsx';
import StatusBar from './StatusBar.jsx'
import { LayoutContext } from '../context/LayoutProvider.jsx';
import { FormContext } from '../context/FormProvider.jsx';

function Main() {
    const { layout, menuOpened, setMenuOpened, footerHeight } = useContext(LayoutContext);
    const { response } = useContext(FormContext);
    return (
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
                        <MenuButtons />
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
                        <MenuButtons />
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
                        <Display />
                        <Form />
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
                            <Display />
                        </Grid.Col>
                        <Grid.Col
                            span={layout[1]}
                            display={layout[1] == 12 ? 'block' : 'flex'}
                            flex={layout[0] == 12 ? 'unset' : 1}
                        >
                            <Form />
                        </Grid.Col>
                    </Grid>
                )}
            </AppShell.Main>
            <AppShell.Footer
                bg='rgba(0, 0, 0, .05)'
            >
                <Keyboard />
                <FunctionButtons />
                <StatusBar />
            </AppShell.Footer>
        </AppShell >
    )
}

export default Main;
