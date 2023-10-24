import axios from "axios";



class UploadAPI {
    async upload(file) {
        const token = localStorage.getItem("JWT_Token");
        if(token) {
            const formData = new FormData();
            formData.append('file', file);
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const response = await axios.post(`http://localhost:4000/api/file/upload/`, formData, { headers });
                console.log(response)
                return {
                    status: true, 
                    data: response.data
                }
            }
            catch(error) {
                return {
                    status: false, 
                    data: {}
                }
            }
        }
    }

    async uploadVideo(file) {
        const token = localStorage.getItem("JWT_Token");
        if(token) {
            const formData = new FormData();
            formData.append('file', file);
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const response = await axios.post(`http://localhost:4000/api/file/upload/video`, formData, { headers });
                return {
                    status: true, 
                    data: response.data
                }
            }
            catch(error) {
                return {
                    status: false, 
                    data: {}
                }
            }
        }
    }

    async delete(id) {
        const token = localStorage.getItem("JWT_Token");
        if(token) {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            try {
                const response = await axios.post(`http://localhost:4000/api/image/delete/${id}`, { headers });
                return {
                    status: true, 
                    data: response.data
                }
            }
            catch(error) {
                return {
                    status: false, 
                    data: {}
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
                const response = await axios.post(`http://localhost:4000/api/uses/update/${data._id}`,data ,{ 
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
}


export default new UploadAPI();