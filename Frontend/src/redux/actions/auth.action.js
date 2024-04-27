import Api from "../../utils/api"

export const login = (loginData) => {
    return async dispatch => {
        let response = await Api.post("/auth/login", loginData)
        console.log(response.data)
        localStorage.setItem('token', response?.data?.token)
    }
}
export const register = (registerData) => {
    return async dispatch => {
        let response = await Api.post("/auth/register", registerData)
    }
}
