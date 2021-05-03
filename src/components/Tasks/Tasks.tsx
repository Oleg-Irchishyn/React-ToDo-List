import React from 'react';
import cn from 'classnames';
import styles from '../../styles/components/Tasks.module.scss';
import { Route, Switch } from 'react-router-dom';
import { TasksList, AllTasksLists } from '../';
import { AppStateType } from '../../redux/store';
import { getActiveSidebarList, getsidebarListItems } from '../../redux/selectors/sidebarSelectors';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { itemsType } from '../../redux/types/types';

const Tasks: React.FC<MapStatePropsType & ownProps> = ({ activeListItem, lists }) => {
  return (
    <div className={cn(styles.todo__tasks)}>
      <Route exact path="/">
        {activeListItem === null &&
          //@ts-ignore
          lists.map((list) => <AllTasksLists list={list} key={list.id} />)}
      </Route>
      <TasksList />
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  lists: getsidebarListItems(state),
  activeListItem: getActiveSidebarList(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type ownProps = {
  list: itemsType;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, {}, {}, AppStateType>(mapStateToProps, {}),
)(Tasks);
