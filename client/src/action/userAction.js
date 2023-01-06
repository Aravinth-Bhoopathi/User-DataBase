import axios from 'axios'
import swal from 'sweetalert'

export const startCountryToken = () => {
    axios.get('https://www.universal-tutorial.com/api/getaccesstoken', {
        headers : {
            "Accept": "application/json",
            "api-token": "yhc4KAcz-SjE2ORPhhxcefkL6r9HIcMTE_xRusI3Il1dfOfThBfOzHQBdMsfrNn5aK0",
            "user-email": "aravinthvijayb@gmail.com"
        }
    })
    .then((response) => {
        const result = response.data
        localStorage.setItem('countryToken', result.auth_token)
    })
    .catch((err) => {
        alert(err.message)
    })
}

export const startCountryList = (setCountries) => {
    axios.get('https://www.universal-tutorial.com/api/countries', {
        headers : {
            "Authorization":`Bearer ${localStorage.getItem('countryToken')}`,
            "Accept": "application/json"
        }
    })
    .then((response) => {
        const result = response.data
        setCountries(result)
    })
    .catch((err) => {
        alert(err.message)
    })
}

export const startStateList = (country, setStates) => {
    axios.get(`https://www.universal-tutorial.com/api/states/${country}`, {
        headers : {
            "Authorization":`Bearer ${localStorage.getItem('countryToken')}`,
            "Accept": "application/json"
        }
    })
    .then((response) => {
        const result = response.data
        setStates(result)
    })
    .catch((err) => {
        alert(err.message)
    })
}

export const startCityList = (state, setCity) => {
    axios.get(`https://www.universal-tutorial.com/api/cities/${state}`, {
        headers : {
            "Authorization":`Bearer ${localStorage.getItem('countryToken')}`,
            "Accept": "application/json"
        }
    })
    .then((response) => {
        const result = response.data
        setCity(result)
    })
    .catch((err) => {
        alert(err.message)
    })
}

export const startUserRegister = (data, redirect) => {
    axios.post('http://localhost:4010/api/user/register', data,{
        headers:{'Content-Type' : 'multipart/form-data'}
    })
        .then((response) => {
            const result = response.data
            if(result.hasOwnProperty('errors')){
                swal({title:"User validation failed", icon:'error'})
            } else if(result.hasOwnProperty('notice'))
            {
                swal({title:result.notice, icon:'warning'})
            } else {
                swal({title:'Successfully Registered', icon:'success', buttons: 'Done'})
                redirect()
            }
        })
        .catch((err) => {
            alert(err.message)
        })
}

export const startUserLogin = (data, redirect) => {
    axios.post('http://localhost:4010/api/user/login', data)
        .then((response) => {
            const result = response.data
            console.log(result)
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
                localStorage.setItem('UserToken', result.token)
                redirect()
            }
        })
        .catch((err) => {
            alert(err.message)
        })
}

export const startUserProfile = () => {
    return(dispatch) => {
        axios.get('http://localhost:4010/api/user/account', {
            headers : {
                'Authorization' : localStorage.getItem('UserToken')
            }
        })
        .then((response) => {
            const result = response.data 
            dispatch(userProfile(result))
        })
        .catch((err) => {
            alert(err.message)
        })
    }
}

export const userProfile = (data) => {
    return {
        type : 'USER_PROFILE',
        payload : data
    }
}

