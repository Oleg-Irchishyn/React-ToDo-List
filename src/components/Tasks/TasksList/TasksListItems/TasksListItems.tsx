import React from 'react';
import cn from 'classnames';
import styles from '../../../../styles/components/Tasks.module.scss';

const TasksListItems: React.FC = () => {
  return (
    <div className={cn(styles.tasks_list__items)}>
      <div className={cn(styles.item, styles.item_checkbox)}>
        <input id="check" type="checkbox" />
        <label htmlFor="check"></label>
        <input type="text" value="Learn JavaScript" />
      </div>
    </div>
  );
};

export default TasksListItems;
