import React, { Fragment, useState, useEffect } from "react";
// import "bootstrap-icons/font/bootstrap-icons.css";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Col, Row, ListGroup, Button } from "react-bootstrap";
import {
  addTodoList,
  getTodoList,
  deleteTodoList,
} from "../../actions/todolist";
import { deleteTodoById } from "../../actions/todo";
import DeleteControl from "../modals/DeleteControl";
import AddControl from "../modals/AddControl";
import { FaRegTimesCircle, FaBars } from "react-icons/fa";
import useSound from "use-sound";
import addSound from "../../sounds/add.mp3";
import { CONTROL_MENU } from "../../actions/types";
import { useHistory } from "react-router";
import ReactTooltip from "react-tooltip";
import showNotice from "../../utils/showNotice";

const Sidebar = ({
  getTodoList,
  todolists,
  addTodoList,
  deleteTodoList,
  todo: { todos },
  deleteTodoById,
  isDropDownBtn,
}) => {
  useEffect(() => {
    getTodoList();
  }, []);

  let myDayId = todolists.filter((todolist) => todolist.title === "My Day")[0]
    ?._id;
  let history = useHistory();
  const [playAdd] = useSound(addSound);

  // For add todo list modal
  const [todoListId, setTodoListId] = useState("");
  const [showTodo, setShowTodo] = useState(false);
  const [title, setTitle] = useState("");
  const todoClose = () => setShowTodo(false);
  const todoShow = () => setShowTodo(true);

  const onChange = (e) => setTitle(e.target.value);

  const dispatch = useDispatch();

  const onClickAdd = async (e) => {
    if (title === "") {
      showNotice("🤔 Please enter a title for your list", "warn");
      return;
    }
    const id = await addTodoList({ title });
    playAdd();
    todoClose();
    setTitle("");
    history.push(`/todolist/${id}`);
  };

  // For delete control modal
  const [showcontrol, setShowControl] = useState(false);
  const controlShow = (id) => {
    setShowControl(true);
    setTodoListId(id);
  };
  const modalClose = () => {
    setShowControl(false);
    setTodoListId("");
  };

  const onClickDelete = (e) => {
    e.preventDefault();
    deleteTodoList(todoListId);
    history.push(`/todolist/${myDayId}`);
    const id = todos.filter((item) => item.todoList == todoListId);
    id.map((item) => deleteTodoById(item._id));
    modalClose();
  };
  const [shake, setShake] = useState(false);
  const onClickMenu = (e) => {
    e.preventDefault();
    dispatch({ type: CONTROL_MENU });
    setShake(true);
    setTimeout(() => setShake(false), 2000);
  };

  const onClickTodos = (e, id) => {
    e.preventDefault();
    history.push(`/todolist/${id}`);
    if (isDropDownBtn) {
      dispatch({ type: CONTROL_MENU });
    }
  };

  return (
    <>
      <div className={`drop-down`}>
        <Button onClick={onClickMenu} className="drop-down-button">
          <FaBars className="drop-down-item" />
        </Button>
      </div>

      <div
        className={`home ${isDropDownBtn ? "d-block" : null} ${
          shake ? "shake" : null
        }`}
      >
        <div className="overlay">
          <Row style={{ display: "block" }} className="position-home">
            <Col>
              <ListGroup variant="flush">
                {todolists &&
                  todolists.map((todolist) => (
                    <button
                      key={todolist._id}
                      id="button"
                      onClick={(e) => onClickTodos(e, todolist._id)}
                      className={`list-button ${
                        isDropDownBtn ? "d-flex p-2" : null
                      }`}
                    >
                      <p>{todolist.title}</p>
                      {todolist.title !== "My Day" &&
                        todolist.title !== "Important" && (
                          <>
                            <Button
                              data-tip
                              data-for="ddd"
                              onClick={() => controlShow(todolist._id)}
                              variant="light"
                              // className="float-right btn-sm delete-btn"
                              style={{
                                backgroundColor: "transparent",
                                borderColor: "transparent",
                                fontSize: 5,
                                padding: 0,
                              }}
                            >
                              <FaRegTimesCircle
                                className="delete-btn-item"
                                size={18}
                                color="#FF0033"
                              />
                            </Button>
                            <ReactTooltip
                              id="ddd"
                              textColor="#fff"
                              className="tooltip-delete"
                              backgroundColor="#f7737359"
                              effect="solid"
                            >
                              <span>Delete</span>
                            </ReactTooltip>
                          </>
                        )}
                    </button>
                  ))}
                <button
                  id="button"
                  className={`list-button ${isDropDownBtn ? "d-block" : null}`}
                  style={{ backgroundColor: "pink", color: "black" }}
                  onClick={todoShow}
                  variant="light"
                >
                  New Todo List +
                </button>
              </ListGroup>
            </Col>
            <AddControl
              onChange={onChange}
              todoClose={todoClose}
              onClickAdd={onClickAdd}
              showTodo={showTodo}
              name="title"
            />
            <DeleteControl
              showcontrol={showcontrol}
              onClickDelete={onClickDelete}
              modalClose={modalClose}
              name="title"
            />
          </Row>
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  addTodoList: PropTypes.func.isRequired,
  getTodoList: PropTypes.func.isRequired,
  deleteTodoList: PropTypes.func.isRequired,
  deleteTodoById: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired,
  todolists: PropTypes.array.isRequired,
  isDropDownBtn: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  todolists: state.todolist.todolists.filter(
    (item) => item.user == state.auth.user?._id
  ),
  todo: state.todo,
  isDropDownBtn: state.todolist.isDropDownBtn,
});

export default connect(mapStateToProps, {
  addTodoList,
  getTodoList,
  deleteTodoList,
  deleteTodoById,
})(Sidebar);
