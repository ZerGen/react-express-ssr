export default (proxyRes, proxyResData, userReq, userRes) => {
    const API_URL = userReq.originalUrl
    let Node_data = JSON.parse(proxyResData.toString('utf8'))
    switch (API_URL) {
        case '/api/system/currency':
            Node_data.data.push({ name: '抽离币种', symbol: 'L', type: 'Lan' })
            break
        default:
            break
    }
    return JSON.stringify(Node_data)
}