import React from 'react';
import cn from 'classnames';
import styles from '../../styles/components/Tasks.module.scss';
import { Route, Switch } from 'react-router-dom';
import { TasksList, AllTasksLists, ErrorPage } from '../';
import { AppStateType } from '../../redux/store';
import { getActiveSidebarList, getsidebarListItems } from '../../redux/selectors/sidebarSelectors';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { itemsType } from '../../redux/types/types';
import { getSidebarLists } from '../../redux/reducers/sidebarReducer';
import { getListsTasks } from '../../redux/reducers/tasksReducer';
import { Scrollbars } from 'react-custom-scrollbars';

const Tasks: React.FC<MapStatePropsType & ownProps> = React.memo(({ lists, activeListItem }) => {
  return (
    <div className={cn(styles.todo__tasks)}>
      <Scrollbars
        style={{ width: '100%', height: '100%' }}
        thumbSize={30}
        renderThumbVertical={(props) => <div {...props} className="thumb_vertical" />}
        renderThumbHorizontal={(props) => <div {...props} className="thumb_horizontal" />}>
        <Switch>
          <Route exact path="/">
            {lists &&
              //@ts-ignore
              lists.map((list) => <AllTasksLists list={list} key={list.id} />)}
          </Route>
          {
            //@ts-ignore
            <Route path="/lists/:id" render={() => <TasksList activeListItem={activeListItem} />} />
          }
          <Route path="*" render={() => <ErrorPage />} />
        </Switch>
      </Scrollbars>
    </div>
  );
});

const mapStateToProps = (state: AppStateType) => ({
  lists: getsidebarListItems(state),
  activeListItem: getActiveSidebarList(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  getListsTasks: () => void;
  getSidebarLists: () => void;
};
type ownProps = {
  list: itemsType;
  activeListItem: itemsType;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    getListsTasks,
    getSidebarLists,
  }),
)(Tasks);
