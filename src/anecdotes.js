import axios from "axios"

const baseUrl = 'http://localhost:3002/anecdotes'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const create = async (anecdoteObject) => {
    const res = await axios.post(baseUrl, anecdoteObject)
    return res.data
}

const edit = async (anecdoteObject) => {
    const updatedAnecdote = {...anecdoteObject, votes: anecdoteObject.votes + 1}
    const res = await axios.put(`${baseUrl}/${anecdoteObject.id}`, updatedAnecdote)
    return res.data
}

export default {
    getAll,
    create,
    edit
}