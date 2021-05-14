import React from 'react';
import styles from './styles/components/App.module.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Preloader } from './components/common';
import { Sidebar, Tasks } from './components/';
import { AppStateType } from './redux/store';
import { initializeApp } from './redux/reducers/appReducer';
import { getInitializeApp } from './redux/selectors/appSelectors';
import cn from 'classnames';

/* React Lazy example
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const SuspendedProfile = withSuspense(ProfileContainer);
*/

const App: React.FC<MapStatePropsType & MapDispatchPropsType> = React.memo(
  ({ initializeApp, initialized }) => {
    React.useEffect(() => {
      initializeApp();
    }, [initializeApp]);

    if (!initialized) {
      return <Preloader />;
    }

    return (
      <div className={cn(styles.todo, {})}>
        <div
          className={cn(styles.todo__wrapper, {
            container: true,
          })}>
          <Sidebar />
          <Tasks />
          {/*<Route path="/profile/:userId?" render={() => <SuspendedProfile />} />*/}
        </div>
      </div>
    );
  },
);

const mapStateToProps = (state: AppStateType) => ({
  initialized: getInitializeApp(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  initializeApp: () => void;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    initializeApp,
  }),
  withRouter,
)(App);
