import React from 'react';
import styles from './../../styles/components/Sidebar.module.scss';
import cn from 'classnames';
import { SidebarList, AddList } from '../';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

const Sidebar: React.FC = React.memo(() => {
  const element = <FontAwesomeIcon icon={faArrowAltCircleRight} />;
  return (
    <div className={cn(styles.todo__sidebar)}>
      <SidebarList />
      <AddList />
      <div className={cn(styles.todo__sidebar_open_arrow)}>{element}</div>
    </div>
  );
});

export default Sidebar;
