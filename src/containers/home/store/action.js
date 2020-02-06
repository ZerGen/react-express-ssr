import { CHANGE_LIST } from './constants'

const changeList = list => ({
    type: CHANGE_LIST,
    list
})

export const getHomeList = () => {
    // https://app.toursforfun.com/api/system/currency
    return (dispatch, getState, axiosInstance) => {
        return axiosInstance.get('/api/system/currency').then(rs => {
            const list = rs.data.data;
            dispatch(changeList(list))
        })
    }
}