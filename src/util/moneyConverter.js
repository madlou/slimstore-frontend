const moneyConverter = (countryCode, currency, value) => {
    const currencyMap = {
        EUR: '€',
        GBP: '£',
        PLN: 'zł',
        USD: '$',
    }
    const sign = value < 0 ? '-' : '';
    switch (countryCode) {
        case 'DE':
            return value.toFixed(2) + ' ' + currencyMap[currency];
        case 'ES':
            return value.toFixed(2) + ' ' + currencyMap[currency];
        case 'FR':
            return value.toFixed(2) + ' ' + currencyMap[currency];
        case 'IE':
            return sign + currencyMap[currency] + Math.abs(value).toFixed(2);
        case 'PL':
            return value.toFixed(2) + ' ' + currencyMap[currency];
        case 'UK':
            return sign + currencyMap[currency] + Math.abs(value).toFixed(2);
        case 'US':
            return value.toFixed(2) + ' ' + currencyMap[currency];
    }
}

export default moneyConverter