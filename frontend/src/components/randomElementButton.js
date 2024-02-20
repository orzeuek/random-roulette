const React = require("react");
const {i18n} = require('../app/i18n');

export class RandomElementButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            element: {},
        };
    }

    handleClick = async () => {
        const randomElement = await this.props.rollAction();

        this.setState({
            element: randomElement
        })
    }

    render() {
        const {buttonTextKey} = this.props;
        const currentLanguage = this.props.store.getState()[this.props.currentLanguageKey];

        return (
            <div>
                <p>{this.state.element[currentLanguage]}</p>
                <button onClick={this.handleClick}>{i18n.t(buttonTextKey)}</button>
            </div>
        );
    }
}
