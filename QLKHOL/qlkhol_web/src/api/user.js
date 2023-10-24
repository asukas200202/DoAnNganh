import axios from "axios";



class UserAPI {
    async get(option) {
        const token = localStorage.getItem("JWT_Token");
        if(token) {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const users = await axios.get('http://localhost:4000/api/users', 
                {
                    params: {
                      role: option.role
                    },
                    headers: headers
                }
               
                );
                return {
                    status: true, 
                    data: users.data
                }
            }
            catch(e) {
                return {
                    status: false, 
                    data: [],
                    message: "Have error " + e
                }
            }
        }   
    }

    async update(data) {
        const token = localStorage.getItem("JWT_Token");
        if(token) {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const response = await axios.post(`http://localhost:4000/api/users/update/${data._id}`,data ,{ 
                    headers
                });
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
    }

    async delete(data) {
        const token = localStorage.getItem("JWT_Token");
        if(token) {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const response = await axios.post(`http://localhost:4000/api/users/delete/${data}`,{ 
                    headers
                });
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
    }

    async search(target, value) {
        console.log("target", target)
        console.log("value", value)
        try {
            const response = await axios.get(`http://localhost:4000/api/users/search/${target}?value=${value}`);
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

}


export default new UserAPI();