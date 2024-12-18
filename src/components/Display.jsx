import { Paper, ScrollArea } from '@mantine/core';

import Basket from './Basket.jsx'
import Report from './Report.jsx'

function Display(props) {
    const scrollHeight = props.layout[0] == 12 ?
        'calc((100vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px) - 80px)/2)' :
        'calc(100vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px) - 48px)';
    const scrollWidth = props.layout[0] == 12 ?
        'calc(100vw - 48px)' :
        'calc((100vw * ' + (props.layout[0] / 12) + ') - 96px )';
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
                {props.response.report && props.response.report.length > 0 ?
                    <Report
                        report={props.response.report}
                        uiTranslations={props.response.uiTranslations}
                    />
                    :
                    <Basket
                        response={props.response}
                        basket={props.response.basket}
                        name={props.response.view.name}
                        tender={props.response.tender}
                        uiTranslations={props.response.uiTranslations}
                    />
                }
            </ScrollArea.Autosize>
        </Paper >
    )
}

export default Display;
