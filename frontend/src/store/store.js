const _ = require('lodash');
const Redux = require('redux');

const SET = 'SET';
const REMOVE = 'REMOVE';

function set(key, value) {
    return {
        type: SET,
        key,
        value,
    }
}

function remove(key) {
    return {
        type: REMOVE,
        key,
    }
}

function store(state, action) {
    if (_.isUndefined(state)) state = {};

    if (action.type === SET) {
        return  _.set(state, action.key, action.value);
    } else if (action.type === REMOVE) {
        return _.omit(state, action.key);
    }

    return state;
}

function render() {
    // console.log('state')
    // console.log(storeObj.getState())
}

const storeObj = Redux.createStore(store);
storeObj.subscribe(render);


export {
    set,
    remove,
    storeObj,
}