import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { BASE_URL } from '../services/helper'

const Home = () => {
    const [tasks, setTasks] = useState([])
    const [singleTask, setSingleTask] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        getAllTasks()
    }, [])

    const getAllTasks = () => {
        setLoading(true)
        fetch(`${BASE_URL}/api/tasks`)
            .then(response => response.json())
            .then(data => setTasks(data))
            .then(() => setLoading(false))
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setMessage('')
            const res = await fetch(`${BASE_URL}/api/tasks`, {
                method: 'POST',
                body: JSON.stringify({
                    name: singleTask
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            const data = await res.json()
            if (data.message) {
                setMessage(data.message)
                setError(true)
            }
            else {
                setMessage("Success, Task Added")
                setError(false)
            }
            setSingleTask('')
            getAllTasks()
        } catch (error) {
            console.log(error)
        }





    }



    return (
        <div className="container">
            <div className="input_container">
                <h1 className='heading'>Task Manager</h1>
                <form className="sub_container">
                    <input
                        type="text"
                        className='input'
                        placeholder='e.g Wash dishes'
                        value={singleTask}
                        onChange={e => setSingleTask(e.target.value)}
                    />
                    <button
                        className='btn'
                        type='submit'
                        onClick={(e) => handleSubmit(e)}
                    >Submit</button>
                </form>
                <div className="text">
                    <p className={error ? 'error' : 'success'}>{message}</p>
                </div>
            </div>
            <div className="card_container">
                {
                    loading && <h1 className='loading'>Loading.......</h1>
                }
                {
                    !loading && tasks.map((data, index) => <Card key={index} task={data} getAllTasks={getAllTasks} />)
                }
            </div>
        </div>
    )
}

export default Home