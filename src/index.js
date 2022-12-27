import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { taskChangeTitle, taskDeleteTitle, completeTask, getTasks, loadTasks, getTaskLoadingStatus, addTasks } from "./store/task"
import configureStore from './store/store';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { getError } from './store/errors';



const store = configureStore();

const App = (params) => {
  const state = useSelector(getTasks());// (state) => state.tasks.entities
  const isLoading = useSelector(getTaskLoadingStatus());//state) => state.tasks.isLoading
  const error = useSelector(getError())
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTasks())
  }, [])

  const changeTitle = (taskId) => {
    dispatch(taskChangeTitle(taskId))
  }
  const deleteTask = (taskId) => {
    dispatch(taskDeleteTitle(taskId));
  }
  if (isLoading) {
    <h1>...Loading</h1>
  }
  if (error) {
    return <h1>{error}</h1>
  }
  return (<><h1>App</h1>
    <ul>
      {state.map((el) => <li key={el.id}><p>{el.title}</p><p>{`Completed: ${el.completed}`}</p>
        <button onClick={() => dispatch(completeTask(el.id))}>Completed</button>
        <button onClick={() => changeTitle(el.id)}>Change Title</button>
        <button onClick={() => deleteTask(el.id)}>Delete</button><hr />
        <button onClick={() => dispatch(addTasks(state))}>Add</button><hr />
      </li>)}
    </ul>
  </>)
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


// const arr = [" some", " new", " data"];
  // function formatErray(el) {
  //   return el + " data";
  // };
  // function fn() {
  //   return "App"
  // }
  // function someFn(func) {
  //   return func();
  // }
//   function someFn() {
//     return function () {
//       return "App"
//     }
//   }
//   function fn(func) {
//     return func();
//   }
//   // const fn = someFn();

//   return <h1>{arr.map(formatErray)}</h1>
  // const x = 2;
  // const double = (number) => number * 2;
  // const square = (number) => number * number;
  // const half = (number) => number / 2;
  // const divide = (num2) => {
  //   return function (num1) {
  //     return num1 / num2;
  //   }
  // }
  // const mathCalculate = pipe(double, square, half, divide(3));
  // return <h1>{mathCalculate(x)}</h1>
    // return <h1>{half(square(double(x)))}</h1>