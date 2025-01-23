import { createContext, useState, useEffect, useRef } from "react";
import { useViewportSize } from '@mantine/hooks';

export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    const { width, height } = useViewportSize();
    const [inputFocused, setInputFocused] = useState(null);
    const [layout, setLayout] = useState([6, 6]);
    const [menuOpened, setMenuOpened] = useState(false);
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [footerHeight, setFooterHeight] = useState(96);
    const [fullscreen, setFullscreen] = useState(false);
    const [fontSize, setFontSize] = useState(24);
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
        } else if (width < breakpoint.sm) {
            setFontSize(14)
            setFooterHeight(160 + (showKeyboard ? kbHeight : 0))
        } else if (width < breakpoint.md) {
            setFontSize(16)
            setFooterHeight(96 + (showKeyboard ? kbHeight : 0))
        } else if (width < breakpoint.lg) {
            setFontSize(18)
            setFooterHeight(96 + (showKeyboard ? kbHeight : 0))
        } else if (width < breakpoint.xl) {
            setFontSize(20)
            setFooterHeight(96 + (showKeyboard ? kbHeight : 0))
        } else {
            setFontSize(22)
            setFooterHeight(96 + (showKeyboard ? kbHeight : 0))
        }
        if (width < height) {
            setLayout([12, 12])
        } else {
            setLayout([6, 6])
        }
    }, [width]);
    useEffect(() => {
        document.documentElement.style.fontSize = fontSize + 'px';
    }, [fontSize]);
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
            }}
        >
            {children}
        </LayoutContext.Provider>
    );
};
