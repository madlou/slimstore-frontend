import '@mantine/core/styles.css';

import { useState } from 'react'
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { FormProvider } from './providers/FormProvider';
import { LayoutProvider } from './providers/LayoutProvider';
import Shell from './components/Shell'
import { SchemeProvider } from './providers/SchemeProvider';

function App() {
    const [ colorScheme, setColorScheme ] = useState('dark');
    return (
        <SchemeProvider colorScheme={ colorScheme } setColorScheme={ setColorScheme }>
            <ColorSchemeScript forceColorScheme={ colorScheme } />
            <MantineProvider forceColorScheme={ colorScheme } withGlobalStyles withNormalizeCSS >
                <FormProvider>
                    <LayoutProvider>
                        <Shell />
                    </LayoutProvider>
                </FormProvider>
            </MantineProvider>
        </SchemeProvider>
    )
}

export default App;
