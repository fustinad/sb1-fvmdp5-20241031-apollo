import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logger } from './logger';

interface FileMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: string;
  lastAccessed: string;
  downloadCount: number;
}

interface FileState {
  files: FileMetadata[];
  addFile: (file: FileMetadata) => void;
  updateFileAccess: (id: string) => void;
  removeFile: (id: string) => void;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface Credentials {
  email: string;
  password: string;
}

interface SettingsState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  notifications: boolean;
  setNotifications: (enabled: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials) => {
    try {
      logger.info('Attempting login', { email: credentials.email });
      // Simulate API call
      const user = { id: '1', email: credentials.email, name: 'John Doe' };
      set({ user, isAuthenticated: true });
      logger.info('Login successful', { userId: user.id });
    } catch (error) {
      logger.error('Login failed', error);
      throw error;
    }
  },
  logout: () => {
    try {
      logger.info('User logging out');
      set({ user: null, isAuthenticated: false });
      logger.info('Logout successful');
    } catch (error) {
      logger.error('Logout failed', error);
      throw error;
    }
  },
  updateProfile: async (data) => {
    try {
      logger.info('Updating user profile', data);
      set((state) => ({
        user: state.user ? { ...state.user, ...data } : null,
      }));
      logger.info('Profile update successful');
    } catch (error) {
      logger.error('Profile update failed', error);
      throw error;
    }
  },
}));

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => {
        try {
          logger.info('Changing theme', { theme });
          set({ theme });
        } catch (error) {
          logger.error('Theme change failed', error);
          throw error;
        }
      },
      notifications: true,
      setNotifications: (enabled) => {
        try {
          logger.info('Updating notification settings', { enabled });
          set({ notifications: enabled });
        } catch (error) {
          logger.error('Notification settings update failed', error);
          throw error;
        }
      },
    }),
    {
      name: 'settings-storage',
    }
  )
);

export const useFileStore = create<FileState>()(
  persist(
    (set) => ({
      files: [],
      addFile: (file) => {
        try {
          logger.info('Adding new file', { fileName: file.name });
          set((state) => ({
            files: [...state.files, file],
          }));
        } catch (error) {
          logger.error('Failed to add file', error);
          throw error;
        }
      },
      updateFileAccess: (id) => {
        try {
          logger.info('Updating file access', { fileId: id });
          set((state) => ({
            files: state.files.map((file) =>
              file.id === id
                ? {
                    ...file,
                    lastAccessed: new Date().toISOString(),
                    downloadCount: file.downloadCount + 1,
                  }
                : file
            ),
          }));
        } catch (error) {
          logger.error('Failed to update file access', error);
          throw error;
        }
      },
      removeFile: (id) => {
        try {
          logger.info('Removing file', { fileId: id });
          set((state) => ({
            files: state.files.filter((file) => file.id !== id),
          }));
        } catch (error) {
          logger.error('Failed to remove file', error);
          throw error;
        }
      },
    }),
    {
      name: 'file-storage',
    }
  )
);