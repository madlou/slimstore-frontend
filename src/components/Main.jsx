import { useContext } from 'react'
import { Grid, Stack } from '@mantine/core';
import Display from './Display.jsx'
import Form from './Form.jsx'
import { LayoutContext } from '../context/LayoutProvider.jsx';

function Main() {
    const { layout } = useContext(LayoutContext);
    return (<>
        {layout[0] == 12 ? (
            <Stack
                w={'100%'}
            >
                <Display />
                <Form />
            </Stack>
        ) : (
            <Grid
                flex={1}
                display={layout[0] == 12 ? 'flex' : 'flex'}
            >
                <Grid.Col
                    span={layout[0]}
                    display={layout[0] == 12 ? 'block' : 'flex'}
                    flex={layout[0] == 12 ? 'unset' : 1}
                >
                    <Display />
                </Grid.Col>
                <Grid.Col
                    span={layout[1]}
                    display={layout[1] == 12 ? 'block' : 'flex'}
                    flex={layout[0] == 12 ? 'unset' : 1}
                >
                    <Form />
                </Grid.Col>
            </Grid>
        )}
    </>)
}

export default Main;
