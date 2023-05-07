import axios from 'axios';

export const uploadFileApiCall = async(file) => {
    try{
        const formData = new FormData();
        formData.append("myfile" , file);
        const res = await axios.post(`https://file-share-rest-api.vercel.app/api/files`,
        formData
        )
        console.log(res);
        return res;
    }
    catch(error){
        return error;
    }
}
export const sendEmailApiCall = async(uuid , fromEmail , toEmail) =>{
    try{
        const res = await axios.post(`https://file-share-rest-api.vercel.app/api/files/send`,
        {
            uuid : uuid,
            emailTo : toEmail,
            emailFrom : fromEmail
        }
        )
        console.log(res);
        return res;
    }
    catch(error){
        return error;
    }
}
export const getDownloadDeltailsApiCall = async(uuid) =>{
    try{
        const res = await axios.get(`https://file-share-rest-api.vercel.app/api/show/${uuid}`);
        console.log(res);
        return res;
    }
    catch(error){
        return error;
    }
}
