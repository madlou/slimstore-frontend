import { useContext } from 'react'
import FunctionButtons from './FunctionButtons.jsx'
import Keyboard from './Keyboard.jsx'
import StatusBar from './StatusBar.jsx'
import { Slider } from '@mantine/core';
import { RxDragHandleVertical  } from "react-icons/rx";
import { LayoutContext } from '../providers/LayoutProvider.jsx';


function Footer() {
    const { portrait, setLayout } = useContext(LayoutContext);
    const sliderChange = (value) => {
        setLayout([value, 12 - value])
    }
    return (<>
        { portrait == true ? '' : (
            <Slider
                defaultValue={6}
                label={ null }
                onChange={ sliderChange }
                thumbChildren={<RxDragHandleVertical />}
                radius={0}
                color="transparent"
                step={1}
                max={12}
                styles={{
                    root: {
                        height: '1px',
                        position: 'absolute',
                        width: '100%',
                        marginTop: '-45vh',
                    },
                    track: {    
                        height: '0px',
                    },
                    thumb: {
                        border: '0px',
                        color: 'darkgray',
                        height: '50px',
                        backgroundColor: "transparent",
                    }
                }}
            />
        )}
        <Keyboard />
        <FunctionButtons />
        <StatusBar />
    </>)
}

export default Footer;
