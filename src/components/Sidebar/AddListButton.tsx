import React from 'react';
import styles from './../../styles/components/Sidebar.module.scss';
import cn from 'classnames';
import { addListButtonItems } from '../../redux/selectors/sidebarSelectors';
import { AppStateType } from '../../redux/store';
import { compose } from 'redux';
import { connect } from 'react-redux';

const AddListButton: React.FC<MapStatePropsType> = ({ items }) => {
  const addIcon = (
    <svg
      width="10"
      height="10"
      viewBox="0 0 16 16"
      fill="#767676"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 1V15"
        stroke="#767676"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 8H15"
        stroke="#767676"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <React.Fragment>
      <ul className={cn(styles.todo__sidebar_add_btn)}>
        {items.map((item, index) => (
          <li
            key={index}
            className={cn({
              [styles.active]: '',
            })}>
            <i>{item.icon === null ? (item.icon = addIcon) : ''}</i>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  items: addListButtonItems(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {};

export default compose<React.ComponentType>(connect(mapStateToProps, {}))(AddListButton);
