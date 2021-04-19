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

type ownProps = {
  task: SingleTaskType;
};

const TasksList: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = ({
  lists,
  activeListItem,
}) => {
  return (
    <div className={cn(styles.todo__tasks_list)}>
      <div className={cn(styles.list_title_wrapper)}>
        <h2 className={cn(styles.list_title)}>{activeListItem && activeListItem.name}</h2>
        <img src={editIcon} alt="edit image" />
      </div>
      {lists &&
        activeListItem &&
        activeListItem.tasks &&
        activeListItem.tasks.map((task) => (
          // @ts-ignore
          <TasksListItems key={task.id} task={task} />
        ))}
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  lists: getsidebarListItems(state),
  activeListItem: getActiveSidebarList(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {}),
)(TasksList);
