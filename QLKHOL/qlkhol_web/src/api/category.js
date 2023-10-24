import axios from "axios";



class CategoryAPI {
    async get() {
        try {
            const categories = await axios.get('http://localhost:4000/api/categories');

            return {
                status: true, 
                data: categories.data
            }
        }
        catch(e) {
            return {
                status: true, 
                data: {},
                message: "Have error " + e
            }
        }
    }

    async detail(id) {
        try {
            const categories = await axios.get(`http://localhost:4000/api/categories/detail/${id}`);
            console.log(categories)
            return {
                status: true, 
                data: categories.data
            }
        }
        catch(e) {
            return {
                status: true, 
                data: {},
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
                const response = await axios.post('http://localhost:4000/api/categories/create', data ,{ headers });
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
                const response = await axios.post(`http://localhost:4000/api/categories/delete/${data}`,{ 
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
                const response = await axios.post(`http://localhost:4000/api/categories/update/${data._id}`,data ,{ 
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
            const response = await axios.get(`http://localhost:4000/api/categories/search/${target}?value=${value}`);
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


export default new CategoryAPI();