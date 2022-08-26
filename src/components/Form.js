import React, {useReducer} from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

function Form (props) {
    
    const init = {taskTitle:'', user:''}

    const reducer = (state, action) => {
        switch(action.type) {
        case 'reset':
            return init;
        case 'change':
            /*eslint-disable */
            const {name, value} = action.element;
            /*eslint-enable */
            return {...state, [name]:value};
        default:
            return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, init)
    const {taskTitle, user} = state
   
    const {getNewTask} = props

    const formValidation = errors => {

        if(taskTitle.length < 2) errors.push('Task name is required')
        if(user.length < 2) errors.push('User name is required')
    }

    const addTask = e => {
        e.preventDefault()

        const newTask = {
            id: uuid(),
            title: taskTitle,
            user: user,
            columnId: 1,
        }
        const errors=[]
        formValidation(errors)

        if(errors.length === 0) {
            getNewTask(newTask)
            dispatch({type:'reset'})
        } else {
            alert(errors.join(",\n "))
        }
    }

    return (
        <form className='form' onSubmit={addTask}>
            <div className='form__container'>
                <label> <input name='taskTitle' value={taskTitle} type='text' onChange={e => dispatch({type: 'change', element: e.target})} placeholder='task title...' required/></label>
                <label> <input name='user'  value={user} type='text' onChange={e => dispatch({type: 'change', element: e.target})}  placeholder='user name...' required pattern= '^[a-zA-Z –-]+$'/></label>
                <input type="submit" value="add" className='form__submit' />
            </div>
        </form>
    )
}

Form.propTypes = {
    getNewTask: PropTypes.func
}

export default Form