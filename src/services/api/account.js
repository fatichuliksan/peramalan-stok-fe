import api from '../../axios'

export const authorization = () => {
    return new Promise((resolve, reject) => {
        api.post('/api/account/v1/authorization').then((r) => {
            resolve(r)
        }).catch((e) => {
            reject(e)
        })
    })
}

export const personalUserMenu = () => {
    return new Promise((resolve, reject) => {
        api.get('/api/account/v1/setting/menu-user').then((r) => {
            resolve(r)
        }).catch((e) => {
            reject(e)
        })
    })
}