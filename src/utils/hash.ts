/**
 * A simple hash function for client-side password comparison
 * Note: This is not as secure as bcrypt but works for client-side applications
 * 
 * For a real production app, you should:
 * 1. Use a server-side authentication API rather than storing hash in the app
 * 2. Use a more secure hashing library compatible with React Native
 */
import { sha256 } from 'js-sha256';

/**
 * Generate a SHA-256 hash from a string
 */
export async function simpleHash(text: string): Promise<string> {
  // Use js-sha256 library which works in React Native
  return sha256(text);
}

/**
 * Compare a plain text password with a hash
 */
export async function compareHash(plainText: string, hashedValue: string): Promise<boolean> {
  const hash = await simpleHash(plainText);
  return hash === hashedValue;
}

/**
 * Creates a hash for storing
 */
export async function generateHash(password: string): Promise<string> {
  return simpleHash(password);
} 