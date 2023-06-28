import React from 'react'
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../services/helper';


const Card = ({ task, getAllTasks }) => {
    let navigate = useNavigate();

    const handleDelete = async () => {
        await fetch(`${BASE_URL}/api/tasks/` + task._id, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => console.log(data))
        getAllTasks()
    }

    const handleEdit = () => {
        navigate(`/${task._id}`);
    }

    return (
        <div className='card'>
            <div className="text_container">
                <p className={task.isCompleted ? 'card_text underline' : 'card_text'}>{task.name}</p>
            </div>
            <div className="icons">
                <FaEdit
                    onClick={handleEdit}
                    className='icon' />
                <AiOutlineDelete
                    onClick={handleDelete}
                    className='icon' />
            </div>

        </div>
    )
}

export default Card