import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = ({ anecdoteMutation }) => {
  const dispatch = useNotificationDispatch()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    anecdoteMutation.mutate({ content, votes: 0 }, {
      onError: (error) => {
        dispatch({type: 'SET_NOTIFICATION', payload: error.response.data.error})
        setTimeout(() => {
          dispatch({type: 'CLEAR'})
        }, 5000);
      },
      onSuccess: () => {
        dispatch({type: 'SET_NOTIFICATION', payload: `you created: ${content}`})
        setTimeout(() => {
          dispatch({type: 'CLEAR'})
        }, 5000);
      }
    })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
