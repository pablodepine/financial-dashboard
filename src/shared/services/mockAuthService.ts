import { api } from './api';
import type { User } from '@/types';

interface MockUser extends User {
  password?: string;
}

// Simula um usuário autenticado em memória
let currentUser: User | null = null;

export const mockAuthService = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signInWithEmail(email: string, _password: string): Promise<User> {
    // Busca usuário pelo email ou cria um novo
    const users = await api.get<MockUser[]>(`/users?email=${email}`);
    
    if (users.length > 0) {
      currentUser = {
        id: users[0].id,
        email: users[0].email,
        displayName: users[0].displayName,
        photoURL: users[0].photoURL,
      };
      this.saveToStorage(currentUser);
      return currentUser;
    }
    
    throw new Error('Usuário não encontrado. Crie uma conta primeiro.');
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signUpWithEmail(email: string, _password: string): Promise<User> {
    // Verifica se já existe
    const existingUsers = await api.get<MockUser[]>(`/users?email=${email}`);
    
    if (existingUsers.length > 0) {
      throw new Error('Este email já está cadastrado.');
    }

    // Cria novo usuário
    const newUser: MockUser = {
      id: `user-${Date.now()}`,
      email,
      displayName: email.split('@')[0],
      photoURL: undefined,
    };

    const created = await api.post<MockUser>('/users', newUser);
    currentUser = {
      id: created.id,
      email: created.email,
      displayName: created.displayName,
      photoURL: created.photoURL,
    };
    this.saveToStorage(currentUser);
    return currentUser;
  },

  async signInWithGoogle(): Promise<User> {
    // Simula login com Google retornando o usuário demo
    const users = await api.get<MockUser[]>('/users');
    
    if (users.length > 0) {
      currentUser = {
        id: users[0].id,
        email: users[0].email,
        displayName: users[0].displayName,
        photoURL: users[0].photoURL,
      };
      this.saveToStorage(currentUser);
      return currentUser;
    }

    // Cria usuário demo se não existir
    const demoUser: MockUser = {
      id: 'user-1',
      email: 'demo@email.com',
      displayName: 'Usuário Demo',
      photoURL: undefined,
    };

    const created = await api.post<MockUser>('/users', demoUser);
    currentUser = created;
    this.saveToStorage(currentUser);
    return currentUser;
  },

  async signOut(): Promise<void> {
    currentUser = null;
    localStorage.removeItem('mock_user');
  },

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    // Verifica se há usuário salvo no localStorage
    const savedUser = this.loadFromStorage();
    if (savedUser) {
      currentUser = savedUser;
    }
    
    // Chama o callback imediatamente com o estado atual
    setTimeout(() => callback(currentUser), 100);

    // Retorna função de cleanup (não faz nada no mock)
    return () => {};
  },

  saveToStorage(user: User): void {
    localStorage.setItem('mock_user', JSON.stringify(user));
  },

  loadFromStorage(): User | null {
    const saved = localStorage.getItem('mock_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  },
};
