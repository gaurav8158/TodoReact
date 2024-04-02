import React, { useState, useEffect } from "react";
import Cardbox from "./Cardbox";
import Formtodo from "./Formtodo";
import { useDispatch, useSelector } from "react-redux";
import { showTodo } from "./Redux/Todoslice";
import UpperBar from "./Upperbar.js";

const Todo = () => {
  const { todo, loading, searchTodo } = useSelector((state) => state.app);
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showTodo());
  }, [dispatch]);
  // console.log(todo);
 
    var completeTask =
      todo &&
      todo
        .filter((ele) => {
          if (searchTodo.length === 0) {
            return ele;
          } else {
            return ele.task.toLowerCase().includes(searchTodo.toLowerCase());
          }
        })
        .filter((str) => str.isComplete === "Completed");
    var notcompleteTask =
      todo &&
      todo
        .filter((ele) => {
          if (searchTodo.length === 0) {
            return ele;
          } else {
            return ele.task.toLowerCase().includes(searchTodo.toLowerCase());
          }
        })
        .filter((str) => str.isComplete === "Not Completed");
    var pendingTask =
      todo &&
      todo
        .filter((ele) => {
          if (searchTodo.length === 0) {
            return ele;
          } else {
            return ele.task.toLowerCase().includes(searchTodo.toLowerCase());
          }
        })
        .filter((str) => str.isComplete === "Pending");
 

  // console.log(completeTask, notcompleteTask, pendingTask);
 console.log("loading",loading)
 
  return (
    <div>
      <div className="todo-cover">
        <Formtodo />
      </div>
      {todo ? (
        <div className="todos">
          <div className="card-todo-part-up">
            <UpperBar status="Completed-Task" length={completeTask.length} />
            <div className="card-todo-part">
              {completeTask?.map((data) => {
                return (
                  <Cardbox
                    click={click}
                    setClick={setClick}
                    complete="Completed"
                    key={data.id}
                    id={data.id}
                    isComplete={data.isComplete}
                    task={data.task}
                    description={data.description}
                    date={data.date}
                  />
                );
              })}
            </div>
          </div>
          <div className="card-todo-part-up">
            <UpperBar
              status="InCompleted-Task"
              length={notcompleteTask.length}
            />
            <div className="card-todo-part">
              {notcompleteTask?.map((data) => {
                return (
                  <Cardbox
                    click={click}
                    setClick={setClick}
                    complete="Not-completed"
                    key={data.id}
                    id={data.id}
                    isComplete={data.isComplete}
                    task={data.task}
                    description={data.description}
                    date={data.date}
                  />
                );
              })}
            </div>
          </div>
          <div className="card-todo-part-up">
            <UpperBar status="Pending-Task" length={pendingTask.length} />
            <div className="card-todo-part">
              {pendingTask?.map((data) => {
                return (
                  <Cardbox
                    click={click}
                    setClick={setClick}
                    complete="Pending"
                    key={data.id}
                    id={data.id}
                    isComplete={data.isComplete}
                    task={data.task}
                    description={data.description}
                    date={data.date}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Todo;
