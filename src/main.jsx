import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Context
import { StateContext } from './context/StateContext'

// Redux
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <StateContext>
        <App />
      </StateContext>
    </Provider>,
)
