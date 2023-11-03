import { useState, useReducer } from "react";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

import { NoteContext } from "./Context/NoteContext";
function App() {
  // const defaultNote = [
  //   { id: 1, description: "note done", check: true },
  //   { id: 2, description: "sadfkjbd", check: false },
  // ];
  // const [note, setNote] = useState(defaultNote);
  const saveInBackEnde = JSON.parse(localStorage.getItem("toDoList")) || [];
  const [toDos, setToDos] = useState(saveInBackEnde);
  const [state, dispatch] = useReducer(noteReducer, toDos);
  function noteReducer(state, action) {
    switch (action.type) {
      case "add-note":
        const newData = [...toDos, action.payload];
        setToDos(newData);
        localStorage.setItem("toDoList", JSON.stringify(newData));
        return newData;
      case "filter-note":
        console.log(action.payload);
        {
          const filterValue = action.payload;
          if (filterValue === "Done") {
            const result = toDos.filter((note) => note.check === true);
            return result;
          } else if (filterValue === "Undone") {
            const result = toDos.filter((note) => note.check === false);
            return result;
          } else if (filterValue === "All") {
            return toDos;
          } else if (filterValue === "delete-note") {
            return toDos;
          }
        }
        break;
      case "delete-note":
        const result = toDos.filter((note) => note.id !== action.payload);
        setToDos(result);
        localStorage.setItem("toDoList", JSON.stringify(result));
        return result;
      case "check-note": {
        const data=[...toDos]
        const noteFindIndex = data.findIndex((note) => (note.id === action.payload));
        const note=data[noteFindIndex]
        // console.log(noteFindIndex);
        // console.log(data[noteFindIndex].check);
        // const isCheck=data[noteFindIndex].check ? false :  true;
        // console.log(isCheck);
        // note.check = true
        console.log(note.check);
        if( note.check===true){
          note.check=false
        }else{
          note.check=true
        }
        console.log(note);
        data[noteFindIndex]=note
        console.log(data);

        setToDos(data);
        localStorage.setItem("toDoList", JSON.stringify(data));
        return data;
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
