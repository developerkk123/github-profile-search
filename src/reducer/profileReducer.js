import {GET_PROFILE_DATA} from '../constant'

const ProfileReducer = (state={}, action)=>{
    switch(action.type){
        case GET_PROFILE_DATA:
            return Object.assign({}, state, {profile: action.data});
        default:
            return state;
    }
}
export default ProfileReducer