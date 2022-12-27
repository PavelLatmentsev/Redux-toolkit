import { createAction, createSlice } from '@reduxjs/toolkit'
import { setError } from './errors';
import todosService from './services/todos.service';

const initialState = { entities: [], isLoading: true };//error: null

const taskSlice = createSlice({
    name: "task", initialState, reducers: {
        recived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        update(state, action) {
            const elementIndex = state.entities.findIndex((el) => el.id === action.payload.id);
            state.entities[elementIndex] = { ...state.entities[elementIndex], ...action.payload };
        },
        remove(state, action) {
            state.entities = state.entities.filter(
                (el) => el.id !== action.payload.id
            );
        },
        taskRequested(state, action) {
            state.isLoading = true;
        },
        taskRequestFailed(state, action) {
            // state.error = action.payload
            state.isLoading = false;
        },
        addNewTask(state, action) {
            state.entities.push(action.payload)
        }
    }
})

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, recived, taskRequested, taskRequestFailed, addNewTask } = actions;

export const addTasks = (state) => async (dispatch) => {
    console.log(state)
    const newIndex = Math.floor(Math.random() * state.length + 1)
    const newElementIndex = state.findIndex((el) => el.id === newIndex);
    const payload = state[newElementIndex];
    console.log(payload)

    try {
        const data = await todosService.postData(payload)
        console.log(data)
        dispatch(addNewTask(data))
    } catch (error) {
        dispatch(setError(error.message))
    }
}
export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.fetch();
        console.log(data)
        dispatch(recived(data))
    } catch (error) {
        dispatch(taskRequestFailed())//error.message
        dispatch(setError(error.message))
    }
}

export const completeTask = (id) => (dispatch, getState) => {
    dispatch(update({ id, completed: true }));
}

export function taskChangeTitle(id) {
    return update({ id, title: `New Title for ${id}` });
}
export function taskDeleteTitle(id) {
    return remove({ id })
};
export const getTasks = () => (state) => state.tasks.entities

export const getTaskLoadingStatus = () => (state) => state.tasks.isLoading

export default taskReducer;


// const taskReducer = createReducer(initialState, (builder) => {
//     builder.addCase(update, (state, action) => {
//         const elementIndex = state.findIndex((el) => el.id === action.payload.id);
//         state[elementIndex] = { ...state[elementIndex], ...action.payload, };
//     }).addCase(remove, (state, action) => {
//         return state.filter((el) => el.id !== action.payload.id);
//     })
// });
