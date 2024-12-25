import React from 'react';
import { providerVal } from '../Context/TodoContext';

const Todos = () => {

    const {todos, onDeleteHandler, onEditHandler, onStatusChangeHander, filter} = providerVal()

    const filterLable = filter === 'completed' ? 'Completed Task' : filter === 'pending' ? 'Pending Task' : 'All Task'
    const filterText = filter === 'completed' ? <p className="text-center font-semibold text-white p-3 rounded-lg border bg-green-500">No Completed Task Available</p> 
    : filter === 'pending' ? <p className="text-center font-semibold text-white p-3 rounded-lg border bg-red-400">No Pending Task Available</p> 
    : <p className="text-center font-semibold text-white p-3 rounded-lg border bg-blue-400">No Task Available</p>

    return (
        <div>
            <ul className="mt-6 w-full text-left flex flex-col gap-4">
                {
                    todos && 
                    todos.length > 0 ? todos.map((todo) => (
                        <li key={todo.id} className="flex items-center justify-between shadow-sm p-2 bg-gray-100 rounded-lg border">
                            <div className='flex'>
                                <input type='checkbox' className='mr-2' onChange={()=> onStatusChangeHander(todo)} checked={todo.completed}/>
                                <span className={todo.completed ? "line-through decoration-2" : ""}>{todo.text}</span>
                            </div>  
                            <div className='flex gap-2 ml-2'>
                                <button className="p-1 px-2 bg-blue-400 rounded-sm text-white shadow-xl" onClick={()=>onEditHandler(todo)}>Edit</button>
                                <button className="p-1 px-2 bg-red-400 rounded-sm text-white shadow-xl" onClick={()=>onDeleteHandler(todo.id)}>Delete</button>
                            </div>
                        </li>
                    )) : filterText
                }
            </ul>

            <p className="mt-3 text-left font-semibold"> 
                {filterLable}: {todos.length}
            </p>
        </div>
    );
};

export default Todos;