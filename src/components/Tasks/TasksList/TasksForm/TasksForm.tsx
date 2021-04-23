import React from 'react';
import cn from 'classnames';
import styles from '../../../../styles/components/TasksForm.module.scss';
import { maxLengthCreator, required } from '../../../../redux/utils/validators/validators';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { Input, createField } from '../../../common/FormControls/FormControls';
import { AppStateType } from '../../../../redux/store';
import { getActiveSidebarList } from '../../../../redux/selectors/sidebarSelectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setNewTaskToList } from '../../../../redux/reducers/taskReducer';
import { v4 as uuidv4 } from 'uuid';

const TasksForm: React.FC<MapStatePropsType & MapDispatchPropsType> = ({
  activeListItem,
  setNewTaskToList,
}) => {
  const [visibleForm, setVisibleForm] = React.useState(false);
  const toggleVisibleForm = () => {
    setVisibleForm(!visibleForm);
  };

  const formRef = React.useRef<HTMLDivElement>(null);

  const handleFormOutsideClick = React.useCallback((e: any) => {
    const path = e.path || (e.composedPath && e.composedPath());
    if (!path.includes(formRef.current)) {
      setVisibleForm(false);
    }
  }, []);

  const onAddTask = (values: AddNewPostFormValuesType) => {
    console.log(values.newTaskText);

    const newTaskObj = {
      id: uuidv4(),
      listId: activeListItem && activeListItem.id,
      text: values.newTaskText,
      completed: false,
    };

    const { id, listId, text, completed } = newTaskObj;
    setNewTaskToList(id, listId, text, completed);

    // const newTasksList =  activeListItem.tasks.map((item) => {

    // })
  };

  React.useEffect(() => {
    document.body.addEventListener('click', handleFormOutsideClick);
    return () => {
      document.body.removeEventListener('click', handleFormOutsideClick);
    };
  }, [handleFormOutsideClick]);

  return (
    <div className={cn(styles.tasks__form)} ref={formRef}>
      {!visibleForm ? (
        <div className={cn(styles.tasks__form_new)} onClick={toggleVisibleForm}>
          <i className={cn(styles.add_icon)}></i>
          <span>New Task</span>
        </div>
      ) : (
        <div className={cn(styles.tasks__form_block)}>
          <AddNewPostFormRedux onSubmit={onAddTask} />
        </div>
      )}
    </div>
  );
};

const maxLength30 = maxLengthCreator(30);

const AddNewTaskForm: React.FC<
  InjectedFormProps<AddNewPostFormValuesType, PropsType> & PropsType
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<AddNewPostFormValuesTypeKeys>('Post Message', 'newTaskText', Input, [
          required,
          maxLength30,
        ])}
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const AddNewPostFormRedux = reduxForm<AddNewPostFormValuesType, PropsType>({
  form: 'addNewTaskForm',
})(AddNewTaskForm);

type PropsType = {};

export type AddNewPostFormValuesType = {
  newTaskText: string | number;
};

type AddNewPostFormValuesTypeKeys = Extract<keyof AddNewPostFormValuesType, string>;

const mapStateToProps = (state: AppStateType) => ({
  activeListItem: getActiveSidebarList(state),
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  setNewTaskToList: (
    id: string | number,
    listId: string | number | null,
    text: string | number,
    completed: boolean,
  ) => void;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    setNewTaskToList,
  }),
)(TasksForm);
