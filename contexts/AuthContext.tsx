'use client';

import { apiService } from '@/services/api';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
	id: string;
	name: string;
	email: string;
	role: string;
}

interface AuthContextType {
	user: User | null;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		checkUser();
	}, []);

	const checkUser = async () => {
		try {
			const token = apiService.getToken();
			if (token) {
				const response = await apiService.getProfile();
				if (response.success && response.user.role === 'admin') {
					setUser(response.user);
				} else {
					apiService.clearToken();
				}
			}
		} catch {
			apiService.clearToken();
		} finally {
			setLoading(false);
		}
	};

	const login = async (email: string, password: string) => {
		const response = await apiService.login(email, password);
		if (response.success && response.user.role === 'admin') {
			setUser(response.user);
		} else {
			throw new Error('Admin access required');
		}
	};

	const logout = () => {
		apiService.clearToken();
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{
			user,
			loading,
			login,
			logout,
			isAdmin: user?.role === 'admin',
		}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider');
	}
	return context;
};