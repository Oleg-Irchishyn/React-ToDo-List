import React from 'react';
import cn from 'classnames';
import styles from '../../../../styles/components/Tasks.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppStateType } from '../../../../redux/store';
import { SingleTaskType } from '../../../../redux/types/types';
import closeImg from '../../../../assets/images/close.svg';
import editImg from '../../../../assets/images/edit.svg';
import {
  deleteTodoListTask,
  setNewTaskValue,
  toggleTaskCompletion,
} from '../../../../redux/reducers/tasksReducer';
import { actions } from '../../../../redux/reducers/sidebarReducer';
import { getPuresidebarListItems } from '../../../../redux/selectors/sidebarSelectors';
import { getAllTasks } from '../../../../redux/selectors/tasksSelectors';

type ownProps = {
  task: SingleTaskType;
};

const TasksListItems: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = React.memo(
  ({
    task,
    deleteTodoListTask,
    setNewTaskValue,
    toggleTaskCompletion,
    changeActiveListTaskValue,
    deleteActiveListTask,
  }) => {
    let [completion, setCompletion] = React.useState(!task.completed);

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

    const handleToggleTaskCompletion = React.useCallback(
      (id: string | number, listId: string | number | null, completion: boolean) => {
        setCompletion(!completion);
        console.log(completion);
        toggleTaskCompletion(id, listId, completion);
      },
      [],
    );
    return (
      <div className={cn(styles.tasks_list__items)}>
        <div className={cn(styles.item, styles.item_checkbox)}>
          <input
            id={`task - ${task.id}`}
            type="checkbox"
            checked={!completion}
            onChange={() => handleToggleTaskCompletion(task.id, task.listId, completion)}
          />
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
  toggleTaskCompletion: (
    id: string | number,
    listId: string | number | null,
    completed: boolean,
  ) => void;
  changeActiveListTaskValue: (id: string | number, text: string | number) => void;
  deleteActiveListTask: (id: string | number) => void;
};

const mapStateToProps = (state: AppStateType) => ({
  allTasks: getAllTasks(state),
  allSideBarLists: getPuresidebarListItems(state),
});

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {
    deleteTodoListTask,
    setNewTaskValue,
    toggleTaskCompletion,
    changeActiveListTaskValue: actions.changeActiveListTaskValue,
    deleteActiveListTask: actions.deleteActiveListTask,
  }),
)(TasksListItems);
