import React from 'react';
import cn from 'classnames';
import styles from '../../../styles/components/Tasks.module.scss';
import { TasksListItems } from '../../index';
import { AppStateType } from '../../../redux/store';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { itemsType } from '../../../redux/types/types';
import { getListsTasks } from '../../../redux/reducers/tasksReducer';

type ownProps = {
  list: itemsType;
};

const AllTasksLists: React.FC<MapDispatchPropsType & ownProps> = ({ list, getListsTasks }) => {
  React.useEffect(() => {
    getListsTasks();
  }, [getListsTasks]);
  return (
    <React.Fragment>
      {list && (
        <div className={cn(styles.todo__tasks_list)}>
          <div className={cn(styles.list_title_wrapper)}>
            <h2 className={cn(styles.list_title)}>{list && list.name}</h2>
          </div>
          {!list ||
            !list.tasks ||
            (list.tasks.length <= 0 && (
              <h2 className={cn(styles.list_title_hollow)}>No tasks :(</h2>
            ))}

          {list &&
            list.tasks &&
            list.tasks.map((task) => (
              // @ts-ignore
              <TasksListItems key={task.id} task={task} />
            ))}
        </div>
      )}
    </React.Fragment>
  );
};

type MapDispatchPropsType = {
  getListsTasks: () => void;
};

export default compose<React.ComponentType>(
  connect<{}, MapDispatchPropsType, ownProps, AppStateType>(null, {
    getListsTasks,
  }),
)(AllTasksLists);
