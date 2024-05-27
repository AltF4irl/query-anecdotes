import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import anecdoteService from './anecdotes'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const queryClient = useQueryClient()

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

  return (
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm queryClient={queryClient} />
        <AnecdoteList queryClient={queryClient} />
      </div>
    
  )
}

export default App
