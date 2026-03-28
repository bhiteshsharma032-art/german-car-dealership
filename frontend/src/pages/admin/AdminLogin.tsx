import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { useAuthStore } from '../../store/authStore';
import { Car, Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface LoginForm {
  username: string;
  password: string;
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      setError('');
      await login(data.username, data.password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ungültige Anmeldedaten. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Administration - Nordhessen Automobile</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-md w-full relative z-10">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mb-6 shadow-2xl">
              <Car className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Administration</h1>
            <p className="text-gray-400">Nordhessen Automobile Verwaltung</p>
          </div>

          {/* Login Card */}
          <div className="bg-[#2b2b36] rounded-2xl shadow-2xl p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-300 mb-2">
                  Benutzername
                </label>
                <input
                  {...register('username', { required: 'Benutzername ist erforderlich' })}
                  type="text"
                  id="username"
                  className="input w-full"
                  placeholder="admin"
                  autoComplete="username"
                  autoFocus
                />
                {errors.username && (
                  <p className="mt-2 text-sm text-red-600">{errors.username.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                  Passwort
                </label>
                <div className="relative">
                  <input
                    {...register('password', { required: 'Passwort ist erforderlich' })}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="input w-full pr-12"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Anmelden...
                  </>
                ) : (
                  'Anmelden'
                )}
              </button>
            </form>

            {/* Production Credentials */}
            <div className="mt-6 pt-6 border-t border-zinc-800">
              <p className="text-xs text-gray-500 text-center">
                Standard-Zugangsdaten:<br />
                <span className="font-mono">admin / dealer2024</span>
              </p>
            </div>
          </div>

          {/* Back to Website */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Zurück zur Website
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
