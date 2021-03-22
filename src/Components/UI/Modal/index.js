import classes from './Modal.module.css';

const Modal = ({children, isOpen}) => {

    const modalClasses = [classes.Modal];
    if (isOpen) {
        modalClasses.push(classes.Active);
    }
    return (
        <div role="dialog" className={modalClasses.join(' ')}>
            {children}
        </div>
    );
};

export default Modal;
