import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getDBcolors } from '../../../../redux/selectors/sidebarSelectors';
import { AppStateType } from '../../../../redux/store';
import styles from '../../../../styles/components/ColorBages.module.scss';

const ColorBadges: React.FC<MapStatePropsType> = ({ colors }) => {
  return (
    <div className={styles.add_list_popup__colors}>
      <ul className={styles.colors_badges}>
        {colors &&
          colors.map((item) => (
            <li key={item.id}>
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
