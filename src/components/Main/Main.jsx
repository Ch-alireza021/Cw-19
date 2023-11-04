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
          <div className={styles.note__content}>
            <span className={styles.note__description}>
              {item.description}{" "}
              {item.check && <div className={styles.note__checked}/>}
            </span>
          </div>
          <BsFillTrashFill onClick={() => handelDelete(item.id)} />
          <ImCheckboxChecked
            onClick={() => handleCheck(item.id)}
            className={styles.checked}
          />
          {item.check && <div>-</div>}
        </div>
      ))}
    </main>
  );
}
export default Main;
