const React = require("react");

export class TextField extends React.Component {
    render() {
        return <input type="text" onChange={this.props.changeHandler}></input>;
    }
}
