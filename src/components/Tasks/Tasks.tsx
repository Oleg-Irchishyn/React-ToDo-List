import React from 'react';
import cn from 'classnames';
import styles from '../../styles/components/Tasks.module.scss';
import { TasksList } from '../';

const Tasks: React.FC = () => {
  return (
    <div className={cn(styles.todo__tasks)}>
      <TasksList />
    </div>
  );
};

export default Tasks;
