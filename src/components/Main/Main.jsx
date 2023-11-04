import { BsFillTrashFill } from "react-icons/bs";
import { ImCheckboxChecked } from "react-icons/im";
import styles from "./Main.module.css";
import { NoteContext } from "../../Context/NoteContext";
import { useContext, useState } from "react";
import DeleteModal from "../Modal/DeleteModal";
import { createPortal } from "react-dom";

function Main() {
  const { dispatch, state } = useContext(NoteContext);
  const modalDiv=document.getElementById("modal");
  const [modalDelete,setModalDelete]=useState(false)
  const handelDelete = (id) => {
    setModalDelete(id);
  };
  function isDelete(isTrue){
    if(isTrue){
      dispatch({ type: "delete-note", payload: modalDelete })
    }
    setModalDelete(false);
  }
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
          <BsFillTrashFill className={styles.note__btn} onClick={() => handelDelete(item.id)} />
          <ImCheckboxChecked
            onClick={() => handleCheck(item.id)}
            className={item.check ? styles.checkedTrue : styles.checkedFalse}
          />
          {modalDelete && createPortal(<DeleteModal isDelete={isDelete}/> ,modalDiv) }
        </div>
      ))}
    </main>
  );
}
export default Main;
