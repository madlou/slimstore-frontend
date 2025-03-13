import { useRef, useEffect, useContext } from 'react'
import { Text, Box, Group, Divider } from '@mantine/core';
import PrintHeader from './PrintHeader.jsx'
import PrintFooter from './PrintFooter.jsx'
import DemoInstructions from './DemoInstructions.jsx';
import { FormContext } from '../providers/FormProvider.jsx';
import { DisplayContext } from '../providers/DisplayProvider.jsx';
import { LocationContext } from '../providers/LocationProvider.jsx';
import { TranslationContext } from '../providers/TranslationProvider.jsx';

function Basket() {
    const { response } = useContext(FormContext);
    const { basket, tender } = useContext(DisplayContext);
    const { formatMoney } = useContext(LocationContext);
    const { translations } = useContext(TranslationContext);
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
    basket.map((line) => {
        total += line.quantity * line.unitValue * (isReturn(line) ? -1 : 1);
        items += line.quantity;
        lines++;
    })
    tender.map((line) => {
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
    }, [basket, tender]);
    return (
        <Box
            w={'95%'}
        >
            <PrintHeader />
            <DemoInstructions />
            {basket.map((line, i) => {
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
            {basket.length < 1 ? '' : (
                <Box mb={8}>
                    <Divider mb={8} size='md' variant='dotted' />
                    <Text>
                        {translations.subtotal}
                        :&nbsp;
                        {formatMoney(total)}
                    </Text>
                    <Text>
                        {translations.transactionLines}
                        :&nbsp;
                        { lines }
                    </Text>
                    <Text>
                        {translations.items}
                        :&nbsp;
                        { items }
                    </Text>
                </Box>
            )}
            {tender && tender.length > 0 ? (
                <Box mb={8}>
                    <Divider mb={8} size='md' variant='dotted' />
                    {tender.map((line, i) => {
                        return <Text key={i}>
                            {translations[line.type.toLowerCase().toCamelCase()]}
                            {line.reference ? ' (' + line.reference + ')' : ''}:
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
                        {translations.tenderTotal}
                        :&nbsp;
                        {formatMoney(tenders)}
                    </Text>
                </Box>
            )}
            {tenders == 0 || difference == 0 ? '' : (
                <Box mb={8}>
                    <Text>
                        {translations.difference}
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
