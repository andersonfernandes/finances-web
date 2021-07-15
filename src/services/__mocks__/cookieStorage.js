const CookieStorageMock = {
  set: jest.fn(),
  get: jest.fn(),
  remove: jest.fn(),
  Keys: {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
  }
}

export default CookieStorageMock
