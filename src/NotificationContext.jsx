/* eslint-disable react/prop-types */
import { useReducer, createContext, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "ANECDOTE_CREATED":
            return `Created the following anecdote: ${ action.payload }`
        case "ANECDOTE_VOTED":
            return `Anecdote "${ action.payload }" voted`
        case "SERVER_ERROR":
            return "too short anecdote, must have length 5 or more"
        case "NOTIFICATION_CLEAR":
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification,  notificationDispatch] = useReducer(notificationReducer, null)
    return (
        <NotificationContext.Provider value={[notification,  notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext