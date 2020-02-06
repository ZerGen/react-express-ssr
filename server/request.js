import axios from 'axios'
// https://app.toursforfun.com
const createInstance = req => axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        cookie: req.get('cookie') || ''
    }
})

export default createInstance