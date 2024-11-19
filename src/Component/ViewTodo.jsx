import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../BaseUrl';
import { useNavigate } from 'react-router';

const ViewTodo = () => {
    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getTodo();
    }, []);

    const getTodo = () => {
        axios.get( BaseUrl + "read")
            .then(res => {
                if (res.data.status) {
                    setTodos(res.data.data);
                } else {
                    console.error(res.data.message);
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    const editTodo = (id) => {
        navigate(`/?userId=${id}`)
    };

    const deleteTodo = (id) => {
        axios.delete( BaseUrl + `delete/${id}`)
            .then(res => {
                if (res.data.status) {
                    setMessage(res.data.message);
                    setTodos(todos.filter(todo => todo.id !== id));
                    getTodo();
                } else {
                    setMessage(res.data.message);
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-white p-8 rounded shadow w-full max-w-md">
                <h2 className="text-3xl text-white text-center font-bold mb-6">View Todos</h2>
                <p>{message}</p>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">S/N</th>
                            <th className="px-4 py-2">Todo</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Delete</th>
                            <th className="px-4 py-2">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{todo.todo_name}</td>
                                <td className="border px-4 py-2">{todo.todo_desc}</td>
                                <td className="border px-4 py-2">
                                    <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => editTodo(todo.user_id)}>Edit</button>
                                </td>
                                <td>
                                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteTodo(todo.user_id)}>Delete</button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewTodo;
