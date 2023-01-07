import React from "react"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { startAdminLogin } from "../../action/adminAction"
import '../../css/admin.css'

const AdminLogin = (props) => {
    const {handleToggle} = props
    const formik = useFormik({
        initialValues : {
            key : ''
        },
        validationSchema : Yup.object({
            key : Yup.string().min(8).required()
        }),
        onSubmit : function(values){
            const data = {key : values.key}
            const redirect = () => {
                props.history.push("/admin/dashboard")
                handleToggle(true)
            }
            startAdminLogin(data, redirect)
            
        }
    })
    return (
        <div className="admin">
            <h2 className="text-primary text-center">Admin Login</h2><br/>
            <form onSubmit={formik.handleSubmit}>
            <input type="password" 
                    value={formik.values.key} 
                    name="key" 
                    onChange={formik.handleChange}
                    placeholder="Enter Admin Key"
            /><br/>
            {formik.touched.key && formik.errors.key &&<span>{formik.errors.key}</span>}
            <br/>
            <input type="submit" value=" Login " className="btn btn-info"/>
            </form>
        </div>
    )
}

export default AdminLogin