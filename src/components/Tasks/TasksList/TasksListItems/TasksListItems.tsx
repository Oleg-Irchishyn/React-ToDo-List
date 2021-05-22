import React from 'react';
import cn from 'classnames';
import styles from '../../../../styles/components/Tasks.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppStateType } from '../../../../redux/store';
import { SingleTaskType } from '../../../../redux/types/types';

type ownProps = {
  task: SingleTaskType;
};

const TasksListItems: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = ({
  task,
}) => {
  return (
    <div className={cn(styles.tasks_list__items)}>
      <div className={cn(styles.item, styles.item_checkbox)}>
        <input id={`task - ${task.id}`} type="checkbox" />
        <label htmlFor={`task - ${task.id}`}></label>
        <input type="text" readOnly value={task.text} />
      </div>
    </div>
  );
};

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {};

const mapStateToProps = (state: AppStateType) => ({});

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {}),
)(TasksListItems);
