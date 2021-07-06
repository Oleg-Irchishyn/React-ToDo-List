import React, { ChangeEvent } from 'react';
import styles from '../../../styles/components/Sidebar.module.scss';
import cn from 'classnames';
import {
  getaddListButtonItems,
  getDBcolors,
  getselectedColor,
  getIsLoading,
} from '../../../redux/selectors/sidebarSelectors';
import { AppStateType } from '../../../redux/store';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ColorBadges } from '../../index';
import closeImg from '../../../assets/images/close.svg';
import { v4 as uuidv4 } from 'uuid';
import {
  actions,
  addNewSidebarList,
  getSidebarLists,
} from '../../../redux/reducers/sidebarReducer';
import { itemsType } from '../../../redux/types/types';

const AddList: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = ({
  items,
  colors,
  selectedColor,
  isLoading,
  visibility,
  setSelectedColor,
  addNewSidebarList,
  getSidebarLists,
}) => {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const onClosePopup = () => {
    setInputValue('');
    setVisiblePopup(false);
    setSelectedColor(colors[0].id);
  };

  const addListItem = () => {
    if (!inputValue) {
      alert(`Folder's name can't be empty`);
      return;
    }
    const newList: itemsType = {
      id: uuidv4(),
      name: inputValue,
      colorId: selectedColor,
    };
    const { id, name, colorId } = newList;
    addNewSidebarList(id, name, colorId);
    getSidebarLists();
    onClosePopup();
  };

  const popupRef = React.useRef<HTMLDivElement>(null);
  const showPopup = () => {
    setVisiblePopup(true);
  };

  const handleOutsideClick = React.useCallback((e: any) => {
    const path = e.path || (e.composedPath && e.composedPath());
    if (!path.includes(popupRef.current)) {
      setVisiblePopup(false);
    }
  }, []);

  React.useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <div className={cn(styles.todo__sidebar_add_btn_wrapper)}>
      <ul className={cn(styles.todo__sidebar_add_btn)}>
        {items.map((item, index) => (
          <li
            onClick={showPopup}
            key={index}
            className={cn({
              [styles.active]: '',
              [styles.shrink_sidebar_add_list_btn]: visibility === true,
            })}>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
      {visiblePopup && visiblePopup ? (
        <div className={cn(styles.add_list_popup)} ref={popupRef}>
          <img
            alt="close button"
            src={closeImg}
            className={styles.add_list_popup__close_btn}
            onClick={onClosePopup}
          />
          <input
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            value={inputValue}
            className={styles.input_field}
            placeholder="Enter folder's name"
          />
          <ColorBadges />
          <button className={styles.add_btn} onClick={addListItem}>
            {isLoading === false ? 'Add' : 'Adding'}
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  colors: getDBcolors(state),
  items: getaddListButtonItems(state),
  selectedColor: getselectedColor(state),
  isLoading: getIsLoading(state),
});

type ownProps = {
  visibility: boolean;
};

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  setSelectedColor: (color: string | number) => void;
  addNewSidebarList: (id: string | number, name: string, colorId: string | number) => void;
  getSidebarLists: () => void;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    setSelectedColor: actions.setSelectedColor,
    addNewSidebarList,
    getSidebarLists,
  }),
)(AddList);
