import React from 'react';
import styles from './../../styles/components/Sidebar.module.scss';
import cn from 'classnames';
import { SidebarList, AddListButton } from '../';

const Sidebar: React.FC = React.memo(() => {
  return (
    <div className={cn(styles.todo__sidebar)}>
      <SidebarList />
      <AddListButton />
    </div>
  );
});

export default Sidebar;
