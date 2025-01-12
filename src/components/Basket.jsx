import { useRef, useEffect, useContext } from 'react'
import { Text, Box, Group, Divider } from '@mantine/core';
import PrintHeader from './PrintHeader.jsx'
import PrintFooter from './PrintFooter.jsx'
import DemoInstructions from './DemoInstructions.jsx';
import moneyConverter from '../util/moneyConverter.js';
import { FormContext } from '../context/FormProvider.jsx';

function Basket() {
    const { response } = useContext(FormContext);
    let total = 0;
    let lines = 0;
    let items = 0;
    let tenders = 0;
    let difference = null;
    response.basket.map((line, i) => {
        total += line.quantity * line.unitValue * (line.type == 'RETURN' ? -1 : 1);
        items += line.quantity;
        lines++;
    })
    response.tender.map((line, i) => {
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
            {response.basket.length < 1 ? '' : (
                <Box mb={8}>
                    <Divider mb={8} size='md' variant='dotted' />
                    <Text>
                        {response.uiTranslations.subtotal}
                        :&nbsp;
                        {moneyConverter(
                            response.store.countryCode,
                            response.store.currencyCode,
                            total,
                        )}
                    </Text>
                    <Text>
                        {response.uiTranslations.transactionLines}
                        :&nbsp;
                        {lines}
                    </Text>
                    <Text>
                        {response.uiTranslations.items}
                        :&nbsp;
                        {items}
                    </Text>
                </Box>
            )}
            {response.tender && response.tender.length > 0 ? (
                <Box mb={8}>
                    <Divider mb={8} size='md' variant='dotted' />
                    {response.tender.map((line, i) => {
                        return <Text key={i}>
                            {response.uiTranslations[line.label.toCamelCase()]}
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
                        {response.uiTranslations.tenderTotal}
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
                        {response.uiTranslations.difference}
                        :&nbsp;
                        {moneyConverter(
                            response.store.countryCode,
                            response.store.currencyCode,
                            difference,
                        )}
                    </Text>
                </Box>
            )}
            <PrintFooter />
            <div ref={basketBottomRef} id='bottomReference'></div>
        </Box>
    )
}

export default Basket
