import apiConfig from "./config";

async function signup(inputData) {
   const response = await apiConfig.post ('./users/signup', inputData);

    const {
         token, 
         data:{ user },
     } = response.data.token

    return{
        token,
        user,
    }
}


async function signup(inputData) {
    const response = await apiConfig.post ('./users/login', inputData);
 
     const {
          token, 
          data:{ user },
      } = response.data.token
 
     return{
         token,
         user,
     }
 }
 
 export authApi = {
    signin,
    signup,
    
 }