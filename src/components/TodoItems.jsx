import React from 'react';
import delete_icon from '../assets/delete.png';
import bell from '../assets/bell.png';

const TodoItems = ({ text, date, id, isComplete, priority, deleteTodo, toggle }) => {
  const bellColor = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-blue-500',
  }[priority];

  const statusColor = isComplete ? 'text-green-500' : 'text-yellow-500';

  return (
    <div className="bg-gray-200 rounded-lg p-4 mb-3">
      <div className="flex items-center gap-3">
        <div onClick={() => toggle(id)} className="flex-1 flex items-center cursor-pointer">
          <img className={`w-7 p-1 rounded-md ${bellColor}`} src={bell} alt="bell icon" />
          <p className="text-black ml-4 text-[17px]">{text}</p>
        </div>
        <p className={`text-lg font-semibold bg-gray-300 rounded-lg pl-2 pr-2 ${statusColor}`}>
          {isComplete ? 'Done' : 'In-Progress'}
        </p>
        <div className=" text-sm  text-black">{date}</div>
        <img
          onClick={() => deleteTodo(id)}
          src={delete_icon}
          alt="delete icon"
          className="w-4 h-4 cursor-pointer"
        />
      </div>


      <div className="mt-2 flex items-center gap-4">
        {!isComplete && (
          <button
            onClick={() => toggle(id)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
          >
            Mark as Done
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItems;
