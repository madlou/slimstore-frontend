import { Anchor, Box, List, Table, Text, Title } from '@mantine/core'
import React from 'react'

const DemoInstructions = ({ name, uiTranslations }) => {
    const customerDisplay = import.meta.env.VITE_CUSTOMER_DISPLAY_URL;
    return (
        <Box>
            {
                name == 'LOGIN' ? (
                    <Box>
                        <Text mb={12}>{uiTranslations.devmessage1}</Text>
                        <Text>{uiTranslations.devmessage2}</Text>
                        <Table withTableBorder withColumnBorders>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>{uiTranslations.user}</Table.Th>
                                    <Table.Th>{uiTranslations.password}</Table.Th>
                                    <Table.Th>{uiTranslations.role}</Table.Th>
                                    <Table.Th>{uiTranslations.store}</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                <Table.Tr>
                                    <Table.Td>1111</Table.Td>
                                    <Table.Td>1234</Table.Td>
                                    <Table.Td>{uiTranslations.associate}</Table.Td>
                                    <Table.Td>423</Table.Td>
                                </Table.Tr>
                                <Table.Tr>
                                    <Table.Td>2222</Table.Td>
                                    <Table.Td>1234</Table.Td>
                                    <Table.Td>{uiTranslations.manager}*</Table.Td>
                                    <Table.Td>423</Table.Td></Table.Tr>
                                <Table.Tr>
                                    <Table.Td>3333</Table.Td>
                                    <Table.Td>1234</Table.Td>
                                    <Table.Td>{uiTranslations.administrator}**</Table.Td>
                                    <Table.Td>600</Table.Td>
                                </Table.Tr>
                            </Table.Tbody>
                        </Table>
                        <Text fs="italic">* {uiTranslations.devmessage3}</Text>
                        <Text fs="italic" mb={16}>** {uiTranslations.devmessage4}</Text>
                        <Text>{uiTranslations.devmessage5}:&nbsp;
                            <Anchor href={customerDisplay} target="_blank">{uiTranslations.customerDisplay}</Anchor>
                        </Text>
                    </Box>
                ) : ''
            }
            {
                name == 'REGISTER_CHANGE' ? (
                    <Box>
                        <Text>{uiTranslations.devmessage1}</Text>
                        <Text>{uiTranslations.devmessage2}</Text>
                        <Table withTableBorder withColumnBorders>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Td>{uiTranslations.store}</Table.Td>
                                    <Table.Td>{uiTranslations.register}</Table.Td>
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
                name == 'ABOUT' ? (
                    <Box>
                        <Text>{uiTranslations.devmessage1}</Text>
                        <Title order={3} mt={12}>{uiTranslations.sourceCode}</Title>
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