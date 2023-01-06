import React, {useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux'
import { startUserProfile } from "../../action/userAction"
import '../../css/profile.css'

const UserProfile = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startUserProfile())
    }, [dispatch])
    
    const userProfile = useSelector((state) => {
        return state.user
    })

    return (
        <div className='profile'>
            {
                Object.keys(userProfile).length > 0 && (
                    <div>
                        <h2 className="text-primary">User Profile</h2>
                        <p className='fw-semibold'>Name : {userProfile.name}</p>
                        <p className='fw-semibold'>Mobile : {userProfile.mobile}</p>
                        <p className='fw-semibold'>Email : {userProfile.email}</p>
                        <p className='fw-semibold'>Country : {userProfile.country}</p>
                        <p className='fw-semibold'>State : {userProfile.state}</p>
                        <p className='fw-semibold'>City : {userProfile.city}</p>
                        <p className='fw-semibold'>Description : {userProfile.description}</p>
                    </div>
                )
            }
        </div>
    )
}

export default UserProfile