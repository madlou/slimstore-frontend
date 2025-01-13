import '@mantine/core/styles.css';

import { useState } from 'react'
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { FormProvider } from './context/FormProvider';
import { LayoutProvider } from './context/LayoutProvider';
import Shell from './components/Shell'
import { SchemeProvider } from './context/SchemeProvider';

function App() {
    const [colorScheme, setColorScheme] = useState('dark');
    return (
        <SchemeProvider colorScheme={colorScheme} setColorScheme={setColorScheme}>
            <ColorSchemeScript forceColorScheme={colorScheme} />
            <MantineProvider forceColorScheme={colorScheme} withGlobalStyles withNormalizeCSS >
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
