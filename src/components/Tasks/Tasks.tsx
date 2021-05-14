import React from 'react';
import cn from 'classnames';
import styles from '../../styles/components/Tasks.module.scss';
import { Route, Switch } from 'react-router-dom';
import { TasksList, AllTasksLists } from '../';
import { AppStateType } from '../../redux/store';
import { getsidebarListItems } from '../../redux/selectors/sidebarSelectors';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { itemsType } from '../../redux/types/types';

const Tasks: React.FC<MapStatePropsType & ownProps> = React.memo(({ lists }) => {
  return (
    <div className={cn(styles.todo__tasks)}>
      <Switch>
        <Route exact path="/">
          {lists &&
            //@ts-ignore
            lists.map((list) => <AllTasksLists list={list} key={list.id} />)}
        </Route>
        <Route path="/lists/:id">
          <TasksList />
        </Route>
        <Route path="*" render={() => <div>404 NOT FOUND</div>} />
      </Switch>
    </div>
  );
});

const mapStateToProps = (state: AppStateType) => ({
  lists: getsidebarListItems(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type ownProps = {
  list: itemsType;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, {}, {}, AppStateType>(mapStateToProps, {}),
)(Tasks);
