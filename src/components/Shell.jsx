import { useContext } from 'react'
import { AppShell } from '@mantine/core';
import { LayoutContext } from '../context/LayoutProvider.jsx';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';

function Shell() {
    const { footerHeight } = useContext(LayoutContext);
    return (
        <AppShell
            header={{ height: 16 * 3 }}
            footer={{ height: footerHeight }}
            padding='md'
        >
            <AppShell.Header
                bg='rgba(0, 0, 0, .04)'
            >
                <Header />
            </AppShell.Header>
            <AppShell.Main
                bg='rgba(150, 150, 150, .2)'
                display='flex'
            >
                <Main />
            </AppShell.Main>
            <AppShell.Footer
                bg='rgba(0, 0, 0, .05)'
            >
                <Footer />
            </AppShell.Footer>
        </AppShell >
    )
}

export default Shell;
