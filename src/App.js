import { useState, useReducer } from "react";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { NoteContext } from "./Context/NoteContext";

let countReducer = 0;
function App() {
  const saveInLocal = JSON.parse(localStorage.getItem("toDoList")) || [];
  const [toDos, setToDos] = useState(saveInLocal);
  const [filter, setFilter] = useState("All");
  const [state, dispatch] = useReducer(noteReducer, toDos);

  function returnDataToShow(data,filterValue=filter){
    switch (filterValue) {
      case "Done":
        setFilter("Done");
        return data.filter((note) => note.check === true);
      case "Undone":
        setFilter("Undone");
        return data.filter((note) => note.check === false);
      case "All":
        setFilter("All");
        return data;
      default:
        break;
      }
  }
  // function noteReducer
  function noteReducer(state, action) {
    countReducer++;
    switch (action.type) {
      //////////////////////
      case "add-note":
        const newData = [...toDos, action.payload];
        setToDos(newData);
        localStorage.setItem("toDoList", JSON.stringify(newData));
        const newAddeDataShow=returnDataToShow(newData)
        return newAddeDataShow;
      //////////////////////
      case "filter-note": {
        const filterValue = action.payload;
        const newFilterDataShow=returnDataToShow(toDos,filterValue)
        return newFilterDataShow;
      }
      //////////////////////
      case "delete-note":
        const result = toDos.filter((note) => note.id !== action.payload);
        setToDos(result);
        localStorage.setItem("toDoList", JSON.stringify(result));
        const newDeleteDataShow=returnDataToShow(result)
        return newDeleteDataShow;
      //////////////////////
      case "check-note": {
        const data = [...toDos];
        const noteFindIndex = data.findIndex(
          (note) => note.id === action.payload
        );
        const note = data[noteFindIndex];
        if (countReducer % 2 !== 0) {
          note.check = note.check ? false : true;
        }
        data[noteFindIndex] = note;
        setToDos(data);
        localStorage.setItem("toDoList", JSON.stringify(data));
        const newCheckDataShow=returnDataToShow(data)
        return newCheckDataShow;
      }

      default:
        break;
    }
  }

  return (
    <div className={styles.app_container}>
      <NoteContext.Provider value={{ state, dispatch }}>
        <Header />
        <Main />{" "}
      </NoteContext.Provider>
    </div>
  );
}

export default App;
