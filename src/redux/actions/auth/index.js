import {REGISTER} from "../../types/auth";

export const registerAction = (data) => ({
   type: REGISTER,
   payload: data
})
