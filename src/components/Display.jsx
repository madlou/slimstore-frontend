import { Paper, ScrollArea } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import Basket from './Basket.jsx'
import Report from './Report.jsx'

function Display({ layout, response }) {
    const { width, height } = useViewportSize();
    const mobileFix = height < 900 ? '112px ' : '80px';
    const scrollHeight = layout[0] == 12 ?
        'calc((100vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px) - ' + mobileFix + ')/2)' :
        'calc(100vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px) - 48px)';
    const scrollWidth = layout[0] == 12 ?
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
                    <Report
                        report={response.report}
                        uiTranslations={response.uiTranslations}
                    />
                    :
                    <Basket
                        response={response}
                        basket={response.basket}
                        tender={response.tender}
                        uiTranslations={response.uiTranslations}
                    />
                }
            </ScrollArea.Autosize>
        </Paper >
    )
}

export default Display;
