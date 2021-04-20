import React from 'react';
import cn from 'classnames';
import styles from '../../../styles/components/Tasks.module.scss';
import editIcon from '../../../assets/images/edit.svg';
import { TasksListItems } from '../../index';
import { AppStateType } from '../../../redux/store';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  getActiveSidebarList,
  getsidebarListItems,
} from '../../../redux/selectors/sidebarSelectors';
import { SingleTaskType } from '../../../redux/types/types';

import { actions } from '../../../redux/reducers/sidebarReducer';

type ownProps = {
  task: SingleTaskType;
};

const TasksList: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = ({
  lists,
  activeListItem,
  changeSidebarListName,
}) => {
  const editActiveTaskName = (id: string | number, name: string) => {
    const newActiveListName = window.prompt(
      `Lists's Name`,
      (name = String(activeListItem && activeListItem.name)),
    );
    if (newActiveListName) {
      changeSidebarListName(id, newActiveListName);
    }
  };
  return (
    <React.Fragment>
      {activeListItem && (
        <div className={cn(styles.todo__tasks_list)}>
          <div className={cn(styles.list_title_wrapper)}>
            {activeListItem && activeListItem.tasks && activeListItem.tasks.length <= 0 ? (
              <h2 className={cn(styles.list_title_hollow)}>No tasks</h2>
            ) : (
              <h2 className={cn(styles.list_title)}>{activeListItem && activeListItem.name}</h2>
            )}
            {activeListItem && activeListItem.tasks && activeListItem.tasks.length > 0 && (
              <img
                src={editIcon}
                alt="edit"
                onClick={() => editActiveTaskName(activeListItem.id, activeListItem.name)}
              />
            )}
          </div>
          {lists &&
            activeListItem &&
            activeListItem.tasks &&
            activeListItem.tasks.map((task) => (
              // @ts-ignore
              <TasksListItems key={task.id} task={task} />
            ))}
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  lists: getsidebarListItems(state),
  activeListItem: getActiveSidebarList(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  changeSidebarListName: (id: string | number, name: string) => void;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {
    changeSidebarListName: actions.changeSidebarListName,
  }),
)(TasksList);
