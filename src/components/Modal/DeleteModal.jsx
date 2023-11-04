import styles from "./DeleteModal.module.css"

 const DeleteModal=({isDelete})=>{
    return(
        <div className={styles.modal__container}>
            <div className={styles.modal__wrapper}>
            <span>  Delete this task?</span>
            <div className={styles.modal__btn__div}>
                <button onClick={()=>isDelete(true)} className={styles.modal__btn__confirm}>Yes</button>
                <button onClick={()=>isDelete(false)} className={styles.modal__btn__reject}>No</button>
            </div>
            </div>
        </div>
    )
}
export default DeleteModal;