import axios from "axios";



class LessionAPI {
    async get() {
       
    }

    async detail(id) {
     
    }

    async create(data) {
        const token = localStorage.getItem("JWT_Token");
        if(token) {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const response = await axios.post('http://localhost:4000/api/lessions/create', data ,{ headers });
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
       
    }

    async update(data) {
      
    }

    async search(target, value) {
       
    }
}


export default new LessionAPI();