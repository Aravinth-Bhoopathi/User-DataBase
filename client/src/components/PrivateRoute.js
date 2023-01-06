import {Redirect, Route} from 'react-router-dom'

const PrivateRoute = ({component : Component, ...rest}) => {
  return (
    <Route 
        {...rest}
        render={(props) => {
            return localStorage.getItem('UserToken') ? (
                <Component {...props} /> 
            ) : (
                <Redirect 
                    to={{
                        pathname : "/home"
                    }}
                />
            )
        }}
    />
  )
}

export default PrivateRoute