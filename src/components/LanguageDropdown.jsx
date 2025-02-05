import { Select } from '@mantine/core';
import { LayoutContext } from '../providers/LayoutProvider.jsx';
import { FormContext } from '../providers/FormProvider.jsx';
import { useContext } from 'react';

function LanguageDropdown() {
    const { menuOpened } = useContext(LayoutContext);
    const { lang, setLang, response, requestForm, setRequestForm } = useContext(FormContext);
    const langChange = (value) => {
        setLang(value);
        setRequestForm(JSON.parse(JSON.stringify(requestForm)));
    }
    return (
        <>
            <Select
                data={response.languages}
                onChange={langChange}
                value={lang}
                w={menuOpened ? '100%' : 70}
            />
        </>
    )
}

export default LanguageDropdown;
