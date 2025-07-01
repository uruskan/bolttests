import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase/client';
import { Logger } from '@/lib/logging/logger';

/**
 * Authentication Store using Zustand
 */
export const useAuthStore = create()(
  persist(
    (set, get) => ({
      // State
      user: null,
      isLoading: false,
      isAuthenticated: false,
      restaurantId: null,
      role: null,

      // Actions
      signIn: async (email, password) => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (error) throw error;
          
          // Get restaurant association
          const { data: userRestaurant, error: restaurantError } = await supabase
            .from('user_restaurants')
            .select('restaurant_id, role')
            .eq('user_id', data.user.id)
            .single();

          if (restaurantError) {
            Logger.warn('No restaurant association found for user', restaurantError);
          }

          const userData = {
            id: data.user.id,
            email: data.user.email,
            restaurantId: userRestaurant?.restaurant_id || null,
            role: userRestaurant?.role || null,
          };

          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
            restaurantId: userData.restaurantId,
            role: userData.role,
          });

          Logger.info('User signed in successfully', { userId: userData.id });
          return userData;
        } catch (error) {
          set({ isLoading: false });
          Logger.error('Sign in failed', error);
          throw error;
        }
      },

      signOut: async () => {
        try {
          await supabase.auth.signOut();
          set({ 
            user: null, 
            isAuthenticated: false, 
            restaurantId: null, 
            role: null 
          });
          Logger.info('User signed out successfully');
        } catch (error) {
          Logger.error('Sign out failed', error);
          throw error;
        }
      },

      signUp: async (email, password, restaurantData) => {
        set({ isLoading: true });
        try {
          // Create user
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
          });
          
          if (authError) throw authError;

          // Create restaurant
          const { data: restaurant, error: restaurantError } = await supabase
            .from('restaurants')
            .insert({
              ...restaurantData,
              slug: restaurantData.name.toLowerCase().replace(/\s+/g, '-'),
            })
            .select()
            .single();
            
          if (restaurantError) throw restaurantError;

          // Associate user with restaurant
          const { error: associationError } = await supabase
            .from('user_restaurants')
            .insert({
              user_id: authData.user.id,
              restaurant_id: restaurant.id,
              role: 'owner',
            });

          if (associationError) throw associationError;

          const userData = {
            id: authData.user.id,
            email: authData.user.email,
            restaurantId: restaurant.id,
            role: 'owner',
          };

          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
            restaurantId: userData.restaurantId,
            role: userData.role,
          });

          Logger.info('User signed up successfully', { userId: userData.id, restaurantId: restaurant.id });
          return userData;
        } catch (error) {
          set({ isLoading: false });
          Logger.error('Sign up failed', error);
          throw error;
        }
      },

      setUser: (user) => {
        set({ 
          user, 
          isAuthenticated: !!user,
          restaurantId: user?.restaurantId || null,
          role: user?.role || null,
        });
      },
      
      getRestaurantId: () => get().restaurantId,
      
      hasRole: (requiredRole) => {
        const { role } = get();
        const roleHierarchy = { owner: 3, admin: 2, editor: 1 };
        return roleHierarchy[role] >= roleHierarchy[requiredRole];
      },

      // Initialize auth state from Supabase session
      initialize: async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            // Get restaurant association
            const { data: userRestaurant } = await supabase
              .from('user_restaurants')
              .select('restaurant_id, role')
              .eq('user_id', session.user.id)
              .single();

            const userData = {
              id: session.user.id,
              email: session.user.email,
              restaurantId: userRestaurant?.restaurant_id || null,
              role: userRestaurant?.role || null,
            };

            set({
              user: userData,
              isAuthenticated: true,
              restaurantId: userData.restaurantId,
              role: userData.role,
            });
          }
        } catch (error) {
          Logger.error('Failed to initialize auth state', error);
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated,
        restaurantId: state.restaurantId,
        role: state.role,
      }),
    }
  )
);

// Listen to auth changes
supabase.auth.onAuthStateChange((event, session) => {
  const { setUser, initialize } = useAuthStore.getState();
  
  if (event === 'SIGNED_OUT' || !session) {
    setUser(null);
  } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    initialize();
  }
});