/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query"
import anecdoteService from '../anecdotes'
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteList = ({queryClient}) => {
    const anecdotes = queryClient.getQueryData(['anecdotes'])
    const [notification, notificationDispatch] = useContext(NotificationContext)

    const updateAnecdoteMutation = useMutation({
        mutationFn: anecdoteService.edit,
        onSuccess: (updatedAnecdote) => {
          const anecs = queryClient.getQueryData(['anecdotes'])
          queryClient.setQueryData(['anecdotes'], anecs.map(anec => anec.id === updatedAnecdote.id ? updatedAnecdote : anec))
        }
    })
    
      const handleVote = (anecdote) => {
        console.log(anecdote)
        updateAnecdoteMutation.mutate(anecdote)
        notificationDispatch({
          type: "ANECDOTE_VOTED",
          payload: anecdote.content
        })
        setTimeout(() => {
          notificationDispatch({ type: "NOTIFICATION_CLEAR" })
        }, 5000)
    }
    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList