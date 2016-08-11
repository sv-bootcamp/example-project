import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Counter from '../shared/components/Counter'
import counter from '../shared/reducers'

const store = createStore(counter)
const rootEl = document.getElementById('root')

store.subscribe(render);

document.addEventListener('click', ()=> {
     store.dispatch({type : 'VISIT'})
})

const render = () => {
     document.body.innerText = store.getState();
}

store.dispatch(() => {
     cosnole.log(store.getState())
})

render()
store.subscribe(render)
