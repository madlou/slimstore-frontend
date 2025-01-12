import '@mantine/core/styles.css';

import { useState } from 'react'
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { SchemeContext } from './context/SchemeContext';
import { FormProvider } from './context/FormProvider';
import { LayoutProvider } from './context/LayoutProvider';
import Main from './components/Main'

function App() {
    const [colorScheme, setColorScheme] = useState('dark');
    return (
        <SchemeContext.Provider value={{ colorScheme, onChange: setColorScheme }}>
            <ColorSchemeScript forceColorScheme={colorScheme} />
            <MantineProvider forceColorScheme={colorScheme} withGlobalStyles withNormalizeCSS >
                <FormProvider>
                    <LayoutProvider>
                        <Main />
                    </LayoutProvider>
                </FormProvider>
            </MantineProvider>
        </SchemeContext.Provider>
    )
}

export default App;
