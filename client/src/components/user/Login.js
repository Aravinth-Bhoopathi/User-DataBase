import React from "react"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { startUserLogin } from "../../action/userAction"
import '../../css/login.css'

const UserLogin = (props) => {
    const {handleToggle} = props
    const formik = useFormik({
        initialValues : {
            email : '',
            password : ''
        },
        validationSchema : Yup.object({
            email : Yup.string().email().required(),
            password : Yup.string().min(8).required()
        }),
        onSubmit : function(values){
            const data = {email : values.email, password : values.password}
            const redirect = () => {
                props.history.push("/user/profile")
                handleToggle(true)
            }
            startUserLogin(data, redirect)
        }
    })
    return (
        <div className='login'>
            <h2 className="text-primary text-center">User Login</h2><br/>
            <form onSubmit={formik.handleSubmit}>
                <input type="email" 
                    value={formik.values.email} 
                    name="email" 
                    onChange={formik.handleChange}
                    placeholder="enter your email"
                /><br/>
                {formik.touched.email && formik.errors.email &&<span>{formik.errors.email}</span>}
                <br/>
                <input type="password" 
                    value={formik.values.password} 
                    name="password" 
                    onChange={formik.handleChange}
                    placeholder="enter your password"
                /><br/>
                {formik.touched.password && formik.errors.password &&<span>{formik.errors.password}</span>}
                <br/>
                <input type="submit" value=" Login " className="btn btn-info"/>
            </form>
        </div>
    )
}

export default UserLogin
