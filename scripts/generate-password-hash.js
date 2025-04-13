/**
 * Simple hash generator
 */
const readline = require('readline');
const { sha256 } = require('js-sha256');

// Simple SHA-256 hash function for client-side React Native use
function generateHash(text) {
  return Promise.resolve(sha256(text));
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the password to hash: ', async (password) => {
  try {
    const hash = await generateHash(password);
    
    console.log('\nPassword hash generated successfully:');
    console.log('\x1b[32m%s\x1b[0m', hash);
    console.log('\nAdd this to your .env file or constants/env.ts file as:');
    console.log('\x1b[36m%s\x1b[0m', `HASHED_PASSWORD=${hash}`);
    console.log('\nRemember that this simple hash is not as secure as bcrypt');
    console.log('For production applications, consider using server-side authentication.');
    
  } catch (error) {
    console.error('Error generating hash:', error);
  } finally {
    rl.close();
  }
}); 