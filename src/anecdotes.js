import axios from "axios"

const baseUrl = 'http://localhost:3002/anecdotes'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

export default {
    getAll
}