import React from 'react';
import cn from 'classnames';
import styles from '../../../../styles/components/TasksForm.module.scss';

const TasksForm: React.FC = () => {
  const [visibleForm, setVisibleForm] = React.useState(false);
  const toggleVisibleForm = () => {
    setVisibleForm(!visibleForm);
    console.log(visibleForm);
  };

  const formRef = React.useRef<HTMLDivElement>(null);

  const handleFormOutsideClick = React.useCallback((e: any) => {
    const path = e.path || (e.composedPath && e.composedPath());
    if (!path.includes(formRef.current)) {
      setVisibleForm(false);
    }
  }, []);

  React.useEffect(() => {
    document.body.addEventListener('click', handleFormOutsideClick);
    return () => {
      document.body.removeEventListener('click', handleFormOutsideClick);
    };
  }, [handleFormOutsideClick]);

  return (
    <div className={cn(styles.tasks__form)} ref={formRef}>
      {!visibleForm ? (
        <div className={cn(styles.tasks__form_new)} onClick={toggleVisibleForm}>
          <i className={cn(styles.add_icon)}></i>
          <span>New Task</span>
        </div>
      ) : (
        <div className={cn(styles.tasks__form_blok)}></div>
      )}
    </div>
  );
};

export default TasksForm;
