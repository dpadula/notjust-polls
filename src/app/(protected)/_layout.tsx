import { useAuth } from '@/providers/AuthProvider';
import { Redirect, Slot } from 'expo-router';
import React from 'react';

const ProtectedLayout = () => {
  const { user } = useAuth();

  // Este layout protege las rutas hijas, redirigiendo a login si no hay usuario
  // y sino renderiza el Slot (contenido hijo)
  if (!user) return <Redirect href='/login' />;
  return <Slot />;
};

export default ProtectedLayout;
