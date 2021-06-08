import React from 'react';
import cn from 'classnames';
import styles from '../../../styles/components/Tasks.module.scss';
import editIcon from '../../../assets/images/edit.svg';
import { TasksListItems, AllTasksForm } from '../../index';
import { useHistory } from 'react-router-dom';
import { AppStateType } from '../../../redux/store';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { itemsType } from '../../../redux/types/types';
import {
  setNewSidebarListName,
  getSidebarLists,
  actions,
} from '../../../redux/reducers/sidebarReducer';
import { getListsTasks } from '../../../redux/reducers/tasksReducer';
import { getAllTasks } from '../../../redux/selectors/tasksSelectors';
import { getPuresidebarListItems } from '../../../redux/selectors/sidebarSelectors';

const AllTasksList: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = ({
  list,
  allTasks,
  allSideBarLists,
  setNewSidebarListName,
  selectActiveSidebarList,
}) => {
  React.useEffect(() => {}, [allTasks, allSideBarLists]);
  const history = useHistory();

  const editActiveTaskName = (id: string | number, name: string) => {
    const newActiveListName = window.prompt(`Lists's Name`, (name = String(list && list.name)));
    if (newActiveListName) {
      setNewSidebarListName(id, newActiveListName);
    }
    getSidebarLists();
  };

  const redirectToActiveList = (list: itemsType) => {
    selectActiveSidebarList(list);
    history.push(`/lists/${list.id}`);
  };
  return (
    <React.Fragment>
      {list && (
        <div className={cn(styles.todo__tasks_list, styles.todo__all_tasks_list)}>
          <div className={cn(styles.list_title_wrapper)}>
            <h2
              style={{ color: list.color }}
              className={cn(styles.list_title)}
              onClick={() => redirectToActiveList(list)}>
              {list && list.name}
            </h2>
            {list && list.tasks && list.tasks.length >= 0 && (
              <img
                src={editIcon}
                alt="edit"
                onClick={() => editActiveTaskName(list.id, list.name)}
              />
            )}
          </div>

          {!list ||
            !list.tasks ||
            (list.tasks.length <= 0 && (
              <h2 className={cn(styles.list_title_hollow)}>No tasks :(</h2>
            ))}

          {list &&
            list.tasks &&
            list.tasks.map((task) => (
              // @ts-ignore
              <TasksListItems key={task.id} task={task} />
            ))}

          {
            // @ts-ignore
            <AllTasksForm list={list} />
          }
        </div>
      )}
    </React.Fragment>
  );
};

type ownProps = {
  list: itemsType;
};

const mapStateToProps = (state: AppStateType) => ({
  allTasks: getAllTasks(state),
  allSideBarLists: getPuresidebarListItems(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  setNewSidebarListName: (id: string | number, name: string) => void;
  getListsTasks: () => void;
  getSidebarLists: () => void;
  selectActiveSidebarList: (obj: itemsType | null) => void;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, ownProps, AppStateType>(mapStateToProps, {
    setNewSidebarListName,
    getListsTasks,
    getSidebarLists,
    selectActiveSidebarList: actions.selectActiveSidebarList,
  }),
)(AllTasksList);
