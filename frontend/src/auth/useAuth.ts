import { useQuery } from '@tanstack/react-query';

export const useAuth = () => {
    return useQuery({
        queryKey: ['auth'],
        queryFn: async () => {
            const res = await fetch('http://localhost:3000/auth/me', {
                credentials: 'include',
            });
            if (!res.ok) throw new Error('Not authenticated');
            return res.json();
        },
        retry: false,
    });
};