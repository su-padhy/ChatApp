import { createStore } from 'redux'

const initialState = {
  user: [],
  loginModal: {
    open: false
  }
}

const reducer = (state = initialState, action) => {
  if (action.type === 'SET_USER') {
    return Object.assign({}, state, {
        user: action.payload
    })
  }
  return state
}

const store = createStore(reducer)

export default store