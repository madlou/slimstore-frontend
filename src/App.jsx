import '@mantine/core/styles.css';

import { useState } from 'react'
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import ColorSchemeContext from './ColorSchemeContext';
import Main from './components/Main'

function App() {
    const [colorScheme, setColorScheme] = useState('dark');
    return (
        <ColorSchemeContext.Provider value={{ colorScheme, onChange: setColorScheme }}>
            <ColorSchemeScript forceColorScheme={colorScheme} />
            <MantineProvider forceColorScheme={colorScheme} withGlobalStyles withNormalizeCSS >
                <Main />
            </MantineProvider>
        </ColorSchemeContext.Provider>
    )
}

export default App;
