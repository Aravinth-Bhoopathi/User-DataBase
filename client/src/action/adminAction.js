import axios from 'axios'
import swal from 'sweetalert'

export const startAdminLogin = (data, redirect) => {
    axios.post('http://localhost:4010/api/admin/login', data)
        .then((response) => {
            const result = response.data 
            if(result.hasOwnProperty('notice')){
                swal({title:"invalid email or password", icon:'error'})
            } else if(result.hasOwnProperty('error')){
                swal({title:"Error", icon:'error'})
            } else {
                swal({
                    title: "You are successfully logged in",
                    icon: "success",
                    buttons: 'Done'
                })
                localStorage.setItem('AdminToken', result.token)
                redirect()
            }
        })
        .catch((err) => {
            alert(err.message)
        })
}

export const startUserData = () => {
    return(dispatch) => {
        axios.get('http://localhost:4010/api/admin/list', {
            headers : {
                'Authorization' : localStorage.getItem('AdminToken')
            }
        })
        .then((response) => {
            const result = response.data
            dispatch(getUser(result))
        })
        .catch((err) => {
            alert(err.message)
        })
    }
}

export const getUser = (data) => {
    return {
        type : 'GET_USER',
        payload : data
    }
}

export const startUserDelete = (id) => {
    return(dispatch) => {
        axios.delete(`http://localhost:4010/api/admin/destory/${id}`, {
            headers : {
                'Authorization' : localStorage.getItem('AdminToken')
            }
        })
        .then((response) => {
            const result = response.data
            dispatch(deleteUser(result))
        })
        .catch((err) => {
            alert(err.message)
        })
    }
}

export const deleteUser = (data) => {
    return {
        type : 'DELETE_USER',
        payload : data
    }
}

export const startUserUpdate = (id, formData) => {
    return(dispatch) => {
        axios.put(`http://localhost:4010/api/admin/update/${id}`, formData, {
            headers : {
                'Authorization' : localStorage.getItem('AdminToken')
            }
        })
        .then((response) => {
            const result = response.data
            dispatch(updateUser(result))
        })
        .catch((err) => {
            alert(err.message)
        })
    }
}

export const updateUser = (data) => {
    return {
        type : 'UPDATE_USER',
        payload : data
    }
}



