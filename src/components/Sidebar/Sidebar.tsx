import React from 'react';
import styles from './../../styles/components/Sidebar.module.scss';
import cn from 'classnames';
import { SidebarList, AddList } from '../';

const Sidebar: React.FC = React.memo(() => {
  return (
    <div className={cn(styles.todo__sidebar)}>
      <SidebarList />
      <AddList />
    </div>
  );
});

export default Sidebar;
