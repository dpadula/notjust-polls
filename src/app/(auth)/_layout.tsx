import { useAuth } from '@/providers/AuthProvider';
import { Redirect, Slot } from 'expo-router';
import React from 'react';

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  // Este layout protege las rutas hijas, redirigiendo a login si hay usuario
  // y sino renderiza el Slot (contenido hijo)
  if (isAuthenticated) return <Redirect href='/profile' />;
  return <Slot />;
};

export default AuthLayout;
