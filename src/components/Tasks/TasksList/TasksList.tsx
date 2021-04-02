import React from 'react';
import cn from 'classnames';
import styles from '../../../styles/components/Tasks.module.scss';
import editIcon from '../../../assets/images/edit.svg';
import { TasksListItems } from '../../index';

const TasksList: React.FC = () => {
  return (
    <div className={cn(styles.todo__tasks_list)}>
      <div className={cn(styles.list_title_wrapper)}>
        <h2 className={cn(styles.list_title)}>Front-end</h2>
        <img src={editIcon} alt="edit image" />
      </div>
      <TasksListItems />
    </div>
  );
};

export default TasksList;
