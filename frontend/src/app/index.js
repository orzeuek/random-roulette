const ReactDomClient = require('react-dom/client');
const React = require('react');
const store = require('./../store/store')
const {RandomElementButton} = require('../components/randomElementButton')
const {SelectableToggleList} = require("../components/selectableToggleList");
const {LanguageSwitch} = require("../components/languageSwitch");

const SELECTED_CATEGORIES = 'SELECTED_CATEGORIES';
const LANGUAGE = 'LANGUAGE';
const CATEGORIES = Object.freeze(["category1", "category2", "category3"]);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.store = store.storeObj
        this.changeLanguage = this.changeLanguage.bind(this);
        this.setSelectedCategories = this.setSelectedCategories.bind(this);
        this.getNewElement = this.getNewElement.bind(this);

        this.changeLanguage('en', false);
        this.setSelectedCategories([...CATEGORIES]);
    }

    setSelectedCategories(categories) {
        store.storeObj.dispatch(store.set(SELECTED_CATEGORIES, categories));
    }

    getNewElement() {
        const tags = store.storeObj.getState()[SELECTED_CATEGORIES];
        const query = new URLSearchParams({ tags: [] });
        for (const tag of tags) query.append('tags', tag);

        return fetch(`/api/roll?` + query.toString())
            .then(response => response.json())
    }

    changeLanguage(selectedLanguage, reRender = true) {
        store.storeObj.dispatch(store.set(LANGUAGE, selectedLanguage));
        if (reRender) this.setState(() => ({}));
    }

    render() {
        return <div>
            <LanguageSwitch
                onChangeLanguage={this.changeLanguage}
                // @todo load languages list from backend!
                languagesList={[{value: 'en', textKey: 'english'}, {value: 'pl', textKey: 'polish'}]}
                defaultLanguage={'en'}
            >
            </LanguageSwitch>
            <RandomElementButton
                buttonTextKey='roll'
                rollAction={this.getNewElement}
                store={this.store}
                currentLanguageKey={LANGUAGE}
            >
            </RandomElementButton>
            <SelectableToggleList
                // @todo load categories from backend!
                items={[...CATEGORIES]}
                updateState={this.setSelectedCategories}>
            </SelectableToggleList>
        </div>
    }
}

const container = document.getElementById('app');
const root = ReactDomClient.createRoot(container);
root.render(
    <App></App>
);