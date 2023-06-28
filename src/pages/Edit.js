
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../services/helper';

const Edit = () => {
    let navigate = useNavigate();
    const [singleTask, setSingleTask] = useState({})
    const [checked, setChecked] = useState(false)
    let params = useParams()
    useEffect(() => {
        fetch(`${BASE_URL}/api/tasks/` + params.id)
            .then(response => response.json())
            .then(data => {
                setSingleTask(data)
                setChecked(data.isCompleted)
            })
            .catch((err)=>console.log(err))
    }, [params.id])

    const handleEdit = () => {
        fetch(`${BASE_URL}/api/tasks/${singleTask._id}`, {
            method: 'PATCH',
            body: JSON.stringify(singleTask),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
            console.log(data)
            navigate(`/`)
            })
            .catch((err) => console.log(err))
            

    }

    const handleCheck = () => {
        setChecked(!checked)
        setSingleTask({
            ...singleTask,
            isCompleted: !checked
        })
    }



    return (
        <div className='container'>
            {console.log(singleTask,checked)}
            <div className="input_container">
                <h1 className="heading">
                    Edit Task
                </h1>
                <div className="id_container">
                    <p className='id_text'>Task Id</p>
                    <p className='left'>{singleTask._id}</p>
                </div>
                <div className="id_container">
                    <p className='id_text'>Name</p>
                    <input type="text"
                        value={singleTask.name}
                        className='left input_id'
                        onChange={(e) => setSingleTask({
                            ...singleTask,
                            name: e.target.value
                        })}
                    />
                </div>
                <div className="completed id_container">
                    <label className='id_text'>Completed</label>
                    <input type="checkbox"
                        className='check'
                        checked={checked}
                        onChange={handleCheck}
                    />
                </div>
                <button
                    onClick={handleEdit}
                    className='edit'>Edit</button>
            </div>
        </div>
    )
}

export default Edit