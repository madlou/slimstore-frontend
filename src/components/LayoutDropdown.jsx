import { React, useState } from 'react'
import { RiLayoutColumnLine, RiLayoutRightLine, RiLayoutLeftLine, RiLayoutRowLine } from "react-icons/ri";

import { Group, Select } from '@mantine/core';
import { FaCheck } from "react-icons/fa";

const LayoutDropdown = (props) => {

    const change = (value) => {
        const split = value.split('_');
        props.setLayout([split[1], split[2]]);
    }

    const iconProps = { size: 26 };

    const icons = {
        L_6_6: <RiLayoutColumnLine {...iconProps} />,
        L_9_3: <RiLayoutRightLine {...iconProps} />,
        L_3_9: <RiLayoutLeftLine {...iconProps} />,
        L_12_12: <RiLayoutRowLine {...iconProps} />,
    };

    const renderSelectOption = ({ option, checked }) => (
        <Group flex="1" gap="xs">
            {icons[option.value]}
            {/* {option.label} */}
            {checked && <FaCheck style={{ marginInlineStart: 'auto' }} {...iconProps} />}
        </Group>
    );
    return (
        <Select
            w={90}
            data={[
                { value: 'L_6_6', label: '50|50' },
                { value: 'L_9_3', label: '75|25' },
                { value: 'L_3_9', label: '25|75' },
                { value: 'L_12_12', label: '50/50' },
            ]}
            value={'L' + '_' + props.layout[0] + '_' + props.layout[1]}
            onChange={change}
            renderOption={renderSelectOption}
        />
    )
}

export default LayoutDropdown