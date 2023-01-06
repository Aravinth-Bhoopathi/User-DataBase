const initialState = []

const adminReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_USER' : {
            return [...action.payload]
        }
        case 'DELETE_USER' : {
            return state.filter((ele) => {
                return ele._id !== action.payload._id
            })
        }
        case 'UPDATE_USER' : {
            return state.map((ele)=>{
                if(ele._id === action.payload._id){
                    return {...ele,...action.payload}
                }
                else{
                    return {...ele}
                }
             })
        }
        default : {
            return [...state]
        }
    }
}

export default adminReducer