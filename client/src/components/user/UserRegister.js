import React, {useState, useEffect} from "react"
import {useDispatch} from 'react-redux'
import validator from 'validator'
import { startCountryToken, startCountryList, startStateList, startCityList, startUserRegister } from "../../action/userAction"
import { startUserUpdate } from "../../action/adminAction"
import '../../css/register.css'

const UserRegister = (props) => {
    const {_id,name:Name,email:Email,mobile:Mobile,country:Country,state:State,city:City,description:Description,status,handleToggle}=props

    const [name, setName] = useState(Name || '')
    const [mobile, setMobile] = useState(Mobile || '')
    const [email, setEmail] = useState(Email || '')
    const [password, setPassword] = useState('')
    const [country, setCountry] = useState(Country || '')
    const [state, setState] = useState(State || '')
    const [city, setCity] = useState(City || '')
    const [description, setDescription] = useState(Description || '')
    const [file,setFile] = useState('')
    const [countryList, setCountryList] = useState([])
    const [stateList, setStateList] = useState([])
    const [cityList, setCityList] = useState([])
    const [error, setError] = useState({})
    const errors = {}

    const dispatch = useDispatch()

    const setCountries = (data) => {
        setCountryList(data)
    }
    
    useEffect(() => {
        startCountryToken()
        startCountryList(setCountries)
    }, [])

    useEffect(() => {
        const setStates = (data) => {
            setStateList(data)
        }
        if(country){
            startStateList(country, setStates)
        }
        const setCity = (data) => {
            setCityList(data)
        }
        if(state){
            startCityList(state, setCity)
        }
    }, [country, state])

    const redirect = () =>{
        props.history.push("/user/login")
    }
    
    const handleFormChange = (e) => {
        const attribute = e.target.name
        const value = e.target.value
        if(attribute === 'name'){
            setName(value)
        } else if(attribute === 'mobile'){
            setMobile(value)
        } else if(attribute === 'email'){
            setEmail(value)
        } else if(attribute === 'password'){
            setPassword(value)
        } else if(attribute === 'country'){
            setCountry(value)
        } else if(attribute === 'state'){
            setState(value)
        } else if(attribute === 'city'){
            setCity(value)
        } else if(attribute === 'description'){
            setDescription(value)
        } else if(attribute === 'file'){
            setFile(e.target.files[0])
        }
    }

    const validateForm = () => {
        if(validator.isEmpty(name)){
            errors.name='name is required'
        }
        if(!validator.isEmail(email)){
            errors.email='Invalid Email Format'
        }   
        if(validator.isEmpty(email)){
            errors.email = 'email is required'
        }
        if(validator.isEmpty(mobile)){
            errors.mobile = 'mobile Number is required'
        }
        if(validator.isEmpty(country)){
            errors.country = 'country is required'
        }
        if(validator.isEmpty(state)){
            errors.state = 'state is required'
        }
        if(validator.isEmpty(city)){
            errors.city = 'city is required'
        }
        if(validator.isEmpty(password) && !status){
            errors.password = 'password is required'
        }
        if(validator.isEmpty(description)){
            errors.description = 'description is required'
        }
        if(file === '' && !status){
            errors.file='image is required'
        }
    }

    const handleFormSubmit = (e) =>{
        e.preventDefault()
        validateForm()
        setError(errors)
     
        if(Object.keys(errors).length === 0 && !status){
            const formData = {
                name:name,
                mobile:mobile,
                email:email,
                password:password,
                country:country,
                state:state,
                city:city,
                description:description,
                file:file
            }
            startUserRegister(formData, redirect)
            setName('')
            setMobile('')
            setEmail('')
            setPassword('')
            setCountry('')
            setState('')
            setCity('')
        }
        else if(Object.keys(errors).length === 0 && status){
            const formData={
                name:name,
                mobile:mobile,
                country:country,
                state:state,
                city:city,
                description:description,
                email:email,
            }
            dispatch(startUserUpdate(_id,formData))
            handleToggle()
        }
    }
    
    return (
        <div className='register'>
            <h2 className="text-primary text-center">User Register Form</h2><br/>
            <form onSubmit={handleFormSubmit}>
                <input type='text' placeholder='Enter Your Name' value={name} name='name' onChange={handleFormChange}/><br/>
                {error.name && <span>{error.name}</span>}<br/>

                <input type='text' placeholder='Enter Your Mobile Number' value={mobile} name='mobile' onChange={handleFormChange}/><br/>
                {error.mobile && <span>{error.mobile}</span>}<br/>

                <input type='email' placeholder='Enter Your Email' value={email} name='email' onChange={handleFormChange} /><br/>
                {error.email && <span>{error.email}</span>}<br/>

                {!status &&
                <>
                <input type='password' placeholder='Enter Your Password' value={password} name='password' onChange={handleFormChange} /> <br/>
                {error.password && <span>{error.password}</span>}<br/>
                </>}

                <select name='country' onChange={handleFormChange} value={country}>
                    <option>Select Your Country</option>
                    {countryList.map((ele,i)=>{
                        return <option value={ele.country_name} key={i}>{ele.country_name}</option>
                    })}
                </select><br/>

                {error.country && <span>{error.country}</span>}<br/>
                <select name='state' onChange={handleFormChange} value={state}>
                    <option  >Select Your State</option>
                    {stateList.map((ele,i)=>{
                        return <option value={ele.state_name} key={i}>{ele.state_name}</option>
                    })}
                </select><br/>

                {error.state && <span>{error.state}</span>}<br/>
                <select name='city' onChange={handleFormChange} value={city}>
                    <option>Select Your City</option>
                    {cityList.map((ele,i)=>{
                        return <option value={ele.city_name} key={i}>{ele.city_name}</option>
                    })}
                </select><br/>

                {error.city && <span>{error.city}</span>}<br/>
                <textarea value={description} placeholder='About YourSelf' onChange={handleFormChange} name='description'/><br/>
                {error.description && <span>{error.description}</span>}<br/>

                {!status &&
                <>
                <input type='file' name='file' onChange={handleFormChange} /><br/>
                {error.file && <span>{error.file}</span>}<br/>
                </>}
                
                <input type='submit' value={status ? 'Update' : 'Register'} />
            </form>
            {status && <button onClick={handleToggle} className='btn btn-warning'>Cancel</button>}
        </div>
    )
}

export default UserRegister
