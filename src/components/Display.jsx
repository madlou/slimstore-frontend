import { Paper, ScrollArea } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import Basket from './Basket.jsx'
import Report from './Report.jsx'
import { LayoutContext } from '../providers/LayoutProvider.jsx';
import { FormContext } from '../providers/FormProvider.jsx';
import { useContext } from 'react';

function Display() {
    const { layout, portrait } = useContext(LayoutContext);
    const { response } = useContext(FormContext);
    const { height } = useViewportSize();
    const mobileFix = height < 900 ? '112px ' : '80px';
    const scrollHeight = portrait == true ?
        'calc((100vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px) - ' + mobileFix + ')/2)' :
        'calc(100vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px) - 48px)';
    const scrollWidth = portrait == true ?
        'calc(100vw - 48px)' :
        'calc((100vw * ' + (layout[0] / 12) + ') - 96px )';
    return (
        <Paper
            shadow='md'
            radius='md'
            flex={1}
        >
            <ScrollArea.Autosize
                mah={scrollHeight}
                maw={scrollWidth}
                mx='auto'
                pt='xl'
                pr='xs'
                pb='xl'
                pl='xl'
            >
                {response.report && response.report.length > 0 ?
                    <Report />
                    :
                    <Basket />
                }
            </ScrollArea.Autosize>
        </Paper >
    )
}

export default Display;
