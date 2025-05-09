
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import Logo from '@/components/Logo';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/app/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    const success = await login(data.email, data.password, selectedRole);
    setLoading(false);
    if (success) {
      navigate('/app/products');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="mb-8">
        <Logo />
      </div>
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="pt-6">
          <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email<span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">
                  Password<span className="text-red-500">*</span>
                </Label>
                <a
                  href="#"
                  className="text-sm text-app-blue hover:underline"
                  onClick={(e) => e.preventDefault()}
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 grid grid-cols-3 gap-2">
            <Button
              type="button"
              variant={selectedRole === 'admin' ? 'default' : 'outline'}
              className={selectedRole === 'admin' ? 'bg-app-green hover:bg-app-green/90' : ''}
              onClick={() => setSelectedRole('admin')}
            >
              Admin
            </Button>
            <Button
              type="button"
              variant={selectedRole === 'sales' ? 'default' : 'outline'}
              className={selectedRole === 'sales' ? 'bg-app-red hover:bg-app-red/90' : ''}
              onClick={() => setSelectedRole('sales')}
            >
              Sales
            </Button>
            <Button
              type="button"
              variant={selectedRole === 'purchases' ? 'default' : 'outline'}
              className={selectedRole === 'purchases' ? 'bg-app-blue hover:bg-app-blue/90' : ''}
              onClick={() => setSelectedRole('purchases')}
            >
              Purchases
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
