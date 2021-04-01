import React, { ChangeEvent } from 'react';
import styles from '../../../styles/components/Sidebar.module.scss';
import cn from 'classnames';
import { getaddListButtonItems, getselectedColor } from '../../../redux/selectors/sidebarSelectors';
import { AppStateType } from '../../../redux/store';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ColorBadges } from '../../index';
import closeImg from '../../../assets/images/close.svg';
import { v4 as uuidv4 } from 'uuid';
import { actions, itemsType } from '../../../redux/reducers/sidebarReducer';

const AddList: React.FC<MapStatePropsType & MapDispatchPropsType> = ({
  items,
  selectedColor,
  setNewSidebarList,
}) => {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
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
    setNewSidebarList(newList);
    setInputValue('');
    setVisiblePopup(false);
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
  }, []);

  return (
    <div className={cn(styles.todo__sidebar_add_btn_wrapper)}>
      <ul className={cn(styles.todo__sidebar_add_btn)}>
        {items.map((item, index) => (
          <li
            onClick={showPopup}
            key={index}
            className={cn({
              [styles.active]: '',
            })}>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
      {visiblePopup && visiblePopup ? (
        <div className={cn(styles.add_list_popup)} ref={popupRef}>
          <img
            alt="clode button"
            src={closeImg}
            className={styles.add_list_popup__close_btn}
            onClick={() => setVisiblePopup(false)}
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
            Add
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  items: getaddListButtonItems(state),
  selectedColor: getselectedColor(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  setNewSidebarList: (obj: itemsType) => void;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    setNewSidebarList: actions.setNewSidebarList,
  }),
)(AddList);
