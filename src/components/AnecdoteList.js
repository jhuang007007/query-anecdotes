import { useNotificationDispatch } from "../NotificationContext"

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
      </div>
      <button onClick={handleClick}>vote</button>
    </div>
  )
}

const AnecdoteList = ({ anecdotes, updateAnecdote }) => {
  const dispatch = useNotificationDispatch()

  const voteAnecdote = (anecdote) => {
    updateAnecdote.mutate({...anecdote, votes: anecdote.votes + 1})
    dispatch({type: 'NEW', payload: `you voted for: ${anecdote.content}`})
    setTimeout(() => {
      dispatch({type: 'CLEAR'})
    }, 5000);
  }

  return(
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            voteAnecdote(anecdote)
            }
          }
        />
      )}
    </div>
    
  )
}

export default AnecdoteList