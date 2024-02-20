const React = require("react");
const {i18n} = require('../app/i18n');

export class RandomElementButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            element: '',
        };
    }

    handleClick = async () => {
        const randomElement = await this.props.rollAction();

        this.setState({
            element: randomElement.text
        })
    }

    render() {
        const {buttonTextKey} = this.props;

        // @todo make a dynamic change of element once language has been changed!
        return (
            <div>
                <p>{this.state.element}</p>
                <button onClick={this.handleClick}>{i18n.t(buttonTextKey)}</button>
            </div>
        );
    }
}
