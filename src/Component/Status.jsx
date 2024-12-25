import React from 'react';
import { providerVal } from '../Context/TodoContext';
const Status = () => {
    const {onFilterTodos} = providerVal()
    return (
        <div className="flex items-center gap-3 mt-6">
            <button className="p-1 px-2 bg-blue-400 rounded-sm text-white shadow-xl" onClick={()=> onFilterTodos('all')}>All Todo</button>
            <button className="p-1 px-2 bg-green-500 rounded-sm text-white shadow-xl" onClick={()=> onFilterTodos('completed')}>Completed</button>
            <button className="p-1 px-2 bg-red-400 rounded-sm text-white shadow-xl" onClick={()=> onFilterTodos('pending')}>Pending</button>
        </div>
    );
};

export default Status;