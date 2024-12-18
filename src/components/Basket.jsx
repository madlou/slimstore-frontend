import { useRef, useEffect } from 'react'
import { Text, Box, Group, Divider } from '@mantine/core';
import PrintHeader from './PrintHeader.jsx'
import PrintFooter from './PrintFooter.jsx'
import DemoInstructions from './DemoInstructions.jsx';
import moneyConverter from '../util/moneyConverter.js';

function Basket(props) {
    let total = 0;
    let lines = 0;
    let items = 0;
    let tenders = 0;
    let difference = null;
    props.basket.map((line, i) => {
        total += line.quantity * line.unitValue * (line.type == 'RETURN' ? -1 : 1);
        items += line.quantity;
        lines++;
    })
    props.tender.map((line, i) => {
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
        setTimeout(() => {
            scrollToBottom()
        }, 100)
    }, [props.basket]);
    return (
        <Box
            w={'95%'}
        >
            <PrintHeader
                response={props.response}
            />
            <DemoInstructions
                name={props.name}
                uiTranslations={props.uiTranslations}
            />
            {props.basket.map((line, i) => {
                return (
                    <Box mb={8}>
                        <Text>{line.code} {line.name}</Text>
                        <Group
                            justify='space-between'
                        >
                            <Text>
                                {line.quantity * (line.type == 'RETURN' ? -1 : 1)}
                                &nbsp;@&nbsp;
                                {moneyConverter(
                                    props.response.store.countryCode,
                                    props.response.store.currencyCode,
                                    line.unitValue,
                                )}
                            </Text>
                            <Text>
                                {moneyConverter(
                                    props.response.store.countryCode,
                                    props.response.store.currencyCode,
                                    (line.quantity * (line.type == 'RETURN' ? -1 : 1) * line.unitValue),
                                )}
                            </Text>
                        </Group>
                    </Box>
                );
            })}
            {props.basket.length < 1 ? '' : (
                <Box mb={8}>
                    <Divider mb={8} size='md' variant='dotted' />
                    <Text>
                        {props.uiTranslations.subtotal}
                        :&nbsp;
                        {moneyConverter(
                            props.response.store.countryCode,
                            props.response.store.currencyCode,
                            total,
                        )}
                    </Text>
                    <Text>
                        {props.uiTranslations.transactionLines}
                        :&nbsp;
                        {lines}
                    </Text>
                    <Text>
                        {props.uiTranslations.items}
                        :&nbsp;
                        {items}
                    </Text>
                </Box>
            )}
            {props.tender && props.tender.length > 0 ? (
                <Box mb={8}>
                    <Divider mb={8} size='md' variant='dotted' />
                    {props.tender.map((line, i) => {
                        return <Text>
                            {line.label}
                            &nbsp;
                            {moneyConverter(
                                props.response.store.countryCode,
                                props.response.store.currencyCode,
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
                        {props.uiTranslations.tenderTotal}
                        :&nbsp;
                        {moneyConverter(
                            props.response.store.countryCode,
                            props.response.store.currencyCode,
                            tenders,
                        )}
                    </Text>
                </Box>
            )}
            {tenders == 0 || difference == 0 ? '' : (
                <Box mb={8}>
                    <Text>
                        {props.uiTranslations.difference}
                        :&nbsp;
                        {moneyConverter(
                            props.response.store.countryCode,
                            props.response.store.currencyCode,
                            difference,
                        )}
                    </Text>
                </Box>
            )}
            <PrintFooter
                response={props.response}
            />
            <div ref={basketBottomRef} id='bottomReference'></div>
        </Box>
    )
}

export default Basket
