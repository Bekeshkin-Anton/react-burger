import log from '../pages/log.module.css';
import { EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '../services/actions/actions-user';
import { register, forgotPass } from '../utils/constants';
import { useForm } from '../hooks/useForm';

function LoginPage() {
  const { values, handleChange } = useForm({ email: '', password: '' });
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [isVisible, setVisible] = useState(false);

  const onClickSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signIn(values));
  };

  function onClickReg() {
    navigate(register, { replace: true });
  }

  function onClickForgotPass() {
    navigate(forgotPass, { replace: true });
  }

  return (
    <div className={log.container}>
      <form className={log.form} onSubmit={onClickSubmit}>
        <h2 className={`${log.title} text text_type_main-medium pb-3`}>Вход</h2>
        <fieldset data-cy="login-inputs" className={`${log.input_items} pb-3 pt-3`}>
          <EmailInput
            onChange={handleChange}
            value={values.email}
            name={'email'}
            isIcon={false}
            placeholder={'E-mail'}
            autoComplete="username"
          />
          <Input
            type={isVisible ? 'text' : 'password'}
            placeholder={'Пароль'}
            autoComplete="current-password"
            onChange={handleChange}
            icon={isVisible ? 'ShowIcon' : 'HideIcon'}
            value={values.password}
            name={'password'}
            error={false}
            ref={inputRef}
            onIconClick={() => setVisible(!isVisible)}
            errorText={'Ошибка'}
            size={'default'}
          />
        </fieldset>
        <div className={`${log.button} pt-3 mb-15`}>
          <Button data-cy="login-in-account-btn" htmlType="submit" type="primary" size="medium">
            Войти
          </Button>
        </div>
      </form>
      <div className={`${log.text_container} pt-5`}>
        <p className="text text_type_main-default text_color_inactive">Вы новый пользователь?</p>
        <Button htmlType="button" type="secondary" size="medium" onClick={onClickReg} extraClass="pl-2 pr-2">
          Зарегистрироваться
        </Button>
      </div>
      <div className={`${log.text_container}`}>
        <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
        <Button htmlType="button" type="secondary" size="medium" extraClass="pl-2 pr-2" onClick={onClickForgotPass}>
          Восстановить пароль
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
