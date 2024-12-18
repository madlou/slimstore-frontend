import { Box } from '@mantine/core'
import React from 'react'

const DemoInstructions = (props) => {
    return (
        <Box>
            {
                props.name == 'LOGIN' ? (
                    <div>
                        <p>{props.uiTranslations.devmessage1}</p>
                        <p>{props.uiTranslations.devmessage2}</p>
                        <table className='table-with-borders'><tbody>
                            <tr><td>{props.uiTranslations.user}</td><td>{props.uiTranslations.password}</td><td>{props.uiTranslations.role}</td><td>{props.uiTranslations.store}</td></tr>
                            <tr><td>1111</td><td>1234</td><td>{props.uiTranslations.associate}</td><td>423</td></tr>
                            <tr><td>2222</td><td>1234</td><td>{props.uiTranslations.manager}*</td><td>423</td></tr>
                            <tr><td>3333</td><td>1234</td><td>{props.uiTranslations.administrator}**</td><td>600</td></tr>
                        </tbody></table>
                        <p><i>* {props.uiTranslations.devmessage3}</i></p>
                        <p><i>** {props.uiTranslations.devmessage4}</i></p>
                    </div>
                ) : ''
            }
            {
                props.name == 'REGISTER_CHANGE' ? (
                    <div>
                        <p>{props.uiTranslations.devmessage1}</p>
                        <p>{props.uiTranslations.devmessage2}</p>
                        <table className='table-with-borders'><tbody>
                            <tr><td>{props.uiTranslations.store}</td><td>{props.uiTranslations.register}</td></tr>
                            <tr><td>423</td><td>1</td></tr>
                            <tr><td>423</td><td>2</td></tr>
                            <tr><td>423</td><td>3</td></tr>
                            <tr><td>600</td><td>1</td></tr>
                        </tbody></table>
                    </div>
                ) : ''
            }
        </Box>
    )
}

export default DemoInstructions