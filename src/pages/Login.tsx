import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authService';
import { AxiosError } from 'axios';
import { loginSchema } from '../schemas/validation/loginSchema';
import { FaEnvelope, FaLock, FaApple, FaGoogle } from 'react-icons/fa';
import { Button, InputField } from '../components';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState('');
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error: validationError } = loginSchema.validate(formData, {
      abortEarly: false,
    });

    if (validationError) {
      const fieldErrorMap: { [key: string]: string } = {};
      validationError.details.forEach((detail) => {
        const field = detail.path[0] as string;
        fieldErrorMap[field] = detail.message;
      });

      setFieldErrors(fieldErrorMap);
      setError('');
      return;
    }

    setFieldErrors({});

    try {
      const token = await loginUser(formData);
      setToken(token);
      navigate('/devices');
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please check your credentials.');
      }
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h2>

        {error && (
          <div className="text-red-600 text-sm mb-4 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={fieldErrors.email}
            icon={<FaEnvelope />}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={fieldErrors.password}
            icon={<FaLock />}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition"
          >
            Log in
          </Button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-400">Or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            className="flex justify-center items-center gap-3 py-3 rounded-xl hover:bg-gray-50"
          >
            <FaApple className="text-xl" />
            Continue with Apple
          </Button>
          <Button
            variant="outline"
            className="flex justify-center items-center gap-3 py-3 rounded-xl hover:bg-gray-50"
          >
            <FaGoogle className="text-lg text-red-500" />
            Continue with Google
          </Button>
        </div>

        <p className="text-sm text-center mt-6 text-gray-500">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

