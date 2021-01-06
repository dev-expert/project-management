import axios from 'axios';
import { CREATE_COMMENT,GET_COMMENTS } from '../config/actionNames';
import { api } from '../config/env';
import { toast } from 'react-toastify';
const PATH = `${api}api/comments`;

export const getComments = async (params) => {
  console.log(params)
    try {
     const response = await axios.get(`${PATH}`, { params })
     if(response.status == 200) {
        return response;
     }else{
         throw new Error('');
     }
    } catch (error) {
      throw new Error('');
    }
    // return dispatch => {
    //     axios
    //         .get(`${PATH}`, { params })
    //         .then(response => {
    //             dispatch({ type: GET_COMMENTS, payload: response.data });
    //         })
    //         .catch(err => {
    //         });
    // };
}

export const addComment = async (payload) =>  {
    try {
      const response =  await axios.post(`${PATH}`, payload);
    if(response.status == 200) {
        return response;
     }else{
         throw new Error('');
     }
    } catch (error) {

    }
            // .then(response => {
            //     dispatch({ type: CREATE_COMMENT, payload: response.data });
            //     toast.success('Comment Added Successfully')
            // })
            // .catch(err => {
            // });
}


export const updateComment = (id,payload) =>  {
    try {
    const response = axios.put(`${PATH}/${id}`, payload)
      if(response.status == 200) {
        return response;
     }else{
         throw new Error('');
     }
    } catch (error) {

    }
            // .then(response => {
            //     dispatch({ type: CREATE_COMMENT, payload: response.data });
            //     toast.success('Comment Added Successfully')
            // })
            // .catch(err => {
            // });
}
