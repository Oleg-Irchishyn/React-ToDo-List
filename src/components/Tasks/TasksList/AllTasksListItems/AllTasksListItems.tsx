import React from 'react';
import cn from 'classnames';
import styles from '../../../../styles/components/Tasks.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppStateType } from '../../../../redux/store';
import { SingleTaskType } from '../../../../redux/types/types';
import closeImg from '../../../../assets/images/close.svg';
import editImg from '../../../../assets/images/edit.svg';
import { deleteTodoListTask, setNewTaskValue } from '../../../../redux/reducers/tasksReducer';
import { getPuresidebarListItems } from '../../../../redux/selectors/sidebarSelectors';
import { getAllTasks } from '../../../../redux/selectors/tasksSelectors';

type ownProps = {
  task: SingleTaskType;
};

const AllTasksListItems: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = React.memo(
  ({ task, allTasks, allSideBarLists, setNewTaskValue }) => {
    React.useEffect(() => {}, [allTasks, allSideBarLists]);
    const onDeleteTask = (id: string | number) => {
      if (window.confirm('Do you want to delete this task?')) {
        deleteTodoListTask(id);
      }
    };
    const onEditTaskValue = (id: string | number, text: string | number) => {
      const newTaskValue = window.prompt(`Task's Name`, (text = String(text)));
      if (newTaskValue) {
        setNewTaskValue(id, newTaskValue);
      }
    };
    return (
      <div className={cn(styles.tasks_list__items)}>
        <div className={cn(styles.item, styles.item_checkbox)}>
          <input id={`task - ${task.id}`} type="checkbox" />
          <label htmlFor={`task - ${task.id}`}></label>
          <input type="text" readOnly value={task.text} />
          <img
            src={closeImg}
            alt="delete task"
            className={cn(styles.delete_icon)}
            onClick={() => onDeleteTask(task.id)}
          />
          <img
            src={editImg}
            alt="edit task"
            className={cn(styles.edit_icon)}
            onClick={() => onEditTaskValue(task.id, task.text)}
          />
        </div>
      </div>
    );
  },
);

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  deleteTodoListTask: (id: string | number) => void;
  setNewTaskValue: (id: string | number, newVal: string | number) => void;
};

const mapStateToProps = (state: AppStateType) => ({
  allTasks: getAllTasks(state),
  allSideBarLists: getPuresidebarListItems(state),
});

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {
    deleteTodoListTask,
    setNewTaskValue,
  }),
)(AllTasksListItems);
