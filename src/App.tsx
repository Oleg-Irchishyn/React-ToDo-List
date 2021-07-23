import React from 'react';
import styles from './styles/components/App.module.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Preloader } from './components/common';
import { Sidebar } from './components/';
import { AppStateType } from './redux/store';
import { initializeApp } from './redux/reducers/appReducer';
import { getInitializeApp } from './redux/selectors/appSelectors';
import cn from 'classnames';
import { withSuspense } from './hoc/WithSuspense';

const TasksContainer = React.lazy(() => import('./components/Tasks/Tasks'));
const SuspendedTasks = withSuspense(TasksContainer);

const App: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = React.memo(
  ({ initializeApp, initialized, history }) => {
    React.useEffect(() => {
      initializeApp();
      history.push(`/`);
      if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        history.push(`/`);
        console.log('yo');
      }
    }, [initialized]);

    if (!initialized) {
      return <Preloader />;
    }

    return (
      <div
        className={cn(styles.todo, {
          container: true,
        })}>
        <div className={cn(styles.todo__wrapper)}>
          <Sidebar />
          <SuspendedTasks />
        </div>
      </div>
    );
  },
);

const mapStateToProps = (state: AppStateType) => ({
  initialized: getInitializeApp(state),
});

type ownProps = {
  history: any;
};

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
