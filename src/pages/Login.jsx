import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return null;
  };

  const validateForm = () => {
    const newErrors = {};
    
    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;
    
    if (!password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-100 dark:bg-primary-900 opacity-20 rounded-full blur-3xl -z-10 animate-fade-in" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-100 dark:bg-secondary-900 opacity-20 rounded-full blur-3xl -z-10 animate-fade-in" />

      <div className="w-full max-w-md animate-slide-up">
        <div className="card shadow-elevation-6 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/50 mb-4">
              <div className="text-4xl">📋</div>
            </div>
            <h1 className="text-h2 mb-2">FlowBoard</h1>
            <p className="text-body2 text-gray-600 dark:text-gray-400">
              Sign in to manage your tasks
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-subtitle2 mb-2 text-gray-900 dark:text-white">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`input pl-10 ${errors.email ? 'input-error' : ''}`}
                  placeholder="your@email.com"
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <p className="text-error-500 text-caption mt-1.5">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-subtitle2 mb-2 text-gray-900 dark:text-white">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`input pl-10 pr-10 ${errors.password ? 'input-error' : ''}`}
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-error-500 text-caption mt-1.5">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-6 gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-caption text-gray-500">New user?</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Sign Up Link */}
          <Link to="/register" className="btn-secondary w-full text-center">
            Create Account
          </Link>

          <p className="text-caption text-center text-gray-500 dark:text-gray-500 mt-6">
            Enter your registered email and password
          </p>
        </div>
      </div>
    </div>
  );
}