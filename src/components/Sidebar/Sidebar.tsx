import React from 'react';
import styles from './../../styles/components/Sidebar.module.scss';
import cn from 'classnames';
import { SidebarList, AddList } from '../';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { getElemVisibility } from '../../redux/selectors/sidebarSelectors';
import { actions } from '../../redux/reducers/sidebarReducer';

const Sidebar: React.FC<MapStatePropsType & MapDispatchPropsType> = React.memo(
  ({ visibility, setVisibilityOfElements }) => {
    React.useEffect(() => {
      localStorage.setItem('visibility', JSON.stringify(visibility));
    });
    const element = <FontAwesomeIcon icon={faArrowAltCircleRight} />;
    const [val = visibility, setVal] = React.useState(!visibility);
    const toggleElemetsVisibility = () => {
      setVal(!val);
      setVisibilityOfElements(val);
    };
    console.log(visibility);
    return (
      <div
        className={cn(styles.todo__sidebar, {
          [styles.shrink_sidebar]: visibility === true,
          [styles.grow_sidebar]: visibility === false,
        })}>
        <SidebarList />
        <AddList />
        <div
          className={cn(styles.todo__sidebar_open_arrow, {
            [styles.shrink_arrow]: visibility === true,
          })}
          onClick={toggleElemetsVisibility}>
          {element}
        </div>
      </div>
    );
  },
);

const mapStateToProps = (state: AppStateType) => ({
  visibility: getElemVisibility(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;

type MapDispatchPropsType = {
  setVisibilityOfElements: (val: boolean) => void;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    setVisibilityOfElements: actions.setVisibilityOfElements,
  }),
)(Sidebar);
