import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';

import http from '../../lib/http';
import { withAuth } from '../../hoc/withAuth';
import Input from '../../components/form/Input';
import { LOADING_STATUS } from '../../types/Loading';

type LoginForm = {
  username: string;
  password: string;
};

function Login() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState<LOADING_STATUS>(
    LOADING_STATUS.INITIAL
  );
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    setSubmitting(LOADING_STATUS.LOADING);

    http
      .post('/api/management/login', {
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        window.localStorage.setItem('token', response.data.token);
        router.push('/management');

        setSubmitting(LOADING_STATUS.LOADED);
      })
      .catch((e) => {
        window.localStorage.removeItem('token');

        setSubmitting(LOADING_STATUS.FAILED);
        setErrorMessage(e.response?.data?.message || 'An Error Occured');
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="font-semibold text-2xl my-4">Management Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:w-96 w-full">
        <Input
          type="text"
          label="Username"
          placeholder="Username"
          error={errors.username}
          errorMessage="Required"
          {...register('username', { required: true })}
        />

        <Input
          type="password"
          label="Password"
          placeholder="Password"
          error={errors.password}
          errorMessage="Required"
          {...register('password', { required: true })}
        />

        {submitting === LOADING_STATUS.FAILED && (
          <div className="text-center bg-red-200 text-red-900 rounded border border-red-300 p-2 font-sm opacity-80 mt-4 mb-6">
            {errorMessage}
          </div>
        )}

        <button
          className="flex justify-center items-center h-10 text-white bg-blue-500 rounded px-4 py-2 my-2 w-full my-4 hover:bg-blue-400 focus:outline-none focus:ring focus:bg-blue-600"
          type="submit"
        >
          {submitting === LOADING_STATUS.LOADING ? (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 40 40">
              <circle
                strokeDasharray="64"
                cx="20"
                cy="20"
                r="18"
                className="fill-transparent stroke-current stroke-2 text-white"
              ></circle>
            </svg>
          ) : (
            'Submit'
          )}
        </button>
      </form>
      <Link href="/">
        <a className="text-blue-500 hover:underline" title="Homepage">
          Go back to homepage
        </a>
      </Link>
    </div>
  );
}

const AuthLogin = withAuth(Login);

AuthLogin.getLayout = () => ({
  noDecoration: true,
});

export default AuthLogin;
