import axios from 'axios';

const useFetchApi = () => {

    const url = 'http://localhost:3000/todos'

    const getTodos = async (filterStatus) => {
        const response = await axios.get(`${url}?${filterStatus}`)
        return response.data
    }
    
    const postTodo = async (newTodo) => {
        // const response = await axios.post(url, newTodo)
        // return response.data
        await axios.post(url, newTodo)
    }

    const putTodo = async (id, updateTodo) => {
        const response = await axios.put(`${url}/${id}`, updateTodo)
        return response.data
    }

    const deleteTodo = async (id) => {
        await axios.delete(`${url}/${id}`)
    }

    return {getTodos, postTodo, putTodo, deleteTodo};
};

export default useFetchApi;