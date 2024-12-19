import { Select } from '@mantine/core';
import dataSpec from '../util/dataSpec.js';

function LanguageDropdown(props) {
    const langChange = (value) => {
        props.setLang(value);
        props.setRequestForm({ ...dataSpec.view.form });
    }
    const display = ['HOME', 'LOGIN'].includes(props.viewName) ? 'block' : 'none';
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
