import { supabase } from '../lib/supabase';
import { User } from '../stores/userStore';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const userService = {
  // Register new user
  signup: async (data: SignupData): Promise<AuthResponse> => {
    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.name,
          phone: data.phone,
        },
      },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Signup failed');

    // Create profile in database
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: data.email,
        full_name: data.name,
        phone: data.phone,
      });

    if (profileError) throw profileError;

    const user: User = {
      id: authData.user.id,
      email: data.email,
      name: data.name,
      phone: data.phone,
      favorites: [],
      createdAt: new Date().toISOString(),
    };

    const token = authData.session?.access_token || '';

    return { user, token };
  },

  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw error;
    if (!data.user) throw new Error('Login failed');

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) throw profileError;

    // Get favorites
    const { data: favorites } = await supabase
      .from('favorites')
      .select('car_id')
      .eq('user_id', data.user.id);

    const user: User = {
      id: data.user.id,
      email: profile.email,
      name: profile.full_name,
      phone: profile.phone,
      favorites: favorites?.map(f => f.car_id) || [],
      createdAt: profile.created_at,
    };

    const token = data.session?.access_token || '';

    return { user, token };
  },

  // Logout user
  logout: async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current session
  getSession: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  // Get user profile
  getProfile: async (userId: string): Promise<User> => {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;

    // Get favorites
    const { data: favorites } = await supabase
      .from('favorites')
      .select('car_id')
      .eq('user_id', userId);

    return {
      id: profile.id,
      email: profile.email,
      name: profile.full_name,
      phone: profile.phone,
      favorites: favorites?.map(f => f.car_id) || [],
      createdAt: profile.created_at,
    };
  },

  // Update user profile
  updateProfile: async (userId: string, updates: Partial<User>): Promise<User> => {
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: updates.name,
        phone: updates.phone,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) throw error;

    return userService.getProfile(userId);
  },

  // Add car to favorites
  addFavorite: async (userId: string, carId: string): Promise<void> => {
    const { error } = await supabase
      .from('favorites')
      .insert({
        user_id: userId,
        car_id: carId,
      });

    if (error) throw error;
  },

  // Remove car from favorites
  removeFavorite: async (userId: string, carId: string): Promise<void> => {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('car_id', carId);

    if (error) throw error;
  },

  // Get user favorites
  getFavorites: async (userId: string): Promise<string[]> => {
    const { data, error } = await supabase
      .from('favorites')
      .select('car_id')
      .eq('user_id', userId);

    if (error) throw error;

    return data?.map(f => f.car_id) || [];
  },
};

