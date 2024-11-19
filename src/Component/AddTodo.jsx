import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link, useSearchParams } from 'react-router-dom';
import BaseUrl from '../BaseUrl';

const AddTodo = () => {
    const navigate = useNavigate();
    
    const [message, setMessage] = useState()

    const [searchParams, setSearchParams] = useSearchParams()
    
    const [user, setUser] = useState({
        todo_name: "",
        todo_desc: "",
    })

    useEffect(() => {
        FetchData();
    }, [])

    const FetchData = () => {
        axios.get(BaseUrl + `edit/${searchParams.get('userId')}`)
            .then(res => {
                if (res.data.status) {
                    console.log(res.data.data);
                    setUser(res.data.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }


    const handleChange = (e)=>{
            const name = e.target.name
            const value = e.target.value
            setUser({ ...user, [name]: value })
    }

    const submitHandle = (e) => {
        e.preventDefault();

        if (user.user_id) {
            axios.put(BaseUrl +  `update/${user.user_id}`, user).then(
                res => {
                    if (res.data.status) {
                        setMessage(res.data.message);
                    }
                    navigate("/viewtodo");
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            axios.post(BaseUrl + "create", user).then(
                res => {
                    if (res.data.status) {
                        setMessage(res.data.message);
                    }
                    navigate("/viewtodo");
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }







    return (
        <div className=" flex items-center justify-center h-screen">
            <div className=" text-white p-8 rounded shadow w-full max-w-md">

                <h2 className="text-3xl text-white text-center font-bold mb-6 ">Add Todo</h2>
                <p>{message}</p>
                <form method="POST" className="space-y-4" >
                    <div>
                        <label htmlFor="todo_name" className="block text-white text-xl font-bold">Todo_Name</label>
                        <input type="text" id="todo_name" name="todo_name"  value={user.todo_name} className="mt-1 text-black block w-full p-2 rounded-md shadow-sm" placeholder='Enter your todo_name' onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="todo_desc" className="block text-xl font-bold text-white">Todo_Desc</label>
                        <input type="text" id="todo_desc" name="todo_desc" value={user.todo_desc} className="mt-1 text-black  w-full p-2 rounded-md shadow-sm " placeholder='Enter your todo_desc' onChange={handleChange} />
                    </div><br />
                    <button type="submit" name='submit' onClick={submitHandle} className="w-full bg-gray-500 text-white text-2xl font-bold py-2 px-4 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Submit</button>

                    <Link to="/viewtodo" className="w-full bg-gray-500 text-white text-2xl font-bold py-2 px-4 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">View Todo</Link>
                </form>

            </div>
        </div>
    );
};

export default AddTodo