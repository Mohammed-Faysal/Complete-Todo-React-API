export const taskReducer = (state, action) => {

    switch(action.type){
      case 'setTodos':{
        return {
            ...state, 
            list: action.payload, 
            catchVal: ""
        }
      }
      case 'catchVal': {
        return {
          ...state, 
          catchVal: action.payload
        }
      }
      case 'addTodo': {
        return {
            ...state, 
            list: [...state.list, action.payload], 
            catchVal: ""
        }
      }
      case 'editTodo': {
        return{
            ...state, 
            catchVal: action.payload.text, 
            editTodo: action.payload, 
            isEdit: true
        }
      }
      case 'updateTodo': {
        return{
            ...state, 
            list: state.list.map((todo) => todo.id === action.payload.id ? action.payload : todo),
            catchVal: "", 
            isEdit: false, 
            editTodo: null
        }
      }
      case 'changeStatusTodo':{
        return{
            ...state, 
            list: state.list.map((todo) => todo.id === action.payload.id ? action.payload : todo),
        }
      }
      case 'deleteTodo': {
        return {
            ...state, 
            list: state.list.filter((todo)=> todo.id !== action.payload)
        }
      }
      case 'filter': {
        return {
            ...state, 
            filter: action.payload
        }
      }
      default: {
        return state
      }
    }
}