import { Anchor, Box, List, Table, Text, Title } from '@mantine/core'
import React from 'react'

const DemoInstructions = (props) => {
    const customerDisplay = import.meta.env.VITE_CUSTOMER_DISPLAY_URL;
    return (
        <Box>
            {
                props.name == 'LOGIN' ? (
                    <Box>
                        <Text mb={12}>{props.uiTranslations.devmessage1}</Text>
                        <Text>{props.uiTranslations.devmessage2}</Text>
                        <Table withTableBorder withColumnBorders>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>{props.uiTranslations.user}</Table.Th>
                                    <Table.Th>{props.uiTranslations.password}</Table.Th>
                                    <Table.Th>{props.uiTranslations.role}</Table.Th>
                                    <Table.Th>{props.uiTranslations.store}</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                <Table.Tr>
                                    <Table.Td>1111</Table.Td>
                                    <Table.Td>1234</Table.Td>
                                    <Table.Td>{props.uiTranslations.associate}</Table.Td>
                                    <Table.Td>423</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td>2222</Table.Td>
                                    <Table.Td>1234</Table.Td>
                                    <Table.Td>{props.uiTranslations.manager}*</Table.Td>
                                    <Table.Td>423</Table.Td></Table.Tr>
                                <Table.Tr>
                                    <Table.Td>3333</Table.Td>
                                    <Table.Td>1234</Table.Td>
                                    <Table.Td>{props.uiTranslations.administrator}**</Table.Td>
                                    <Table.Td>600</Table.Td>
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
                        <Text fs="italic">* {props.uiTranslations.devmessage3}</Text>
                        <Text fs="italic" mb={16}>** {props.uiTranslations.devmessage4}</Text>
                        <Text>{props.uiTranslations.devmessage5}:&nbsp;
                            <Anchor href={customerDisplay} target="_blank">{props.uiTranslations.customerDisplay}</Anchor>
                        </Text>
                    </Box>
                ) : ''
            }
            {
                props.name == 'REGISTER_CHANGE' ? (
                    <Box>
                        <Text>{props.uiTranslations.devmessage1}</Text>
                        <Text>{props.uiTranslations.devmessage2}</Text>
                        <Table withTableBorder withColumnBorders>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Td>{props.uiTranslations.store}</Table.Td>
                                    <Table.Td>{props.uiTranslations.register}</Table.Td>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                <Table.Tr>
                                    <Table.Td>423</Table.Td>
                                    <Table.Td>1</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td>423</Table.Td>
                                    <Table.Td>2</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td>423</Table.Td>
                                    <Table.Td>3</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td>600</Table.Td>
                                    <Table.Td>1</Table.Td>
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
                    </Box>
                ) : ''
            }
            {
                props.name == 'ABOUT' ? (
                    <Box>
                        <Text>{props.uiTranslations.devmessage1}</Text>
                        <Title order={3} mt={12}>{props.uiTranslations.sourceCode}</Title>
                        <List>
                            <List.Item>
                                <Anchor href="https://github.com/madlou/slimstore-infrastructure" target="_blank">
                                    https://github.com/madlou/slimstore-infrastructure
                                </Anchor>
                            </List.Item>
                            <List.Item>
                                <Anchor href="https://github.com/madlou/slimstore-backend" target="_blank">
                                    https://github.com/madlou/slimstore-backend
                                </Anchor>
                            </List.Item>
                            <List.Item>
                                <Anchor href="https://github.com/madlou/slimstore-frontend" target="_blank">
                                    https://github.com/madlou/slimstore-frontend
                                </Anchor>
                            </List.Item>
                            <List.Item>
                                <Anchor href="https://github.com/madlou/slimstore-customerdisplay" target="_blank">
                                    https://github.com/madlou/slimstore-customerdisplay
                                </Anchor>
                            </List.Item>
                        </List>
                    </Box>
                ) : ''
            }
        </Box >
    )
}

export default DemoInstructions