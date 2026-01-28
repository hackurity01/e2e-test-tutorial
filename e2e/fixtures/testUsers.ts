export const TEST_USERS = {
  demo: {
    email: "demo@breeze.com",
    password: "demo1234",
  },
} as const;

export const generateTestEmail = (): string => {
  const timestamp = Date.now();
  return `test-${timestamp}@example.com`;
};

export const TEST_USER_DATA = {
  name: "테스트 사용자",
  password: "test123456",
} as const;
