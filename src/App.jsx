import './App.css'
import AddUpdtForm from './Component/AddUpdtForm';
import Status from './Component/Status';
import Todos from './Component/Todos';
import TodoContext from './Context/TodoContext';

function App() {

  return (
    <div className="p-4 w-[600px] bg-white rounded-lg shadow-lg">
      <TodoContext>
        <AddUpdtForm/>
        <Status/>
        <Todos/>
      </TodoContext>
    </div>
  )
}

export default App
