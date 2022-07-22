import { USERS } from 'api/query';
import { Link } from 'react-router-dom';
import Logo from '../../assets/png/logo.png';
import { useMutation } from '@apollo/client';
import { AuthContext } from 'contexts/AuthContext';
import React, { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputBasic from 'components/InputBasic/InputBasic';
import BasicButton from 'components/BasicButton/BasicButton';

type FormValues = {
  email: string;
  username: string;
  password: string;
  verifyPassword: string;
};

const SignUp = () => {
  const { register, handleSubmit, watch } = useForm<FormValues>({});
  const { onLogin } = useContext(AuthContext);
  const [gError, setgError] = useState<string>('');

  const [addUser, { loading }] = useMutation(USERS.register);

  const [welcomeMessage, setWelcomeMessage] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const { email, username, verifyPassword, password } = formData;
    if (password !== verifyPassword) {
      return setgError('Password and verify password must be the same');
    }
    return addUser({ variables: { email, username, password } })
      .then((data) => {
        const token = data.data?.addUser.token;
        if (token) {
          setWelcomeMessage(true);
          setTimeout(() => {
            onLogin(token);
          }, 2000);
        }
      })
      .catch((err) => setgError(err.message));
  };

  return (
    <div className="flex flex-col items-center justify-center w-2/3 sm:w-3/4 h-auto lg:h-auto bg-primary p-8 space-y-4 rounded-md shadow-lg bg-opacity-70 overflow-hidden relative">
      {welcomeMessage ? (
        <div>
          <h1 className="text-2xl lg:text-5xl text-secondary text-center font-bold w-full">
            {`Welcome ${watch('username')}`}
          </h1>
        </div>
      ) : (
        <>
          <div
            id="logo"
            className=" inline-block lg:absolute items-center lg:top-4 lg:left-4 justify-start lg:w-full"
          >
            <img src={Logo} alt="logo" className=" w-28 lg:w-20" />
          </div>
          <section id="signup" className="flex flex-col h-full w-full animate-fade-slide-in ">
            <h1 className="text-2xl lg:text-5xl text-secondary text-center font-bold w-full">
              Create an account
            </h1>
            <br />
            <br />
            <form onSubmit={handleSubmit(onSubmit)} className="my-2">
              <section className="flex flex-col lg:flex-row h-2/3 grid-cols-2 gap-4">
                <div className="w-full flex flex-col px-20 space-y-2">
                  <InputBasic
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    label="Email"
                    style="light"
                    required
                    register={register}
                  />
                  <InputBasic
                    type="username"
                    name="username"
                    placeholder="Username"
                    label="Username"
                    style="light"
                    required
                    register={register}
                  />
                  <br />
                </div>
                <div className=" w-full flex flex-col px-20 space-y-2">
                  <InputBasic
                    type="password"
                    name="password"
                    placeholder="Secret Password"
                    label="Password"
                    style="light"
                    required
                    register={register}
                  />
                  <InputBasic
                    type="password"
                    name="verifyPassword"
                    placeholder="Verify Password"
                    label="Verify password"
                    style="light"
                    required
                    register={register}
                  />
                  <p className=" text-sm text-white italic">
                    ** The password must contain at least 8 characters including a capital letter, a
                    number and a special character
                  </p>
                </div>
              </section>
              <section
                id="actions"
                className="flex flex-col-reverse text-center grid-cols-2 gap-4 mt-4"
              >
                <div className="text-center w-full">
                  <Link to="/login" className="text-white font-medium hover:underline ">
                    Already an account ?
                  </Link>
                </div>
                <span className="w-full h-autoflex justify-center">
                  <BasicButton
                    animationDisabled
                    content={'SignUp'}
                    type="submit"
                    onClick={() => null}
                    variant="secondary"
                  />
                </span>
                {gError && (
                  <span className="w-full text-left text-yellow-400 my-2 animate-fade-in-down ">
                    {gError}
                  </span>
                )}
              </section>
            </form>
          </section>
        </>
      )}
    </div>
  );
};

export default SignUp;
