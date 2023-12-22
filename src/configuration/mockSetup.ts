import { setupMock } from './mockService';

export function configureMockIfNotSetup(isMockSetup: boolean): boolean {
  if (!isMockSetup) {
    setupMock();
    return true;
  }
  return false;
}
