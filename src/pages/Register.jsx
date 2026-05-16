import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff, User, CheckCircle2, AlertCircle, Shield, Send, MessageCircle } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  // Generate a random 6-digit code
  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Simulate sending verification email
  const sendVerificationEmail = async (userEmail, userName, code) => {
    // In a real app, this would call your backend API
    console.log(`
      =========================================
      📧 VERIFICATION EMAIL SIMULATION
      =========================================
      To: ${userEmail}
      Subject: Verify Your FlowBoard Account
      
      Hello ${userName}!
      
      Your verification code is: ${code}
      
      Enter this code in the app to verify your email address.
      
      This code will expire in 10 minutes.
      
      If you didn't create an account with FlowBoard, please ignore this email.
      =========================================
    `);
    
    // Show alert for demo purposes
    alert(`📧 DEMO MODE\n\nA verification email would be sent to:\n${userEmail}\n\nVerification Code: ${code}\n\n(Check your browser console for full details)`);
    
    return true;
  };

  const handleSendVerification = async () => {
    // First, validate the form
    if (!name || !email || !password || password !== confirmPassword) {
      setErrors({
        name: !name ? 'Name is required' : '',
        email: !email ? 'Email is required' : '',
        password: !password ? 'Password is required' : '',
        confirmPassword: password !== confirmPassword ? 'Passwords do not match' : ''
      });
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors({ ...errors, email: 'Please enter a valid email address' });
      return;
    }
    
    // Validate password strength
    const isStrong = password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (!isStrong) {
      setErrors({ ...errors, password: 'Password does not meet requirements' });
      return;
    }
    
    // Generate and send verification code
    const code = generateVerificationCode();
    setVerificationCode(code);
    
    await sendVerificationEmail(email, name, code);
    setShowVerificationModal(true);
  };

  const handleVerifyCode = async () => {
    if (enteredCode === verificationCode) {
      setVerificationError('');
      setShowVerificationModal(false);
      
      // Proceed with registration
      setLoading(true);
      const success = await register(name, email, password);
      setLoading(false);
      
      if (success) {
        navigate('/dashboard');
      }
    } else {
      setVerificationError('Invalid verification code. Please try again.');
    }
  };

  const handleResendCode = async () => {
    const code = generateVerificationCode();
    setVerificationCode(code);
    await sendVerificationEmail(email, name, code);
    setVerificationError('');
  };

  const passwordStrength = (() => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    const passedChecks = Object.values(checks).filter(Boolean).length;
    return { checks, strength: passedChecks === 5 ? 'strong' : passedChecks >= 3 ? 'medium' : 'weak', passedChecks };
  })();

  const isPasswordStrong = passwordStrength.strength === 'strong';

  return (
    <>
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
                Create your account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleSendVerification(); }} className="space-y-5">
              {/* Name Input */}
              <div>
                <label className="block text-subtitle2 mb-2 text-gray-900 dark:text-white">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`input pl-10 ${errors.name ? 'input-error' : ''}`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && <p className="text-error-500 text-caption mt-1.5">{errors.name}</p>}
              </div>

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
                  />
                </div>
                {errors.email && <p className="text-error-500 text-caption mt-1.5">{errors.email}</p>}
                {email && !errors.email && (
                  <p className="text-success-600 text-caption mt-1.5 flex items-center gap-1">
                    <CheckCircle2 size={14} /> We'll send a verification code to this email
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
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                
                {password && !errors.password && (
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Shield size={14} className="text-gray-500" />
                        <span className="text-caption text-gray-600 dark:text-gray-400">Password strength:</span>
                        <span className={`text-caption font-semibold capitalize ${
                          passwordStrength.strength === 'strong' ? 'text-green-600' :
                          passwordStrength.strength === 'medium' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {passwordStrength.strength}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                      <div className={`text-caption flex items-center gap-1 ${passwordStrength.checks.length ? 'text-green-600' : 'text-gray-500'}`}>
                        {passwordStrength.checks.length ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />} Min 8 chars
                      </div>
                      <div className={`text-caption flex items-center gap-1 ${passwordStrength.checks.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                        {passwordStrength.checks.uppercase ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />} Uppercase
                      </div>
                      <div className={`text-caption flex items-center gap-1 ${passwordStrength.checks.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                        {passwordStrength.checks.lowercase ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />} Lowercase
                      </div>
                      <div className={`text-caption flex items-center gap-1 ${passwordStrength.checks.number ? 'text-green-600' : 'text-gray-500'}`}>
                        {passwordStrength.checks.number ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />} Number
                      </div>
                      <div className={`text-caption flex items-center gap-1 col-span-2 ${passwordStrength.checks.special ? 'text-green-600' : 'text-gray-500'}`}>
                        {passwordStrength.checks.special ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />} Special character
                      </div>
                    </div>
                  </div>
                )}
                {errors.password && <p className="text-error-500 text-caption mt-1.5">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-subtitle2 mb-2 text-gray-900 dark:text-white">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`input pl-10 pr-10 ${errors.confirmPassword ? 'input-error' : ''}`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {confirmPassword && password === confirmPassword && (
                  <p className="text-success-600 text-caption mt-1.5 flex items-center gap-1">
                    <CheckCircle2 size={14} /> Passwords match
                  </p>
                )}
                {errors.confirmPassword && <p className="text-error-500 text-caption mt-1.5">{errors.confirmPassword}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!email || !password || !isPasswordStrong || password !== confirmPassword}
                className="btn-primary w-full mt-6 gap-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send size={18} />
                Send Verification Code
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              <span className="text-caption text-gray-500">Already have an account?</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            </div>

            <Link to="/login" className="btn-secondary w-full text-center">
              Sign In
            </Link>

            <p className="text-caption text-center text-gray-500 dark:text-gray-500 mt-6">
              We'll send a verification code to your email to confirm you're human. 🤖
            </p>
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 animate-slide-up">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/50 mb-3">
                <MessageCircle size={28} className="text-primary-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Verify Your Email</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                We've sent a verification code to
                <br />
                <strong className="text-primary-600">{email}</strong>
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Enter Verification Code
                </label>
                <input
                  type="text"
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  maxLength={6}
                  autoFocus
                />
                {verificationError && (
                  <p className="text-error-500 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle size={14} /> {verificationError}
                  </p>
                )}
              </div>

              <button
                onClick={handleVerifyCode}
                disabled={enteredCode.length !== 6}
                className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Verify & Create Account
              </button>

              <div className="text-center">
                <button
                  onClick={handleResendCode}
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
                >
                  Didn't receive code? Resend
                </button>
              </div>

              <p className="text-xs text-center text-gray-500 dark:text-gray-400 pt-2">
                Check your spam folder if you don't see the email in your inbox.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}