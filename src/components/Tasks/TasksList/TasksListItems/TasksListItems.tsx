import React from 'react';
import cn from 'classnames';
import styles from '../../../../styles/components/Tasks.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppStateType } from '../../../../redux/store';
import { SingleTaskType } from '../../../../redux/types/types';
import closeImg from '../../../../assets/images/close.svg';
import { deleteTodoListTask, getListsTasks } from '../../../../redux/reducers/tasksReducer';
import { getSidebarLists } from '../../../../redux/reducers/sidebarReducer';

type ownProps = {
  task: SingleTaskType;
};

const TasksListItems: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = ({
  task,
  deleteTodoListTask,
}) => {
  const onDeleteTask = (id: string | number) => {
    if (window.confirm('Do you want to delete this task?')) {
      deleteTodoListTask(id);
      getListsTasks();
      getSidebarLists();
    }
  };
  return (
    <div className={cn(styles.tasks_list__items)}>
      <div className={cn(styles.item, styles.item_checkbox)}>
        <input id={`task - ${task.id}`} type="checkbox" />
        <label htmlFor={`task - ${task.id}`}></label>
        <input type="text" value={task.text} />
        <img
          src={closeImg}
          alt="delete task"
          className={cn(styles.delete_icon)}
          onClick={() => onDeleteTask(task.id)}
        />
      </div>
    </div>
  );
};

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  deleteTodoListTask: (id: string | number) => void;
  getListsTasks: () => void;
  getSidebarLists: () => void;
};

const mapStateToProps = (state: AppStateType) => ({});

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {
    deleteTodoListTask,
    getListsTasks,
    getSidebarLists,
  }),
)(TasksListItems);
