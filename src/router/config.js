import App from '../App'
import Home from '../../src/containers/home'
import Login from '../../src/containers/login'
import NotFound from '../../src/containers/notFound'

export default [{
    path: '/',
    component: App,
    routes: [
        {
            path: '/',
            component: Home,
            exact: true,
            loadData: Home.loadData,
            key: 'home'
        }, {
            path: '/login',
            component: Login,
            exact: true,
            key: 'login'
        }, {
            component: NotFound
        }
    ]
}]