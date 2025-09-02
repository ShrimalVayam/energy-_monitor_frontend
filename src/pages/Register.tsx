import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { AxiosError } from 'axios';
import { registerSchema } from '../schemas/validation/registerSchema';
import { FaEnvelope, FaLock, FaUser, FaApple, FaGoogle } from 'react-icons/fa';
import { Button, InputField } from '../components';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    setGeneralError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');
    setFieldErrors({});

    const { error: validationError } = registerSchema.validate(formData, {
      abortEarly: false,
    });

    if (validationError) {
      const errors: Record<string, string> = {};
      validationError.details.forEach((d) => {
        if (d.path[0]) errors[d.path[0] as string] = d.message;
      });
      setFieldErrors(errors);
      return;
    }

    try {
      await registerUser(formData);
      navigate('/');
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data?.error) {
        setGeneralError(err.response.data.error);
      } else {
        setGeneralError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create your account
        </h2>

        {generalError && (
          <div className="text-red-600 text-sm mb-4 text-center font-medium">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Full Name"
            name="username"
            value={formData.username}
            onChange={handleChange}
            icon={<FaUser />}
            error={fieldErrors.username}
          />
          <InputField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            icon={<FaEnvelope />}
            error={fieldErrors.email}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            icon={<FaLock />}
            error={fieldErrors.password}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition"
          >
            Sign up
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
          Already have an account?{' '}
          <Link to="/" className="text-blue-600 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
