import { useRef, useEffect, useContext } from 'react'
import { Text, Box, Group, Divider } from '@mantine/core';
import PrintHeader from './PrintHeader.jsx'
import PrintFooter from './PrintFooter.jsx'
import DemoInstructions from './DemoInstructions.jsx';
import { FormContext } from '../providers/FormProvider.jsx';

function Basket() {
    const { formatMoney, response } = useContext(FormContext);
    let total = 0;
    let lines = 0;
    let items = 0;
    let tenders = 0;
    let difference = null;
    const isReturn = (line) => {
        if (['RETURN', 'RETURN_MANUAL'].includes(line.type)) {
            return true;
        }
        return false;
    }
    response.basket.map((line) => {
        total += line.quantity * line.unitValue * (isReturn(line) ? -1 : 1);
        items += line.quantity;
        lines++;
    })
    response.tender.map((line) => {
        tenders += line.value;
    })
    if (tenders != 0) {
        difference = tenders - total;
    }
    const basketBottomRef = useRef(null);
    const scrollToBottom = () => {
        if (basketBottomRef.current) {
            basketBottomRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }
    useEffect(() => {
        if (['LOGIN', 'ABOUT'].includes(response.view.name)) {
            return;
        }
        setTimeout(() => {
            scrollToBottom()
        }, 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response.basket, response.tender]);
    return (
        <Box
            w={'95%'}
        >
            <PrintHeader />
            <DemoInstructions />
            {response.basket.map((line, i) => {
                return (
                    <Box mb={8} key={i}>
                        <Text>{line.code} {line.name}</Text>
                        <Group
                            justify='space-between'
                        >
                            <Text>
                                {line.quantity * (isReturn(line) ? -1 : 1)}
                                &nbsp;@&nbsp;
                                {formatMoney(line.unitValue)}
                            </Text>
                            <Text>
                                {formatMoney((line.quantity * (isReturn(line) ? -1 : 1) * line.unitValue))}
                            </Text>
                        </Group>
                    </Box>
                );
            })}
            {response.basket.length < 1 ? '' : (
                <Box mb={8}>
                    <Divider mb={8} size='md' variant='dotted' />
                    <Text>
                        {response.uiTranslations.subtotal}
                        :&nbsp;
                        {formatMoney(total)}
                    </Text>
                    <Text>
                        {response.uiTranslations.transactionLines}
                        :&nbsp;
                        { lines }
                    </Text>
                    <Text>
                        {response.uiTranslations.items}
                        :&nbsp;
                        { items }
                    </Text>
                </Box>
            )}
            {response.tender && response.tender.length > 0 ? (
                <Box mb={8}>
                    <Divider mb={8} size='md' variant='dotted' />
                    {response.tender.map((line, i) => {
                        return <Text key={i}>
                            {response.uiTranslations[line.type.toLowerCase().toCamelCase()]}
                            &nbsp;
                            {formatMoney(line.value)}
                        </Text>

                    })}
                </Box>
            ) : ''}
            {tenders == 0 ? '' : (
                <Box mb={8}>
                    <Divider mb={8} size='md' variant='dotted' />
                    <Text>
                        {response.uiTranslations.tenderTotal}
                        :&nbsp;
                        {formatMoney(tenders)}
                    </Text>
                </Box>
            )}
            {tenders == 0 || difference == 0 ? '' : (
                <Box mb={8}>
                    <Text>
                        {response.uiTranslations.difference}
                        :&nbsp;
                        {formatMoney(difference)}
                    </Text>
                </Box>
            )}
            <PrintFooter />
            <div ref={ basketBottomRef } id='bottomReference'></div>
        </Box>
    )
}

export default Basket
