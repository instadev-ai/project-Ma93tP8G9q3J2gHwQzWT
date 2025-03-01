// Theme configuration for the fitness app
export const theme = {
  colors: {
    // Primary colors
    primary: {
      main: '#1E3A8A', // Deep blue
      light: '#3B82F6',
      dark: '#1E40AF',
    },
    // Secondary colors
    secondary: {
      main: '#F97316', // Vibrant orange
      light: '#FB923C',
      dark: '#EA580C',
    },
    // UI colors
    background: {
      main: '#F8FAFC',
      card: '#FFFFFF',
      dark: '#0F172A',
    },
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
      light: '#F8FAFC',
      accent: '#F97316',
    },
    // Feedback colors
    success: '#10B981',
    warning: '#FBBF24',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  typography: {
    fontFamily: {
      heading: '"Montserrat", sans-serif',
      body: '"Lora", serif',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.15s ease',
    slow: 'all 0.5s ease',
  },
};

// Helper functions to access theme values
export const getColor = (path: string): string => {
  const keys = path.split('.');
  let result: any = theme.colors;
  
  for (const key of keys) {
    if (result[key] === undefined) {
      console.warn(`Theme color path "${path}" not found`);
      return '';
    }
    result = result[key];
  }
  
  return result;
};

export const getFontFamily = (type: 'heading' | 'body'): string => {
  return theme.typography.fontFamily[type];
};

export default theme;