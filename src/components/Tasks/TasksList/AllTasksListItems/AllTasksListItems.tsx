import React from 'react';
import cn from 'classnames';
import styles from '../../../../styles/components/Tasks.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppStateType } from '../../../../redux/store';
import { SingleTaskType } from '../../../../redux/types/types';
import closeImg from '../../../../assets/images/close.svg';
import { deleteTodoListTask } from '../../../../redux/reducers/tasksReducer';
import { getPuresidebarListItems } from '../../../../redux/selectors/sidebarSelectors';
import { getAllTasks } from '../../../../redux/selectors/tasksSelectors';

type ownProps = {
  task: SingleTaskType;
};

const AllTasksListItems: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = React.memo(
  ({ task, allTasks, allSideBarLists }) => {
    React.useEffect(() => {}, [allTasks, allSideBarLists]);
    const onDeleteTask = (id: string | number) => {
      if (window.confirm('Do you want to delete this task?')) {
        deleteTodoListTask(id);
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
  },
);

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  deleteTodoListTask: (id: string | number) => void;
};

const mapStateToProps = (state: AppStateType) => ({
  allTasks: getAllTasks(state),
  allSideBarLists: getPuresidebarListItems(state),
});

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {
    deleteTodoListTask,
  }),
)(AllTasksListItems);
