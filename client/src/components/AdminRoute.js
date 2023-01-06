import {Redirect, Route} from 'react-router-dom'

const AdminRoute = ({component : Component, ...rest}) => {
  return (
    <Route 
        {...rest}
        render={(props) => {
            return localStorage.getItem('AdminToken') ? (
                <Component {...props} /> 
            ) : (
                <Redirect 
                    to={{
                        pathname : "/admin/login"
                    }}
                />
            )
        }}
    />
  )
}

export default AdminRoute