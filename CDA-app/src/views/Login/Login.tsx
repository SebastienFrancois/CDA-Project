import './Login.scss';
import { USERS } from 'api/query';
import { useMutation } from '@apollo/client';
import Logo from '../../assets/png/SimplePlan.png';
import { AuthContext } from 'contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import React, { FC, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import SpinLoader from 'components/SpinLoader/SpinLoader';
import InputBasic from 'components/InputBasic/InputBasic.lazy';
import BasicButton from 'components/BasicButton/BasicButton.lazy';

type FormValues = {
  email: string;
  password: string;
};

interface LoginProps {}
export const Login: FC<LoginProps> = () => {
  const { register, handleSubmit } = useForm<FormValues>({});
  const navigate = useNavigate();
  const { onLogin } = useContext(AuthContext);
  const [login, { loading }] = useMutation(USERS.login);
  const [gError, setgError] = useState<string>('');

  const onSubmit: SubmitHandler<FormValues> = (formState) => {
    return login({ variables: formState })
      .then((data) => {
        const token = data.data.login;
        onLogin(token);
      })
      .catch((err) => setgError(err.message));
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center w-2/3 sm:w-3/4 h-2/3 bg-primary p-4 space-y-4 sm:space-y-0 sm:space-x-4 rounded-md shadow-lg bg-opacity-70">
      {loading ? (
        <SpinLoader />
      ) : (
        <>
          <section
            id="logo"
            className="flex justify-center bg-transparent h-1/3 sm:h-full sm:w-2/4 p-2"
          >
            <img src={Logo} alt="logo" className="object-contain" />
          </section>
          <section id="login" className="flex flex-col justify-center h-2/3 sm:h-full sm:w-2/4">
            <h1 className=" text-5xl text-secondary text-center font-bold">Welcome Back !</h1>
            <br />
            <form className="w-full mb-3" onSubmit={handleSubmit(onSubmit)}>
              <InputBasic
                type="email"
                name="email"
                placeholder="Email Address"
                label="Email"
                required
                register={register}
              />
              <br />
              <InputBasic
                type="password"
                name="password"
                placeholder="Secret Password"
                label="Password"
                required
                register={register}
              />
              {gError && (
                <span className="w-full text-left text-yellow-400 my-2 animate-fade-in-down ">
                  {gError}
                </span>
              )}
              <section
                id="actions"
                className="flex flex-col-reverse lg:flex-row text-center grid-cols-2 gap-4 lg:gap-2 py-8 px-2"
              >
                <div className="text-center w-full lg:text-start lg:w-2/3">
                  <Link to="/" className="text-white font-medium hover:underline ">
                    Forgot your password ?
                  </Link>
                  <br />
                  <Link to="/" className="text-white font-medium hover:underline ">
                    No account ? Sign up!
                  </Link>
                </div>
                <span className="w-full h-autoflex justify-center">
                  <BasicButton
                    animationDisabled
                    content={'Login'}
                    type="submit"
                    onClick={() => null}
                    variant="secondary"
                  />
                </span>
              </section>
            </form>
          </section>
        </>
      )}
    </div>
  );
};
