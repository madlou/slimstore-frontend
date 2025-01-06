import { Select } from '@mantine/core';

function LanguageDropdown({ lang, languages, menuOpened, requestForm, setLang, setRequestForm }) {
    const langChange = (value) => {
        setLang(value);
        setRequestForm(JSON.parse(JSON.stringify(requestForm)));
    }
    return (
        <>
            <Select
                data={languages}
                onChange={langChange}
                value={lang}
                w={menuOpened ? '100%' : 70}
            />
        </>
    )
}

export default LanguageDropdown;
