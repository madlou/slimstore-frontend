import { Select } from '@mantine/core';

function LanguageDropdown(props) {
    const langChange = (value) => {
        props.setLang(value);
        props.setRequestForm(JSON.parse(JSON.stringify(props.requestForm)));
    }
    return (
        <>
            <Select
                data={props.languages}
                onChange={langChange}
                value={props.lang}
                w={props.menuOpened ? '100%' : 70}
            />
        </>
    )
}

export default LanguageDropdown;
