import { randomUUID } from "crypto";

export type Credentials = {
  email: string;
  password: string;
};

export type SignupUser = Credentials & {
  name: string;
};

export const demoUser: SignupUser = {
  name: "Demo User",
  email: "demo@breeze.com",
  password: "demo1234",
};

export function createUniqueSignupUser(overrides: Partial<SignupUser> = {}): SignupUser {
  return {
    name: "E2E Student",
    email: `e2e_${randomUUID()}@breeze.com`,
    password: "e2e12345",
    ...overrides,
  };
}

