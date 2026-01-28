export const DEMO_USER = {
  id: '1',
  email: 'demo@breeze.com',
  password: 'demo1234',
  name: '데모 사용자',
};

export interface TestUser {
  email: string;
  password: string;
  name: string;
}

export function generateTestUser(): TestUser {
  const timestamp = Date.now();
  return {
    email: `test${timestamp}@example.com`,
    password: 'test1234',
    name: '테스트 사용자',
  };
}
