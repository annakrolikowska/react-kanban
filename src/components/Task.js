import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { faArrowDownLong } from '@fortawesome/free-solid-svg-icons'
import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons'


function Task(props) {

    const task = props.item
    const {title, user} = task
    const {moveTask, moveBackTask, removeTask} = props

    return (
        <div className='task'>
            <button onClick={() =>  removeTask(task)} className='task__delete'>X</button>
            <h3>{title}</h3>
            <p>User: {user}</p>
            {task.columnId!==1 && <button onClick={() => moveBackTask(task)} className='button__left btn_desktop button' > {<FontAwesomeIcon icon={faArrowLeftLong}/>} </button> }
            {task.columnId!==4 && <button onClick={() => moveTask(task)} className='button__right btn_desktop button' > {<FontAwesomeIcon icon={faArrowRightLong}/>} </button> }
            {task.columnId!==1 && <button onClick={() => moveBackTask(task)} className='button__left btn_mobile button' > {<FontAwesomeIcon icon={faArrowUpLong}/>} </button> }
            {task.columnId!==4 && <button onClick={() => moveTask(task)} className='button__right btn_mobile button' > {<FontAwesomeIcon icon={faArrowDownLong}/>} </button> }
        </div>
    )
}

export default Task

Task.propTypes = {
    item: PropTypes.object,
    moveTask: PropTypes.func,
    moveBackTask: PropTypes.func,
    removeTask: PropTypes.func
}
