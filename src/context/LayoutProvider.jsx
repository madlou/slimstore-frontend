import { createContext, useState, useEffect, useRef } from "react";

export const LayoutContext = createContext();

export const LayoutProvider = props => {
    const [inputFocused, setInputFocused] = useState(null);
    const [layout, setLayout] = useState([6, 6]);
    const [menuOpened, setMenuOpened] = useState(false);
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [footerHeight, setFooterHeight] = useState(96);
    return (
        <LayoutContext.Provider
            value={{
                inputFocused, setInputFocused,
                layout, setLayout,
                menuOpened, setMenuOpened,
                showKeyboard, setShowKeyboard,
                footerHeight, setFooterHeight,
            }}
        >
            {props.children}
        </LayoutContext.Provider>
    );
};
