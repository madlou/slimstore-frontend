import { useState, useEffect, useContext } from 'react'
import { Button, Flex } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { SchemeContext } from '../context/SchemeContext.jsx';
import LanguageDropdown from './LanguageDropdown.jsx'
import LayoutDropdown from './LayoutDropdown.jsx';
import { RxSun, RxMoon, RxZoomIn, RxZoomOut } from 'react-icons/rx';
import { TbKeyboard } from 'react-icons/tb';
import { LayoutContext } from '../context/LayoutProvider.jsx';
import { FormContext } from '../context/FormProvider.jsx';

const MenuButtons = () => {
    const { layout, setLayout, menuOpened, showKeyboard, setShowKeyboard, footerHeight, setFooterHeight } = useContext(LayoutContext);
    const { lang, setLang, requestForm, setRequestForm, response } = useContext(FormContext);
    const [fontSize, setFontSize] = useState(24);
    const { width, height } = useViewportSize();
    const schemeContext = useContext(SchemeContext);
    const dark = schemeContext.colorScheme === 'dark';
    const kbHeight = 184;
    const toggleKeyboard = () => {
        const toggle = !showKeyboard
        setFooterHeight(toggle ? footerHeight + kbHeight : footerHeight - kbHeight);
        setShowKeyboard(toggle);
    }
    const breakpoint = {
        xs: 576,
        sm: 768,
        md: 992,
        lg: 1200,
        xl: 1408,
    }
    useEffect(() => {
        // setShowKeyboard(false)
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
        <Flex
            wrap='nowrap'
            gap='md'
            justify='flex-start'
            align='flex-start'
            direction={menuOpened ? 'column-reverse' : 'row'}
        >
            <LayoutDropdown
                layout={layout}
                setLayout={setLayout}
                menuOpened={menuOpened}
            />
            <LanguageDropdown
                lang={lang}
                languages={response.languages}
                menuOpened={menuOpened}
                requestForm={requestForm}
                setLang={setLang}
                setRequestForm={setRequestForm}
            />
            <Button
                onClick={toggleKeyboard}
                title='Toggle keyboard'
                w={menuOpened ? '100%' : 'auto'}
            >
                <TbKeyboard style={{ width: '1.6rem', height: '1.6rem' }} />
            </Button>
            <Button
                onClick={() => { schemeContext.onChange(dark ? 'light' : 'dark') }}
                title='Toggle color scheme'
                w={menuOpened ? '100%' : 'auto'}
            >
                {dark ? (
                    <RxSun style={{ width: '1.4rem', height: '1.4rem' }} />
                ) : (
                    <RxMoon style={{ width: '1.4rem', height: '1.4rem' }} />
                )}
            </Button>
            <Button
                onClick={() => { setFontSize(Math.floor(fontSize * 0.95)) }}
                title='Zoom Out'
                w={menuOpened ? '100%' : 'auto'}
            >
                <RxZoomOut style={{ width: '1.6rem', height: '1.6rem' }} />
            </Button>
            <Button
                onClick={() => { setFontSize(Math.ceil(fontSize * 1.05)) }}
                title='Zoom In'
                w={menuOpened ? '100%' : 'auto'}
            >
                <RxZoomIn style={{ width: '1.6rem', height: '1.6rem' }} />
            </Button>
        </Flex>
    )
}

export default MenuButtons