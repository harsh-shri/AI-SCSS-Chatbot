import axios from "axios"

export const loginUser = async (email: string, password:string)=>{
    const res = await axios.post('/user/signin',{ email,password })
    if(res.status!==200){
        throw new Error('unable to process your request');        
    }
    return  await res.data;;
}
export const checkAuthStatus = async()=>{
    const res = await axios.get('/user/auth-status')
    if(res.status !== 200) {
      throw new Error("failed to authenticate")
    }
    return await res.data;
}
export const logoutUser =  async () => {}
export const signupUser = async ()=>{}