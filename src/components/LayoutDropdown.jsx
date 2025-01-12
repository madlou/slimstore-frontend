import { React, useContext } from 'react'
import { Group, Select } from '@mantine/core';
import { RiLayoutColumnLine, RiLayoutRightLine, RiLayoutLeftLine, RiLayoutRowLine, RiCheckFill } from "react-icons/ri";
import { LayoutContext } from '../context/LayoutProvider.jsx';

const LayoutDropdown = () => {
    const { layout, setLayout, menuOpened } = useContext(LayoutContext);
    const change = (value) => {
        const split = value.split('_');
        setLayout([split[1], split[2]]);
    }
    const iconProps = { size: 26 };
    const icons = {
        L_6_6: <RiLayoutColumnLine {...iconProps} />,
        L_9_3: <RiLayoutRightLine {...iconProps} />,
        L_3_9: <RiLayoutLeftLine {...iconProps} />,
        L_12_12: <RiLayoutRowLine {...iconProps} />,
    };
    const renderSelectOption = ({ option, checked }) => (
        <Group>
            {icons[option.value]}
            {checked && <RiCheckFill {...iconProps} />}
        </Group>
    );
    return (
        <Select
            w={menuOpened ? '100%' : 90}
            data={[
                { value: 'L_6_6', label: '50|50' },
                { value: 'L_9_3', label: '75|25' },
                { value: 'L_3_9', label: '25|75' },
                { value: 'L_12_12', label: '50/50' },
            ]}
            value={'L' + '_' + layout[0] + '_' + layout[1]}
            onChange={change}
            renderOption={renderSelectOption}
        />
    )
}

export default LayoutDropdown