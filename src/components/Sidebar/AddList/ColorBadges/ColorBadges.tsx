import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getDBcolors, getselectedColor } from '../../../../redux/selectors/sidebarSelectors';
import { AppStateType } from '../../../../redux/store';
import styles from '../../../../styles/components/ColorBages.module.scss';
import cn from 'classnames';
import { actions, getSidebarListsColors } from '../../../../redux/reducers/sidebarReducer';

const ColorBadges: React.FC<MapStatePropsType & MapDispatchPropsType> = React.memo(
  ({ colors, selectedColor, setSelectedColor, getSidebarListsColors }) => {
    React.useEffect(() => {
      getSidebarListsColors();
    }, [getSidebarListsColors]);
    const onColorClick = (id: string | number) => {
      setSelectedColor(id);
    };
    return (
      <div className={styles.add_list_popup__colors}>
        <ul className={styles.colors_badges}>
          {colors &&
            colors.map((item) => (
              <li
                key={item.id}
                onClick={() => onColorClick(item.id)}
                className={cn({
                  [styles.active]: selectedColor === item.id,
                })}>
                <i style={{ background: `${item.hex}` }}></i>
              </li>
            ))}
        </ul>
      </div>
    );
  },
);

const mapStateToProps = (state: AppStateType) => ({
  colors: getDBcolors(state),
  selectedColor: getselectedColor(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;

type MapDispatchPropsType = {
  setSelectedColor: (color: string | number) => void;
  getSidebarListsColors: () => void;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    setSelectedColor: actions.setSelectedColor,
    getSidebarListsColors,
  }),
)(ColorBadges);
