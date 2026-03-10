import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [lists, setLists] = useState(() => {
    const savedTasks = localStorage.getItem("TODOFINAL");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("TODOFINAL", JSON.stringify(lists));
  }, [lists]);

  function handleAddItem() {
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
      setLists(updatedList);
    } else {
      const newTask = {
        id: Date.now(),
        text: text,
        completed: false,
      };
      setLists([...lists, newTask]);
      setText("");
    }
  }

  function handleDeleteItem(id) {
    const updatedList = lists.filter((task) => task.id !== id);
    setLists(updatedList);
  }

  function handleEditItem(task) {
    setText(task.text);
    setEditId(task.id);
  }

  function handleToggleComplete(id) {
    const updatedList = lists.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    setLists(updatedList);
  }

  return (
    <>
      <div className="card">
        <h1>TO DO LIST</h1>
        <div className="card_body">
          <div className="input">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="ENTER TASK HERE"
            ></input>
            <button onClick={handleAddItem}>
              {editId ? "EDIT TASK " : "ADD ITEM"}
            </button>
          </div>

          <div className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th className="task">TASK</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {lists.map((task, index) => (
                <tr key={task.id}>
                  <td>{index+1}</td>
                  <td
                    className="task"
                    onClick={() => handleToggleComplete(task.id)}
                    style={{
                      textDecoration: task.completed
                        ? "line-through red"
                        : "none",
                      color: task.completed ? "gray" : "white",
                      cursor: "pointer",
                    }}
                  >
                    {task.text}
                  </td>
                  <td>
                    <button onClick={() => handleEditItem(task)}>EDIT</button>
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
      </div>
    </>
  );
}

export default App;
