import {GET_PROFILE_DATA} from '../constant'

export function getProfile(data){
    console.log(data)
    return{
        type: GET_PROFILE_DATA,data
    }
}