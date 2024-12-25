import { createContext, useContext, useEffect, useReducer } from "react";
import { taskReducer } from './../reducer/todoReducer';
import useFetchApi from "../CustomHook/useFetchApi";

const newCtx = createContext()

const initialVal = {
    catchVal: "", 
    list: [], 
    isEdit: false, 
    editTodo: null,
    filter: 'all' 
}

const TodoContext = ({children}) => {

    const [todoList, dispatch] = useReducer(taskReducer, initialVal)

    const {getTodos, postTodo, putTodo, deleteTodo} = useFetchApi()

    const filterStatus = () => {
        if(todoList.filter === "completed"){
            return "completed=true"
        } else if(todoList.filter === "pending"){
            return "completed=false"
        } else{
            return ""
        }
    }

    useEffect(()=> {
        const fetchTodos = async ()=> {
            const data = await getTodos(filterStatus())
            dispatch({
                type: 'setTodos', 
                payload: data
            })
        }
        fetchTodos()
    }, [todoList.filter])

    const handleCatchVal = (e) => {
        dispatch({
            type: 'catchVal',
            payload: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(todoList.catchVal.trim() === ""){
            return alert('Write a Todo')
        }

        if(todoList.editTodo){
            const updatedTodo = {
                ...todoList.editTodo, 
                text: todoList.catchVal
            }
            const updatedData = await putTodo(todoList.editTodo.id, updatedTodo)
            dispatch({
                type: 'updateTodo',
                payload: updatedData 
            })
        } else{
            const newTodo = {
                // id: Date.now() + '', // "1123412412"
                id: Date.now(), 
                text: todoList.catchVal, 
                completed: false,
            }
            // const addTodo = await postTodo(newTodo)
            await postTodo(newTodo)

            const updatedTodos = await getTodos(filterStatus());

            dispatch({
                type: 'setTodos',
                payload: updatedTodos,
            });
            // dispatch({
            //     type: 'addTodo', 
            //     payload: addTodo
            // })
        }
    }

    const editHandler = (todo) => {
        dispatch({
            type: 'editTodo', 
            payload: todo
        })
    }

    const statusChangeHander = async (todo) => {
        const updatedTodo = {
            ...todo, 
            completed: !todo.completed
        }
        // const updatedData = await putTodo(todo.id, updatedTodo)
        // dispatch({
        //     type: 'changeStatusTodo', 
        //     payload: updatedData
        // })

        // Update the backend
        await putTodo(todo.id, updatedTodo);

        // Re-fetch the list in case of filter mismatch
        const updatedTodos = await getTodos(filterStatus());
        dispatch({
            type: 'setTodos',
            payload: updatedTodos,
        });
    }

    const deleteHandler = async (id) => {
        if(confirm('Ary you sure to delete!')){
            await deleteTodo(id)
            dispatch({
                type: 'deleteTodo', 
                payload: id
            })
        }
    }

    const filterTodos = (filterStatus) => {
        dispatch({
            type: 'filter', 
            payload: filterStatus
        })
    }

    const necessaryVal = {
        todoList, 
        dispatch, 
        inputVal: todoList.catchVal,
        todos: todoList.list,
        editStatus: todoList.isEdit,
        filter: todoList.filter,
        onCatchVal: handleCatchVal,
        onSubmitHandler: handleSubmit,
        onDeleteHandler: deleteHandler, 
        onEditHandler: editHandler,
        onStatusChangeHander: statusChangeHander,
        onFilterTodos: filterTodos
    }

    return (
        <newCtx.Provider value={necessaryVal}>
            {children}
        </newCtx.Provider>
    );
};

export default TodoContext;


export const providerVal = () => {
    return useContext(newCtx)
}