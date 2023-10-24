import axios from "axios";



class AuthAPI {
    async checkPermissionRole() {
        const token = localStorage.getItem("JWT_Token");
        if(token) {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const response = await axios.get('http://localhost:4000/api/auth/role', { headers });
                return {
                    status: true, 
                    data: response.data
                }
            }
            catch(error) {
                return {
                    status: false, 
                    data:   {}
                }
            }
        }
        else {
            return {
                status: false, 
                data:   {}
            }
        }
    }
}


export default new AuthAPI();