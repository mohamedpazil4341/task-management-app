// ============================================
// LoginForm Component — User Login Form
// ============================================
// A beautiful login form with validation, error handling,
// and a gradient background design.

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, CheckSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  // Basic client-side validation
  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await login(formData);
      navigate('/');
    } catch (error) {
      // Error toast is handled by AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side — Gradient Background with Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-bg items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-white"
        >
          <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <CheckSquare className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">TaskFlow</h1>
          <p className="text-lg text-white/80 max-w-md">
            Organize your work, boost productivity, and achieve your goals with our powerful task management platform.
          </p>
          {/* Decorative Elements */}
          <div className="mt-12 flex justify-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm" />
            <div className="w-16 h-16 rounded-xl bg-white/15 backdrop-blur-sm mt-8" />
            <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm" />
          </div>
        </motion.div>
      </div>

      {/* Right Side — Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white dark:bg-surface-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
              <CheckSquare className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">TaskFlow</h1>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-surface-900 dark:text-white">
              Welcome back
            </h2>
            <p className="text-surface-500 dark:text-surface-400 mt-2">
              Sign in to continue to your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="login-email"
              label="Email Address"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={Mail}
            />

            <Input
              id="login-password"
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={Lock}
            />

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="w-full"
              icon={LogIn}
            >
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginForm;
