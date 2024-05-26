import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from './anecdotes'

const App = () => {
  const queryClient = useQueryClient()

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
  }

  const res = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
    retry: 1,
    refetchOnWindowFocus: false
  })
  console.log(JSON.parse(JSON.stringify(res)))

  if (res.isError) {
    return <div>Anecdote service not available due to problems in server</div>
  } else if ( res.isLoading ) {
    return <div>loading data...</div>
  }


  const anecdotes = res.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm queryClient={queryClient} />
    
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
    </div>
  )
}

export default App
