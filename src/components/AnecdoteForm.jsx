/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../anecdotes'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = ({ queryClient }) => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  
  const newAnecdoteMutation = useMutation({ 
    mutationFn: anecdoteService.create,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
    notificationDispatch({
      type: "ANECDOTE_CREATED",
      payload: content
    })
    setTimeout(() => {
      notificationDispatch({ type: "NOTIFICATION_CLEAR" })
    }, 5000)
    console.log('new anecdote')
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
