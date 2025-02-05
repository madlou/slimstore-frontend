import { useContext } from 'react'
import { Box, Burger, Drawer, Group, Title } from '@mantine/core';
import MenuButtons from './MenuButtons.jsx';
import { LayoutContext } from '../providers/LayoutProvider.jsx';
import { FormContext } from '../providers/FormProvider.jsx';

function Header() {
    const { menuOpened, setMenuOpened } = useContext(LayoutContext);
    const { response } = useContext(FormContext);
    return (
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
    )
}

export default Header;
