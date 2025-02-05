import { useContext } from 'react'
import { Grid, Stack } from '@mantine/core';
import Display from './Display.jsx'
import Form from './Form.jsx'
import { LayoutContext } from '../providers/LayoutProvider.jsx';

function Main() {
    const { layout, portrait } = useContext(LayoutContext);
    return (<>
        {portrait == true ? (
            <Stack
                w={'100%'}
            >
                <Display />
                <Form />
            </Stack>
        ) : (
            <Grid
                flex={1}
                display='flex'
            >
                {layout[0] == 0 ? '' : (
                    <Grid.Col
                        span={layout[0]}
                        display='flex'
                    >
                        <Display />
                    </Grid.Col>
                )}
                {layout[1] == 0 ? '' : (
                    <Grid.Col
                        span={layout[1]}
                        display='flex'
                    >
                        <Form />
                    </Grid.Col>
                )}
            </Grid>
        )}
    </>)
}

export default Main;
