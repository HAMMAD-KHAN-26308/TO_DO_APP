import React from "react";
import "./App.css";
import { useState } from "react";

function App() {
  const [lists, setlists] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  function handleAddOREditTask() {
    if (!text.trim()) return;

    if (editId) {
      const updatedList = lists.map((task) => {
        const matchedTask = task.id === editId;
        if (matchedTask) {
          return {
            ...task,
            text: text,
          };
        }
        return task;
      });
      setText("");
      setEditId(null);
      setlists(updatedList);
    } else {
      const newtTask = {
        id: Date.now(),
        text: text,
      };
      setlists([...lists, newtTask]);
      setText("");
    }
  }

  function handleDeleteItem(id) {
    const updatedList = lists.filter((task) => task.id !== id);
    setlists(updatedList);
  }

  function handleEditItem(task) {
    setText(task.text);
    setEditId(task.id);
  }

  return (
    <>
      <div>
        <h1>TO_DO_LIST</h1>
      </div>
      <div className="card">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="ENTER TEXT"
        ></input>
        <button onClick={handleAddOREditTask}>
          {editId ? "EDIT TASK" : "ADD TASK"}
        </button>

        <div className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th className="task">TASKS</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {lists.map((task, index) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td className="task">{task.text}</td>
                <td>
                  <button onClick={() => handleEditItem(task)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteItem(task.id)}>
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </div>
      </div>
    </>
  );
}
export default App;
