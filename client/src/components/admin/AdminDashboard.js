import React, {useEffect, useState, useRef} from "react"
import { useDispatch, useSelector } from "react-redux"
import { startUserData, startUserDelete } from "../../action/adminAction"
import UserRegister from "../user/UserRegister"
import {Modal, Popconfirm} from 'antd'
import {useReactToPrint} from "react-to-print"
import swal from 'sweetalert'

const AdminDashboard = (props) => {
    const [toggle, setToggle] = useState(false)
    const [edit, setEdit] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startUserData())
    }, [dispatch])

    const userDetails = useSelector((state) => {
        return state.admin
    })

    const handleToggle = () => {
        setToggle(!toggle)
    }

    const handleDelete = (id) => {
        dispatch(startUserDelete(id))
    }

    const handleEdit = (e) => {
        setEdit(e)
        handleToggle()
    }

    const  componentRef=useRef();
    const handlePrint=useReactToPrint({
        content : ()=> componentRef.current,
        documentTitle:'table',
        onAfterPrint:()=> swal({
            title: "Successfull",
            icon: "success"
        })
    })

    return (
        <div>
            <h2 className="text-primary text-center">Admin Dashboard</h2>
            {
                toggle && 
                <>
                 <Modal open={toggle} okButtonProps={{disabled:true}} cancelButtonProps={{disabled:true}} width={1000}  >
                    <UserRegister {...edit} handleToggle={handleToggle} status="update"/>
                 </Modal>
                </>
            }
            <p className='fw-semibold text-primary'>Welcome Admin !!!</p>
            <button  className="print btn btn-primary" onClick={handlePrint} style={{position:'absolute', right:'10%', top:'120px'}}>Download</button>
            <div  ref={componentRef}> 
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>S.NO</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Image</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userDetails.map((ele, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{ele.name}</td>
                                    <td>{ele.mobile}</td>
                                    <td>{ele.email}</td>
                                    <td><img src={`http://localhost:4010/${ele.file}`} height='75' alt="data"/></td>
                                    <td><Popconfirm
                                        title="Sure to Edit?" 
                                        onConfirm={() => handleEdit(ele)}>
                                        <button className="btn btn-warning">Edit</button></Popconfirm></td>
                                    <td><Popconfirm
                                        title="Sure to Delete?" 
                                        onConfirm={() => handleDelete(ele._id)}>
                                        <button className="btn btn-danger">Delete</button></Popconfirm></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default AdminDashboard