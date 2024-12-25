import { providerVal } from "../Context/TodoContext";

const AddUpdtForm = () => {
    const {inputVal, onCatchVal, onSubmitHandler, editStatus} = providerVal()
    return (
        <form onSubmit={onSubmitHandler} className="w-full flex flex-wrap items-center gap-2">
            <input 
                type="text" 
                placeholder="Write Your Todo Here..." 
                value={inputVal}
                className="flex-1 min-w-0 bg-gray-100 p-2 pl-3 rounded-md shadow-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={onCatchVal}
            />
            <button className="bg-blue-500 p-2 px-4 rounded-md text-white shadow-xl">{editStatus ? 'Update Todo' : 'Add Todo'}</button>
        </form>
    );
};

export default AddUpdtForm;