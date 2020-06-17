import {
   FETCH_USER,
   UPDATE_USER,
} from "../../types/user";

export const fetchUserAction = () => ({
   type: FETCH_USER
})

export const updateUserAction = (userData) => ({
   type: UPDATE_USER,
   payload: userData
})
