import React from 'react';
import styles from './styles/components/App.module.scss';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Preloader } from './components/common';
import { Sidebar, Tasks } from './components/';
import { AppStateType } from './redux/store';
import { initializeApp } from './redux/reducers/appReducer';
import { getSidebarLists, getSidebarListsColors } from './redux/reducers/sidebarReducer';
import cn from 'classnames';

/* React Lazy example
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const SuspendedProfile = withSuspense(ProfileContainer);
*/

const App: React.FC<MapStatePropsType & MapDispatchPropsType> = React.memo(
  ({
    initializeApp,
    getSidebarLists,
    getSidebarListsColors,
    initialized,
    sidebarListsitems,
    sidebarListscolors,
  }) => {
    React.useEffect(() => {
      initializeApp();
      getSidebarListsColors();
      getSidebarLists();
    }, []);

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
          <Switch>
            <Route exact path="/404" render={() => <div>404 NOT FOUND</div>} />
            {/*<Route path="/profile/:userId?" render={() => <SuspendedProfile />} />*/}
          </Switch>
        </div>
      </div>
    );
  },
);

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
  sidebarListscolors: state.sidebar.colors,
  sidebarListsitems: state.sidebar.sidebarListItems,
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  initializeApp: () => void;
  getSidebarLists: () => void;
  getSidebarListsColors: () => void;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    initializeApp,
    getSidebarLists,
    getSidebarListsColors,
  }),
  withRouter,
)(App);
