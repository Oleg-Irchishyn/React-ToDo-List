import React from 'react';
import cn from 'classnames';
import styles from '../../../../styles/components/TasksForm.module.scss';

const TasksForm: React.FC = () => {
  const [visibleForm, setVisibleForm] = React.useState(false);
  const toggleVisibleForm = () => {
    setVisibleForm(!visibleForm);
    console.log(visibleForm);
  };
  return (
    <div className={cn(styles.tasks__form)}>
      {!visibleForm ? (
        <div className={cn(styles.tasks__form_new)} onClick={toggleVisibleForm}>
          <i className={cn(styles.add_icon)}></i>
          <span>New Task</span>
        </div>
      ) : (
        <div className={cn(styles.tasks__form_blok)}>yo</div>
      )}
    </div>
  );
};

export default TasksForm;
