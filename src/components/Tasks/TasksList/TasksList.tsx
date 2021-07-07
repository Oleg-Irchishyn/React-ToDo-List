import React from 'react';
import cn from 'classnames';
import styles from '../../../styles/components/Tasks.module.scss';
import editIcon from '../../../assets/images/edit.svg';
import { TasksListItems, TasksForm } from '../../index';
import { AppStateType } from '../../../redux/store';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getsidebarListItems } from '../../../redux/selectors/sidebarSelectors';
import { itemsType, SingleTaskType } from '../../../redux/types/types';
import { setNewSidebarListName } from '../../../redux/reducers/sidebarReducer';

type ownProps = {
  task: SingleTaskType;
  activeListItem: itemsType;
};

const TasksList: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = React.memo(
  ({ lists, activeListItem, setNewSidebarListName }) => {
    const editActiveTaskName = (id: string | number, name: string) => {
      const newActiveListName = window.prompt(
        `Lists's Name`,
        (name = String(activeListItem && activeListItem.name)),
      );
      if (newActiveListName) {
        setNewSidebarListName(id, newActiveListName);
      }
    };
    return (
      <React.Fragment>
        {activeListItem && (
          <div className={cn(styles.todo__tasks_list)}>
            <div className={cn(styles.list_title_wrapper)}>
              <h2 style={{ color: activeListItem.color }} className={cn(styles.list_title)}>
                {activeListItem && activeListItem.name}
              </h2>
              <img
                src={editIcon}
                alt="edit"
                onClick={() => editActiveTaskName(activeListItem.id, activeListItem.name)}
              />
            </div>

            {activeListItem && activeListItem.tasks && activeListItem.tasks.length <= 0 && (
              <h2 className={cn(styles.list_title_hollow)}>No tasks :(</h2>
            )}

            {activeListItem && activeListItem.tasks === undefined && (
              <h2 className={cn(styles.list_title_hollow)}>No tasks :(</h2>
            )}

            {lists &&
              activeListItem &&
              activeListItem.tasks &&
              activeListItem.tasks.map((task) => (
                // @ts-ignore
                <TasksListItems key={task.id} task={task} />
              ))}
            {<TasksForm />}
          </div>
        )}
      </React.Fragment>
    );
  },
);

const mapStateToProps = (state: AppStateType) => ({
  lists: getsidebarListItems(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  setNewSidebarListName: (id: string | number, name: string) => void;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {
    setNewSidebarListName,
  }),
)(TasksList);
