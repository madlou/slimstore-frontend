import { useContext } from 'react';
import { Select } from '@mantine/core';
import { LayoutContext } from '../providers/LayoutProvider.jsx';
import { FormContext } from '../providers/FormProvider.jsx';
import { TranslationContext } from '../providers/TranslationProvider.jsx';

function LanguageDropdown() {
    const { requestForm, setRequestForm } = useContext(FormContext);
    const { menuOpened } = useContext(LayoutContext);
    const { language, setLanguage, languages } = useContext(TranslationContext);
    const langChange = (value) => {
        setLanguage(value);
        setRequestForm(JSON.parse(JSON.stringify(requestForm)));
    }
    return (
        <>
            <Select
                data={ languages }
                onChange={ langChange }
                value={ language }
                w={ menuOpened ? '100%' : 70 }
            />
        </>
    )
}

export default LanguageDropdown;
