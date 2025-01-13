import { createContext } from 'react';

export const SchemeContext = createContext(null);

export const SchemeProvider = ({ children, colorScheme, setColorScheme }) => {
    return (
        <SchemeContext.Provider
            value={{
                colorScheme, setColorScheme,
            }}
        >
            {children}
        </SchemeContext.Provider>
    );
};
