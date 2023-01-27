import { useEffect } from "react";
import { useTodosContext } from '../hooks/useTodoContext';
//components
import TodoDetails from '../components/TodoDetails';
import TodoForm from '../components/TodoForm';


//this will fire the function when the component is first renders
const Home = () => {
  const { todos, dispatch } = useTodosContext()

  useEffect(() => {
    const fetchToDo = async () => {
      const response = await fetch('http://localhost:3080/api/todos')
      //this passes the json object. and array of objects
      const json = await response.json();


      if (response.ok) {
        dispatch({ type: 'SET_TODOS', payload: json })
      }
    }


    fetchToDo()
  }, [dispatch])




  return (
    <div className="home">
      <div className="todos">
        {todos && todos.map((todo) => (
          <TodoDetails key={todo._id} todo={todo} />
        ))}
      </div>
      <TodoForm />
    </div>
  )
}

export default Home;
