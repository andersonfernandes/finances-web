export const authenticate = async ({ email }) => {
  if (email === 'invalid_user@mail.com') {
    jest.fn().mockRejectedValue('API Error')
  } else {
    jest.fn().mockResolvedValue({
      status: 200,
      data: {
        access_token: 'access_token_1234',
        refresh_token: 'refresh_token_1234',
      }
    })
  }
}
