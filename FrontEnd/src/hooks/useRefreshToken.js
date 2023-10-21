import axios from "../services/Customize-axios";
import useAuth from "./useAuth";

const useRefreshToken = () =>{
    const {setAuth} = useAuth();

    const refresh = async () =>{
        const response = await axios.get('/dj-rest-auth/token/refresh/', {
            withCredentials:true
        });
        setAuth(prev =>{
            console.log(JSON.stringify(prev));
            console.log(response.access);
            return {...prev, access:response.access}
        });
        return response.access;
    }

    return refresh;
}

export default useRefreshToken;