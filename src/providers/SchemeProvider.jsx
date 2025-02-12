import { createContext } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const SchemeContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const SchemeProvider = ({ children, colorScheme, setColorScheme }) => {
    return (
        <SchemeContext.Provider
            value={{
                colorScheme, setColorScheme,
            }}
        >
            { children }
        </SchemeContext.Provider>
    );
};
