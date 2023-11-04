import styles from "./Header.module.css";
import { NoteContext } from "../../Context/NoteContext";
import { useContext, useRef } from "react";
function Header() {
  const { dispatch } = useContext(NoteContext);
  const inputRef = useRef("");
  
  const handlesubmit = () => {
    const newNote = {
      id: new Date().getTime(),
      description: inputRef.current.value,
      check: false,
    };
    if(inputRef.current.value.length > 4){
      dispatch({ type: "add-note", payload: newNote });
      inputRef.current.value=""
    }

  };
  const handleFilter = (e) => {
    dispatch({ type: "filter-note", payload: e.target.value });
  };



  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>tasks</h1>
      <div className={styles.header__inputs__section}>
        <div className={styles.header__add}>
          <input
            // onChange={handleInputChange}
            ref={inputRef}
            className={styles.header__add__input}
            type="text"
            name="input-task"
          />
          <button onClick={handlesubmit} className={styles.header__add__button}>
            +
          </button>
        </div>
        <select onChange={handleFilter} className={styles.header__filter}>
          <option value="All">All</option>
          <option value="Done">Done</option>
          <option value="Undone">Undone</option>
        </select>
      </div>
    </header>
  );
}
export default Header;
