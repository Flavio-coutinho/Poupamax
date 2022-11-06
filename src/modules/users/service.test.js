import { decodeBasicToken } from './services'


describe('User services', () => {

  it('should return credentials  by basic authentication token', () => {

    // Preparação
    const email = 'coutinhol@gmail.com';
    const password = '123456';
    const token = Buffer.from(`${email}:${password}`, 'utf8').toString('base64')
    const basicToken = `Basic ${token}`

    // Execução
    const result = decodeBasicToken(basicToken)

    // Expectação
    expect(result).toEqual([email, password])
  })

  it('should throw new error when token is not Basic type', () => {

    // Preparação
    const email = 'coutinhol@gmail.com';
    const password = '123456';
    const token = Buffer.from(`${email}:${password}`, 'utf8').toString('base64')
    const basicToken = `Bearer ${token}`

    // Execução
    const result = () => decodeBasicToken(basicToken)

    // Expectação
    expect(result).toThrowError('Wrong token type')
  })

  it('should throw new error when credentials is not on correct format', () => {

    // Preparação
    const email = 'coutinhol@gmail.com';
    const password = '123456';
    const token = Buffer.from(`${email}${password}`, 'utf8').toString('base64')

    const basicToken = `Basic ${token}`

    // Execução
    const result = () => decodeBasicToken(basicToken)

    // Expectação
    expect(result).toThrowError('Wrong credentials format')
  })


  it('should throw new error when credentials is not base64 encoded', () => {

    // Preparação
    const email = 'coutinhol@gmail.com';
    const password = '123456';
    const token = `${email}:${password}`

    const basicToken = `Basic ${token}`

    // Execução
    const result = () => decodeBasicToken(basicToken)

    // Expectação
    expect(result).toThrowError('Wrong credentials is not correct encoded')
  })

})
