import React from 'react';
import cn from 'classnames';
import styles from '../../../styles/components/Tasks.module.scss';
import editIcon from '../../../assets/images/edit.svg';
import { TasksListItems } from '../../index';
import { AppStateType } from '../../../redux/store';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getsidebarListItems } from '../../../redux/selectors/sidebarSelectors';

const TasksList: React.FC<MapStatePropsType & MapDispatchPropsType> = ({ lists }) => {
  return (
    <div className={cn(styles.todo__tasks_list)}>
      <div className={cn(styles.list_title_wrapper)}>
        <h2 className={cn(styles.list_title)}>{lists[1].name}</h2>
        <img src={editIcon} alt="edit image" />
      </div>
      {
        // @ts-ignore
        lists[1].tasks.map((el) => (
          <TasksListItems />
        ))
      }
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  lists: getsidebarListItems(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {}),
)(TasksList);
