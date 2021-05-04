import React from 'react';
import cn from 'classnames';
import styles from '../../../styles/components/Tasks.module.scss';
import editIcon from '../../../assets/images/edit.svg';
import { TasksListItems, AllTasksForm } from '../../index';
import { AppStateType } from '../../../redux/store';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { itemsType } from '../../../redux/types/types';
import { setNewSidebarListName } from '../../../redux/reducers/sidebarReducer';
import { getListsTasks } from '../../../redux/reducers/tasksReducer';

const AllTasksList: React.FC<MapDispatchPropsType & ownProps> = ({
  list,
  setNewSidebarListName,
  getListsTasks,
}) => {
  React.useEffect(() => {
    getListsTasks();
  }, [getListsTasks]);
  const editActiveTaskName = (id: string | number, name: string) => {
    const newActiveListName = window.prompt(`Lists's Name`, (name = String(list && list.name)));
    if (newActiveListName) {
      setNewSidebarListName(id, newActiveListName);
    }
  };
  return (
    <React.Fragment>
      {list && (
        <div className={cn(styles.todo__tasks_list)}>
          <div className={cn(styles.list_title_wrapper)}>
            <h2 style={{ color: list.color }} className={cn(styles.list_title)}>
              {list && list.name}
            </h2>
            {list && list.tasks && list.tasks.length > 0 && (
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

type MapDispatchPropsType = {
  setNewSidebarListName: (id: string | number, name: string) => void;
  getListsTasks: () => void;
};

export default compose<React.ComponentType>(
  connect<{}, MapDispatchPropsType, ownProps, AppStateType>(null, {
    setNewSidebarListName,
    getListsTasks,
  }),
)(AllTasksList);
