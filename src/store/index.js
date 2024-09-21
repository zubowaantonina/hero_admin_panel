
import { configureStore } from "@reduxjs/toolkit";

import heroes from "../components/heroesList/heroesSlice";
import filters from "../components/heroesFilters/filtersSlice";


// enhancer может дополнять любую ф-цию store
// middelware дополняет только dispatch

// const enhancer =
//   (createStore) =>
//   (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//       if (typeof action === "string") {
//         return oldDispatch({
//           type: action,
//         });
//       }
//       return oldDispatch(action);
//     };
//     return store;
//   };

// указанные аргументы ф-ций идут по умолчанию, но мы их можем не указывать, раскрывать как объекты или переименовывать
// const stribgMiddelware = (store) => (dispatch) => (action) => {
// т.е. в первой ф-ции не указан аргумент store, во второй переименован аргумент dispatch
const stribgMiddelware = () => (next) => (action) => {
     if (typeof action === "string") {
          return next({
               type: action,
          });
     }
     return next(action);
};

// thunk - это middelware, кот позволяет dispatch-чить ф-ции, в том числе и асинхронные ф-ции!!!

// const store = createStore(
//   combineReducers({ heroes, filters }),
//   compose(
//     applyMiddleware(thunk, stribgMiddelware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );


const store = configureStore({
     reducer: { heroes, filters },
     middleware: (getDefaultMiddelware) =>
       getDefaultMiddelware().concat(stribgMiddelware),
     devTools: process.env.NODE_ENV !== "production",
   });

export default store;