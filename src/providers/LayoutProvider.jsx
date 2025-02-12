import { createContext, useState, useEffect } from "react";
import { useViewportSize } from '@mantine/hooks';

// eslint-disable-next-line react-refresh/only-export-components
export const LayoutContext = createContext();

// eslint-disable-next-line react/prop-types
export const LayoutProvider = ({ children }) => {
    const { width, height } = useViewportSize();
    const [ inputFocused, setInputFocused ] = useState(null);
    const [ layout, setLayout] = useState([6, 6 ]);
    const [ portrait, setPortrait ] = useState(false);
    const [ menuOpened, setMenuOpened ] = useState(false);
    const [ showKeyboard, setShowKeyboard ] = useState(false);
    const [ footerHeight, setFooterHeight ] = useState(96);
    const [ fullscreen, setFullscreen ] = useState(false);
    const [ fontSize, setFontSize ] = useState(24);
    const [ showFunctionNumbers, setShowFunctionNumbers ] = useState(true);
    const kbHeight = 184;
    const toggleKeyboard = () => {
        const toggle = !showKeyboard
        setFooterHeight(toggle ? footerHeight + kbHeight : footerHeight - kbHeight);
        setShowKeyboard(toggle);
    }
    const toggleFullscreen = () => {
        if (fullscreen == false) {
            document.body.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        setFullscreen(!fullscreen);
    }
    const breakpoint = {
        xs: 576,
        sm: 768,
        md: 992,
        lg: 1200,
        xl: 1408,
    }
    useEffect(() => {
        if (width < breakpoint.xs) {
            setFontSize(12);
            setFooterHeight(160 + (showKeyboard ? kbHeight : 0))
            setShowFunctionNumbers(false);
        } else if (width < breakpoint.sm) {
            setFontSize(14)
            setFooterHeight(160 + (showKeyboard ? kbHeight : 0))
            setShowFunctionNumbers(false);
        } else if (width < breakpoint.md) {
            setFontSize(16)
            setFooterHeight(96 + (showKeyboard ? kbHeight : 0))
            setShowFunctionNumbers(true);
        } else if (width < breakpoint.lg) {
            setFontSize(18)
            setFooterHeight(96 + (showKeyboard ? kbHeight : 0))
            setShowFunctionNumbers(true);
        } else if (width < breakpoint.xl) {
            setFontSize(20)
            setFooterHeight(96 + (showKeyboard ? kbHeight : 0))
            setShowFunctionNumbers(true);
        } else {
            setFontSize(22)
            setFooterHeight(96 + (showKeyboard ? kbHeight : 0))
            setShowFunctionNumbers(true);
        }
        if (width < height) {
            setPortrait(true);
            setShowFunctionNumbers(false);
        } else {
            setPortrait(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ width ]);
    useEffect(() => {
        document.documentElement.style.fontSize = fontSize + 'px';
    }, [ fontSize ]);
    return (
        <LayoutContext.Provider
            value={{
                fontSize, setFontSize,
                inputFocused, setInputFocused,
                layout, setLayout,
                menuOpened, setMenuOpened,
                showKeyboard, setShowKeyboard,
                footerHeight, setFooterHeight,
                toggleKeyboard,
                fullscreen, toggleFullscreen,
                showFunctionNumbers,
                portrait,
            }}
        >
            { children }
        </LayoutContext.Provider>
    );
};
