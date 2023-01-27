import { useTodosContext } from '../hooks/useTodoContext';

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const TodoDetails = ({ todo }) => {
  const { dispatch } = useTodosContext()

  const handleClick = async () => {
    const response = await fetch('http://localhost:3080/api/todos/' + todo._id, {
      method: 'DELETE'
    })
    const json = await response.json()


    if (response.ok) {
      dispatch({ type: 'DELETE_TODO', payload: json })
    }
  }

  return (
    <div className='todo-details'>
      <h4>{todo.text}</h4>
      <p><strong>Completed: </strong>{todo.completed}</p>
      <p>{formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}</p>
      <span className='material-symbols-outlined' onClick={handleClick}>Delete</span>
    </div>
  )
}
export default TodoDetails;
