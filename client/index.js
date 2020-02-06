import React from 'react'
import ReactDom from 'react-dom'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from'react-router-dom'
import routes from'../src/router/config'
import { Provider } from 'react-redux'
import { getClientStore } from '../src/store'

const store = getClientStore()

const App= () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    {/* {routes.map(route => (
                        <Route key={route.key}
                            {...route}
                        />
                    ))} */}
                    {
                        renderRoutes(routes)
                    }
                </div>
            </BrowserRouter>
        </Provider>
    )
}


ReactDom.hydrate(<App />, document.getElementById('root'))