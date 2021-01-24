import client from './client';

export const login = () => client.post('/auth/login');
