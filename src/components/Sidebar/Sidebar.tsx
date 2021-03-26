import React from 'react';
import styles from './../../styles/components/Sidebar.module.scss';
import ListSvg from '../../assets/images/list.svg';
import cn from 'classnames';

const Sidebar = React.memo(() => {
  return (
    <div className={cn(styles.todo__sidebar)}>
      <ul className={cn(styles.todo__sidebar_list)}>
        <li
          className={cn({
            [styles.active]: false,
          })}>
          <i>
            <img src={ListSvg} alt="list icon" />
          </i>
          <span>All tasks</span>
        </li>
      </ul>
    </div>
  );
});

export default Sidebar;
