import { BsFillTrashFill } from "react-icons/bs";
import { ImCheckboxChecked } from "react-icons/im";
import styles from "./Main.module.css";
import { NoteContext } from "../../Context/NoteContext";
import { useContext } from "react";

function Main() {
  const { dispatch, state } = useContext(NoteContext);
  const handelDelete = (id) => {
    dispatch({ type: "delete-note", payload: id });
  };
  const handleCheck = (id) => {
    dispatch({ type: "check-note", payload: id });
  };

  return (
    <main className={styles.note__wrapper}>
      {state.map((item) => (
        <div key={item.id} className={styles.note__container}>
          <span className={styles.note__content}>{item.description}</span>
          <BsFillTrashFill onClick={() => handelDelete(item.id)} />
          <ImCheckboxChecked
            onClick={() => handleCheck(item.id)}
            className={styles.checked}
          />
        </div>
      ))}
    </main>
  );
}
export default Main;
