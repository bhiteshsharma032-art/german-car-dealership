import crypto from 'crypto';

export interface TokenPayload {
  username: string;
  role: string;
  iat: number;
  exp: number;
}

// Simple JWT-like token generation (for demo purposes)
// In production, use a proper JWT library like jsonwebtoken
export const generateToken = (username: string, role: string = 'admin'): string => {
  const payload: TokenPayload = {
    username,
    role,
    iat: Date.now(),
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };

  const payloadStr = JSON.stringify(payload);
  const payloadBase64 = Buffer.from(payloadStr).toString('base64');
  
  // Create signature
  const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
  const signature = crypto
    .createHmac('sha256', secret)
    .update(payloadBase64)
    .digest('base64');

  return `${payloadBase64}.${signature}`;
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const [payloadBase64, signature] = token.split('.');
    
    if (!payloadBase64 || !signature) {
      return null;
    }

    // Verify signature
    const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payloadBase64)
      .digest('base64');

    if (signature !== expectedSignature) {
      return null;
    }

    // Decode payload
    const payloadStr = Buffer.from(payloadBase64, 'base64').toString('utf-8');
    const payload: TokenPayload = JSON.parse(payloadStr);

    // Check expiration
    if (payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
};

export const hashPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

export const comparePassword = (password: string, hash: string): boolean => {
  return hashPassword(password) === hash;
};
