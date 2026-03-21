export const logger = {
  info: (message: string, meta?: any) => {
    console.log(`ℹ️  [INFO] ${message}`, meta || '');
  },
  
  error: (message: string, error?: any) => {
    console.error(`❌ [ERROR] ${message}`, error || '');
  },
  
  warn: (message: string, meta?: any) => {
    console.warn(`⚠️  [WARN] ${message}`, meta || '');
  },
  
  debug: (message: string, meta?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`🐛 [DEBUG] ${message}`, meta || '');
    }
  },
};
