import React from 'react';
import styles from '../../../styles/components/Sidebar.module.scss';
import cn from 'classnames';
import { AppStateType } from '../../../redux/store';
import { useHistory } from 'react-router-dom';
import {
  getallTasksBtnList,
  getIsRemovable,
  getsidebarListItems,
  getActiveSidebarList,
  getElemVisibility,
} from '../../../redux/selectors/sidebarSelectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import removeSvg from '../../../assets/images/remove.svg';
import { itemsType, allTasksBtnType } from '../../../redux/types/types';
import { removeSidebarList, actions } from '../../../redux/reducers/sidebarReducer';

const SidebarList: React.FC<MapStatePropsType & MapDispatchPropsType> = React.memo(
  ({
    items,
    allTasksBtnList,
    isRemovable,
    activeListItem,
    visibility,
    removeSidebarList,
    selectActiveSidebarList,
  }) => {
    var history = useHistory();

    const listIcon = (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001V8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z"
          fill="black"
        />
      </svg>
    );

    const onRemove = (item: itemsType) => {
      if (window.confirm('Do you want to remove this list?')) {
        selectActiveSidebarList(null);
        removeSidebarList(item.id);
        window.location.replace('/');
      }
    };

    const onClickItem = (item: itemsType) => {
      history.push(`/lists/${item.id}`);
      selectActiveSidebarList(item);
    };

    return (
      <React.Fragment>
        <ul className={cn(styles.todo__sidebar_list)}>
          {allTasksBtnList.map((item: allTasksBtnType, index) => (
            <li
              key={index}
              className={cn({
                [styles.active]: activeListItem === null,
                [styles.shrink_sidebar_elements]: visibility === true,
              })}
              onClick={() => {
                selectActiveSidebarList(null);
                history.push(`/`);
              }}>
              <i>{(item.icon = listIcon)}</i>
              <span>{item.name}</span>
            </li>
          ))}

          {items.map((item: itemsType, index) => (
            <li
              key={`${item.id}_${index}`}
              className={cn({
                [styles.active]: activeListItem && activeListItem.id === item.id,
                [styles.shrink_sidebar_elements]: visibility === true,
              })}
              onClick={onClickItem ? () => onClickItem(item) : undefined}>
              <i>{<i style={{ background: `${item.color}` }} className={styles.badge}></i>}</i>
              <span>
                {item.name}
                {item.tasks && item.tasks.length > 0 ? `(${item.tasks.length})` : '(0)'}
              </span>
              {isRemovable && (
                <img
                  src={removeSvg}
                  alt="remove icon"
                  className={cn(styles.list_remove_icon)}
                  onClick={(e) => onRemove(item)}
                />
              )}
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  },
);

const mapStateToProps = (state: AppStateType) => ({
  items: getsidebarListItems(state),
  allTasksBtnList: getallTasksBtnList(state),
  isRemovable: getIsRemovable(state),
  activeListItem: getActiveSidebarList(state),
  visibility: getElemVisibility(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  removeSidebarList: (id: string | number) => void;
  selectActiveSidebarList: (obj: itemsType | null) => void;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    removeSidebarList,
    selectActiveSidebarList: actions.selectActiveSidebarList,
  }),
)(SidebarList);
