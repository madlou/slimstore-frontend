import { useRef, useEffect } from 'react'
import { Text, Box, Group, Divider } from '@mantine/core';
import PrintHeader from './PrintHeader.jsx'
import PrintFooter from './PrintFooter.jsx'
import DemoInstructions from './DemoInstructions.jsx';
import moneyConverter from '../util/moneyConverter.js';

function Basket({ basket, response, tender, uiTranslations }) {
    let total = 0;
    let lines = 0;
    let items = 0;
    let tenders = 0;
    let difference = null;
    basket.map((line, i) => {
        total += line.quantity * line.unitValue * (line.type == 'RETURN' ? -1 : 1);
        items += line.quantity;
        lines++;
    })
    tender.map((line, i) => {
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
    }, [basket, tender]);
    return (
        <Box
            w={'95%'}
        >
            <PrintHeader
                response={response}
            />
            <DemoInstructions
                name={response.view.name}
                uiTranslations={uiTranslations}
            />
            {basket.map((line, i) => {
                return (
                    <Box mb={8} key={i}>
                        <Text>{line.code} {line.name}</Text>
                        <Group
                            justify='space-between'
                        >
                            <Text>
                                {line.quantity * (line.type == 'RETURN' ? -1 : 1)}
                                &nbsp;@&nbsp;
                                {moneyConverter(
                                    response.store.countryCode,
                                    response.store.currencyCode,
                                    line.unitValue,
                                )}
                            </Text>
                            <Text>
                                {moneyConverter(
                                    response.store.countryCode,
                                    response.store.currencyCode,
                                    (line.quantity * (line.type == 'RETURN' ? -1 : 1) * line.unitValue),
                                )}
                            </Text>
                        </Group>
                    </Box>
                );
            })}
            {basket.length < 1 ? '' : (
                <Box mb={8}>
                    <Divider mb={8} size='md' variant='dotted' />
                    <Text>
                        {uiTranslations.subtotal}
                        :&nbsp;
                        {moneyConverter(
                            response.store.countryCode,
                            response.store.currencyCode,
                            total,
                        )}
                    </Text>
                    <Text>
                        {uiTranslations.transactionLines}
                        :&nbsp;
                        {lines}
                    </Text>
                    <Text>
                        {uiTranslations.items}
                        :&nbsp;
                        {items}
                    </Text>
                </Box>
            )}
            {tender && tender.length > 0 ? (
                <Box mb={8}>
                    <Divider mb={8} size='md' variant='dotted' />
                    {tender.map((line, i) => {
                        return <Text key={i}>
                            {line.label}
                            &nbsp;
                            {moneyConverter(
                                response.store.countryCode,
                                response.store.currencyCode,
                                line.value,
                            )}
                        </Text>

                    })}
                </Box>
            ) : ''}
            {tenders == 0 ? '' : (
                <Box mb={8}>
                    <Divider mb={8} size='md' variant='dotted' />
                    <Text>
                        {uiTranslations.tenderTotal}
                        :&nbsp;
                        {moneyConverter(
                            response.store.countryCode,
                            response.store.currencyCode,
                            tenders,
                        )}
                    </Text>
                </Box>
            )}
            {tenders == 0 || difference == 0 ? '' : (
                <Box mb={8}>
                    <Text>
                        {uiTranslations.difference}
                        :&nbsp;
                        {moneyConverter(
                            response.store.countryCode,
                            response.store.currencyCode,
                            difference,
                        )}
                    </Text>
                </Box>
            )}
            <PrintFooter
                response={response}
            />
            <div ref={basketBottomRef} id='bottomReference'></div>
        </Box>
    )
}

export default Basket
