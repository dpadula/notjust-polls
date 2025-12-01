import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isAuthenticated: boolean;
};

//TODO: Manejar el usuario anonimo en la interfaz de usuario
// (select auth.jwt() ->> 'is_anonymous')::boolean is false <----Esto va en las políticas de la tabla polls para cuando el usuario quiere crear una encuesta
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isAuthenticated: false,
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);

      //TODO: Esto tambien debe manejarse desde la interfaz de usuario
      if (!session) {
        supabase.auth.signInAnonymously();
      }
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        isAuthenticated: !!session?.user && !session.user.is_anonymous,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
