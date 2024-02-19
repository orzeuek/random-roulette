const React = require('react');
const _ = require('lodash');
const {i18n} = require('./../app/i18n');

export class SelectableToggleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [...this.props.items],
        };
    }

    handleItemClick = (item) => {
        const {updateState} = this.props;
        const updatedSelected = [...this.state.selected];

        if (updatedSelected.includes(item)) {
            const index = updatedSelected.indexOf(item);
            updatedSelected.splice(index, 1);
        } else {
            updatedSelected.push(item);
        }

        if (updatedSelected.length === 0) {
            alert('at least one category needs to be selected!');
            return;
        }

        updateState(updatedSelected);
        this.setState(() => ({
            selected: updatedSelected,
        }));
    }

    render() {
        const {items} = this.props;

        return (
            <div>
                {items.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => this.handleItemClick(item)}
                        style={{
                            backgroundColor: this.state.selected.includes(item) ? 'blue' : 'transparent',
                            color: this.state.selected.includes(item) ? 'white' : 'black',
                            cursor: 'pointer',
                            padding: '5px',
                            margin: '5px',
                        }}
                    >
                        {i18n.t(item)}
                    </div>
                ))}
            </div>
        );
    }
}
