import axios from "axios";



class OrderAPI {
    async get() {
        const token = localStorage.getItem("JWT_Token");
        if(token) {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const orders = await axios.get('http://localhost:4000/api/orders', 
                {
                    headers: headers
                }
                );
                return {
                    status: true, 
                    data: orders.data
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

    async create(data) {
        const token = localStorage.getItem("JWT_Token");
        if(token) {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const response = await axios.post('http://localhost:4000/api/orders/create', data ,{ headers });
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
                const response = await axios.post(`http://localhost:4000/api/orders/delete/${data}`,{ 
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

    async update(data) {
        const token = localStorage.getItem("JWT_Token");
        if(token) {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const response = await axios.post(`http://localhost:4000/api/orders/update/${data._id}`,data ,{ 
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
        try {
            const response = await axios.get(`http://localhost:4000/api/orders/search/${target}?value=${value}`);
            console.log(response)
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


export default new OrderAPI();