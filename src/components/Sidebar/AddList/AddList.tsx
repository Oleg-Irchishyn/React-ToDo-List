import React from 'react';
import styles from '../../../styles/components/Sidebar.module.scss';
import cn from 'classnames';
import { addListButtonItems } from '../../../redux/selectors/sidebarSelectors';
import { AppStateType } from '../../../redux/store';
import { compose } from 'redux';
import { connect } from 'react-redux';

const AddList: React.FC<MapStatePropsType> = ({ items }) => {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const popupRef = React.useRef<HTMLDivElement>(null);
  const toggleVisiblePopup = () => {
    setVisiblePopup(!visiblePopup);
  };

  const handleOutsideClick = (e: any) => {
    const path = e.path || (e.composedPath && e.composedPath());
    if (!path.includes(popupRef.current)) {
      setVisiblePopup(false);
    }
  };

  React.useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div className={cn(styles.todo__sidebar_add_btn_wrapper)}>
      <ul className={cn(styles.todo__sidebar_add_btn)}>
        {items.map((item, index) => (
          <li
            onClick={toggleVisiblePopup}
            key={index}
            className={cn({
              [styles.active]: '',
            })}>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
      {visiblePopup ? (
        <div className={cn(styles.add_list_popup)} ref={popupRef}>
          <h1>Hello World</h1>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  items: addListButtonItems(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {};

export default compose<React.ComponentType>(connect(mapStateToProps, {}))(AddList);
