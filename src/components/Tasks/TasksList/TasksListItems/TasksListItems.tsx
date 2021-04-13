import React from 'react';
import cn from 'classnames';
import styles from '../../../../styles/components/Tasks.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppStateType } from '../../../../redux/store';
import { getsidebarListItems } from '../../../../redux/selectors/sidebarSelectors';
import { getSidebarLists } from '../../../../redux/reducers/sidebarReducer';

const TasksListItems: React.FC<MapStatePropsType & MapDispatchPropsType> = ({ lists }) => {
  return (
    <div className={cn(styles.tasks_list__items)}>
      <div className={cn(styles.item, styles.item_checkbox)}>
        <input id="check" type="checkbox" />
        <label htmlFor="check"></label>
        <input type="text" value={lists[1].name} />
      </div>
    </div>
  );
};

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  getSidebarLists: () => void;
};

const mapStateToProps = (state: AppStateType) => ({
  lists: getsidebarListItems(state),
});

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    getSidebarLists,
  }),
)(TasksListItems);
