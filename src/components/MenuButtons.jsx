import { useContext, useState } from 'react'
import { Button, Flex } from '@mantine/core';
import { RxSun, RxMoon, RxZoomIn, RxZoomOut, RxKeyboard, RxEnterFullScreen, RxExitFullScreen } from 'react-icons/rx';
import { SchemeContext } from '../context/SchemeProvider.jsx';
import { LayoutContext } from '../context/LayoutProvider.jsx';
import LanguageDropdown from './LanguageDropdown.jsx'
import LayoutDropdown from './LayoutDropdown.jsx';

const MenuButtons = () => {
    const schemeContext = useContext(SchemeContext);
    const { menuOpened, toggleKeyboard, fontSize, setFontSize, fullscreen, toggleFullscreen } = useContext(LayoutContext);
    const dark = schemeContext.colorScheme === 'dark';
    return (
        <Flex
            wrap='nowrap'
            gap='md'
            justify='flex-start'
            align='flex-start'
            direction={menuOpened ? 'column-reverse' : 'row'}
        >
            <LayoutDropdown />
            <LanguageDropdown />
            <Button
                onClick={toggleFullscreen}
                title='Toggle Fullscreen'
                w={menuOpened ? '100%' : 'auto'}
            >
                {fullscreen ? (
                    <RxExitFullScreen style={{ width: '1.6rem', height: '1.6rem' }} />
                ) : (
                    <RxEnterFullScreen style={{ width: '1.6rem', height: '1.6rem' }} />
                )}
            </Button>
            <Button
                onClick={toggleKeyboard}
                title='Toggle keyboard'
                w={menuOpened ? '100%' : 'auto'}
            >
                <RxKeyboard style={{ width: '1.6rem', height: '1.6rem' }} />
            </Button>
            <Button
                onClick={() => { schemeContext.setColorScheme(dark ? 'light' : 'dark') }}
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