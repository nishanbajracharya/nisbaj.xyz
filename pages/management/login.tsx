import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';

import * as http from '../../lib/http';
import { withAuth } from '../../hoc/withAuth';
import Input from '../../components/form/Input';

type LoginForm = {
  username: string;
  password: string;
};

function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    http
      .post('/api/management/login', {
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        window.localStorage.setItem('token', response.data.token);
        router.push('/management');
      })
      .catch((e) => {
        window.localStorage.removeItem('token');
        console.log('[ERROR]', e);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      <button
        className="text-white bg-blue-500 rounded px-4 py-2 my-2"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

export default withAuth(Login);
