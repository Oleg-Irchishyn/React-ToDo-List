import React from 'react';
import cn from 'classnames';
import styles from '../../../../styles/components/TasksForm.module.scss';
import { maxLengthCreator, required } from '../../../../redux/utils/validators/validators';
import { FormAction, InjectedFormProps, reduxForm, reset } from 'redux-form';
import { Input, createField } from '../../../common/FormControls/FormControls';
import { AppStateType } from '../../../../redux/store';
import { getsidebarListItems } from '../../../../redux/selectors/sidebarSelectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setNewTaskToList, actions, getListsTasks } from '../../../../redux/reducers/tasksReducer';
import { v4 as uuidv4 } from 'uuid';
import { itemsTasksType, itemsType } from '../../../../redux/types/types';
import { getIsLoading } from '../../../../redux/selectors/tasksSelectors';

const AllTasksForm: React.FC<MapStatePropsType & MapDispatchPropsType & ownProps> = ({
  items,
  getListsTasks,
  isLoading,
  list,
  setNewTaskToList,
  addNewTaskToList,
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

  const onAddTask = (values: AddNewPostFormValuesType, dispatch: (T: FormAction) => void) => {
    const newTaskObj = {
      id: uuidv4(),
      listId: list && list.id,
      text: values.newTaskText,
      completed: false,
    };

    const { id, listId, text, completed } = newTaskObj;
    setNewTaskToList(id, listId, text, completed);

    const newTasksList: any = items.map((item) => {
      if (item.id === listId) {
        if (item.tasks) {
          item.tasks = [...item.tasks, newTaskObj];
        }
      }
      return item;
    });

    addNewTaskToList(newTasksList);
    dispatch(reset('addExtraNewTaskForm'));
    getListsTasks();
    setVisibleForm(false);
  };

  const onCancelSubmit = () => {
    setVisibleForm(false);
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
          <AddExtraNewPostFormRedux
            isLoading={isLoading}
            onCancelSubmit={onCancelSubmit}
            onSubmit={onAddTask}
            list={list}
          />
        </div>
      )}
    </div>
  );
};

const maxLength30 = maxLengthCreator(30);

const AddExtraNewTaskForm: React.FC<
  InjectedFormProps<AddNewPostFormValuesType, PropsType> & PropsType
> = (props) => {
  const { onCancelSubmit, isLoading } = props;
  return (
    <form className={cn(styles.form__inner)} onSubmit={props.handleSubmit}>
      <div>
        {createField<AddNewPostFormValuesTypeKeys>('Task name', 'newTaskText', Input, [
          required,
          maxLength30,
        ])}
      </div>
      <div className={cn(styles.form__inner__body)}>
        <button disabled={isLoading}>Add task</button>
        <span onClick={onCancelSubmit}>Cancel</span>
      </div>
    </form>
  );
};

const AddExtraNewPostFormRedux = reduxForm<AddNewPostFormValuesType, PropsType>({
  form: 'addExtraNewTaskForm',
})(AddExtraNewTaskForm);

type PropsType = {
  onCancelSubmit: () => void;
  isLoading: boolean;
  list: itemsType;
};

export type AddNewPostFormValuesType = {
  newTaskText: string | number;
};

type AddNewPostFormValuesTypeKeys = Extract<keyof AddNewPostFormValuesType, string>;

const mapStateToProps = (state: AppStateType) => ({
  items: getsidebarListItems(state),
  isLoading: getIsLoading(state),
});

type ownProps = {
  list: itemsType;
};

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  setNewTaskToList: (
    id: string | number,
    listId: string | number | null,
    text: string | number,
    completed: boolean,
  ) => void;
  addNewTaskToList: (obj: itemsTasksType) => void;
  getListsTasks: () => void;
};

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    setNewTaskToList,
    getListsTasks,
    addNewTaskToList: actions.addNewTaskToList,
  }),
)(AllTasksForm);
