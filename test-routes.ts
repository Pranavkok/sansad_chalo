import http from 'http';
import { exec } from 'child_process';

const routes = [
  '/',
  '/dashboard',
  '/api/auth/signin',
  '/api/auth/providers',
  '/api/card/default'
];

async function testRoutes() {
  for (const route of routes) {
    console.log(`Testing route: ${route}`);
    try {
      const response = await fetch(`http://localhost:3001${route}`);
      const text = await response.text();
      console.log(`Route ${route} status: ${response.status}`);
      if (text.includes('replace') || text.includes('Error') || text.includes('TypeError')) {
        console.log(`Found error keywords in ${route}!`);
      }
    } catch (e) {
      console.log(`Failed to fetch ${route}:`, e);
    }
  }
}

testRoutes();
