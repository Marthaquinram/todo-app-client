import { useState } from "react"
import { useTodosContext } from '../hooks/useTodoContext';


const TodoForm = () => {
  // create state for each of the different properties of the todo
  const { dispatch } = useTodosContext();

  const [text, setText] = useState('')
  const [completed, setCompleted] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const todo = { text, completed }

    //fetch request to POST new data
    const response = await fetch('http://localhost:3080/api/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setText('')
      setCompleted('')
      dispatch({ type: 'CREATE_TODOS', payload: json })
    }
  }


  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3> Add a ToDo Task</h3>

      <label>ToDo:</label>
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        className={emptyFields.includes('text') ? 'error' : ''}
      />

      <label>Completed:</label>
      <input
        type="text"
        onChange={(e) => setCompleted(e.target.value)}
        value={completed}
        className={emptyFields.includes('completed') ? 'error' : ''}
      />

      <button>Add ToDo</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}
export default TodoForm;
