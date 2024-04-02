import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showTodo } from "./Redux/Todoslice";

import { useSelector } from "react-redux";
import Editform from "./Editform";
import Deletepopup from "./Deletepopup";

const Cardbox = ({click, setClick, id, task, isComplete, complete, description, date }) => {
 // console.log(id, task, isComplete, complete, description, date);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(showTodo());
  }, []);

  return (
    <div className="card-box-all" key={id}>
      <div className="task-details">
        <div>
          <span className={complete}>{complete}</span>
        </div>
        <div>
        <h2>{task}</h2>
        <div>
          <span style={{ color: "InfoText " }}>description: </span>
          <span style={{ fontWeight: "300" }}>{description}</span>
        </div>
        </div> 
      </div>
      <div className="task-date">
        <span>{date}</span>
      </div>
      <div className="delete-edit">
        <Editform id={id} task={task} isComplete={isComplete} /> 
        <Deletepopup click={click}
                setClick={setClick} setShow={setShow} id={id} />
      </div>
    </div>
  );
};

export default Cardbox;
