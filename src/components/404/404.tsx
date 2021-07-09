import React from 'react';
import cn from 'classnames';
import styles from '../../styles/components/App.module.scss';

const ErrorPage: React.FC = () => {
  return (
    <div className={cn(styles.error_page)}>
     Sorry, current task does not exist
    </div>
  );
};


export default ErrorPage;
