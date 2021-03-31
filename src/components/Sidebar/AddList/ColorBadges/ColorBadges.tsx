import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getDBcolors } from '../../../../redux/selectors/sidebarSelectors';
import { AppStateType } from '../../../../redux/store';
import styles from '../../../../styles/components/ColorBages.module.scss';
import cn from 'classnames';

const ColorBadges: React.FC<MapStatePropsType> = ({ colors }) => {
  const [selectedColor, selectColor] = React.useState(colors[0].id);
  const onColorClick = (id: string | number) => {
    selectColor(id);
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
};

const mapStateToProps = (state: AppStateType) => ({
  colors: getDBcolors(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {};

export default compose<React.ComponentType>(connect(mapStateToProps, {}))(ColorBadges);
