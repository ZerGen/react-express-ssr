import React, { Component } from 'react'

class  NotFound extends Component {

    UNSAFE_componentWillMount() {
        const { staticContext } = this.props;
        staticContext && (staticContext.NOT_FOUND = true)
    }

    render() {
        return (
            <div>
                <div>404</div>
            </div>
        )
    }
}

export default NotFound