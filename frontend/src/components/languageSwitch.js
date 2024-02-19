const React = require('react');
const { i18n } = require('../app/i18n')

export class LanguageSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: this.props.defaultLanguage,
        }
    }

    handleChangeLanguage = (event) => {
        const selectedLanguage = event.target.value;
        this.setState({
            selectedLanguage,
        })
        i18n.changeLanguage(selectedLanguage);
        this.props.onChangeLanguage(selectedLanguage);
    };

    render () {
        const languages = this.props.languagesList;
        return (
            <div>
                <span>{i18n.t('language')}:</span>
                <select onChange={this.handleChangeLanguage}>
                    {languages.map((lang, index) => (
                        <option key={index} value={lang.value}>{i18n.t(lang.textKey)}</option>
                    ))}
                </select>
            </div>
        )
    };
}
