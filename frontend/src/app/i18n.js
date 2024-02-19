const i18n = require('i18next');
const enTranslations = require('../assets/en.json');
const plTranslations = require('../assets/pl.json');


i18n.init({
    lng: 'en',
    resources: {
        en: { translation: enTranslations },
        pl: { translation: plTranslations },
    }
});

export {
    i18n,
};
