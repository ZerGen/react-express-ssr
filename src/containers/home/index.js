/* eslint-disable no-alert */
import React, { Component } from 'react'
import Header from '../../components/header';
import { connect } from 'react-redux'
import { getHomeList } from './store/action'
import styles from './index.css'
import withStyle from '../withStyle'

class Home extends Component {

    componentDidMount() {
        // 为了避免无用的 再次请求数据，可以做一些判断 比如判断list长度
        if(!this.props.list.length > 0) {
            this.props.getHomeList()
        }
    }

    render() {
        return (
            <div>
                <Header staticContext={this.props.staticContext} />
                {
                    this.props.list.map(item => {
                        return <div className={styles.test}
                            key={item.type}
                               >{item.name}</div>
                    })
                }
                <button onClick={() => alert('click')}>Click</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list: state.home.newList
})

const mapDispatchToProps = dispatch => ({
    getHomeList() {
        dispatch(getHomeList())
    }
})

const exportComponent =  connect(mapStateToProps, mapDispatchToProps)(withStyle(Home, styles))

exportComponent.loadData = store => {
    // 这个函数，负责在服务端渲染之前，把这个路由所需要的数据提前加载好
    return store.dispatch(getHomeList())
}

export default exportComponent