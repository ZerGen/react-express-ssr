import React from 'react'
import { Link } from 'react-router-dom'
import styles from './header.css'
import withStyle from '../../src/containers/withStyle'

class Header extends React.Component {

    render() {
        return (
            <div className={styles.test}>
               <Link to="/">Home </Link>
               <Link to="/login">Login</Link>
            </div>
        )
    }
}

export default withStyle(Header, styles)