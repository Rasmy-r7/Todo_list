import React, { useEffect, useRef, useState } from 'react';
import TodoItems from './TodoItems';
import Pagination from './Pagination';

const Todo = () => {
  const [error, setError] = useState("")
  useEffect(() => {
    const fetchToDo = async () => {
      try {
        const url = `https://dummyjson.com/todos`
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.todos); // Correctly access todos

      } catch (err) {
        setError("Error in connecting to API");
        console.error(err); // Log the actual error
      }
    };

    fetchToDo();
  }, []);

  const [todoList, setTodoList] = useState(
    localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [recordPerPage] = useState(8);

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecords = todoList.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(todoList.length / recordPerPage);


  const inputRef = useRef();
  const dateRef = useRef();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short' }; // Format as "16 Nov"
    return date.toLocaleDateString('en-GB', options);
  };

  const add = () => {
    const inputText = inputRef.current.value.trim();
    const priority = document.querySelector('select').value;
    const date = dateRef.current.value;

    if (inputText === '' || date === '') {
      alert('Please fill out both task and date.');
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      date: formatDate(date),
      isComplete: false,
      priority,
    };

    setTodoList((prev) => {
      const updatedList = [newTodo, ...prev]; 
      const newPageCount = Math.ceil(updatedList.length / recordPerPage);
      setCurrentPage(1); 
      return updatedList;
    });
    inputRef.current.value = '';
    dateRef.current.value = '';
  }; 

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white place-self-center w-full max-w-5xl flex flex-col p-4 min-h-[600px] rounded-xl">
      <div className="flex items-center mt-5 gap-2">
        <h1 className="text-lg font-semibold">Task</h1>
      </div>
      <div className="flex flex-col items-center my-4 bg-gray-200 rounded-lg p-4 space-y-3">
        <input
          ref={inputRef}
          className="bg-transparent border-none outline-none w-full h-10 px-4 placeholder:text-slate-600 rounded-md"
          type="text"
          placeholder="Add your task"
        />
        <div className=" flex flex-row gap-10  place-self-start">
          <input ref={dateRef} type="date" className="place-self-start fle h-10  px-4 rounded-md outline-none" />
          <select className=" h-10 text-slate-600 bg-white border-none rounded-md px-4 outline-none">
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <button
          onClick={add}
          className="border-none place-self-start rounded-lg bg-blue-500 w-1/4 h-10 text-white text-sm font-medium cursor-pointer">
          Add
        </button>
      </div>

      <div>
        {currentRecords.map((item, index) => (
          <TodoItems
            key={index}
            text={item.text}
            date={item.date}
            id={item.id}
            isComplete={item.isComplete}
            priority={item.priority}
            deleteTodo={deleteTodo}
            toggle={toggle}
          />
        ))}
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

    </div>
  );
};

export default Todo;
