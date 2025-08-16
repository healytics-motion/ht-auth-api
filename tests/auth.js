import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

async function register() {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'user@example.com', password: 'supersecret!' }),
  });

  const data = await res.json();
  console.log('Register response:', data);
  return data;
}

async function login() {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'user@example.com', password: 'supersecret!' }),
  });

  const data = await res.json();
  console.log('Login response:', data);
  return data.token;
}

async function me(token) {
  const res = await fetch(`${BASE_URL}/api/me`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  console.log('Protected /me response:', data);
}

async function runTests() {
  try {
    await register();          // try to register
  } catch (err) {
    console.log('Register may have failed (user exists)', err.message);
  }

  const token = await login(); // login and get JWT
  await me(token);             // call protected route
}

runTests();

