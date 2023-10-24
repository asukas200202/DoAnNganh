import axios from "axios";



class ProductAPI {
    async get(option) {
        try {
            const products = await axios.get('http://localhost:4000/api/products', 
            {
                params: {
                  category: option.category,
                  teacherId: option.teacherId,
                  userId: option.userId
                }
            }
            );
            return {
                status: true, 
                data: products.data
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

    async create(data) {
        const token = localStorage.getItem("JWT_Token");
        if(token) {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const response = await axios.post('http://localhost:4000/api/products/create', data ,{ headers });
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
                const response = await axios.post(`http://localhost:4000/api/products/delete/${data}`,{ 
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
                const response = await axios.post(`http://localhost:4000/api/products/update/${data._id}`,data ,{ 
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
            const response = await axios.get(`http://localhost:4000/api/products/search/${target}?value=${value}`);
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


export default new ProductAPI();