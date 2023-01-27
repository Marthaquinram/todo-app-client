

const TodoDetails = ({ todo }) => {

  return (
    <div className='todo-details'>
      <h4>{todo.text}</h4>
      <p><strong>Completed: </strong>{todo.completed}</p>
      <p>{todo.createdAt}</p>
    </div>
  )
}
export default TodoDetails;
