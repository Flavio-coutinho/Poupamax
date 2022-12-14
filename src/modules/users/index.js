import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { prisma } from "~/data";
import { decodeBasicToken } from './services'
import './model'


// TODO: Login
export const login = async (ctx) => {
  try {
    const [ email, password] = decodeBasicToken(
      ctx.request.headers.authorization
    )

    const user = await prisma.user.findUnique({
      where: {
        email, password
      },
    })

    if (!user) {
      ctx.status = 404;
      return;
    }

    // const passwordEqual = await bcrypt.compare(password, user.password)

    // if (!passwordEqual) {
    //   ctx.status = 404;
    //   return;
    // }

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET)
    ctx.body = { user, token };
  } catch (error) {
    console.log(error)
    if(error.custom){
      ctx.status = 400;
      return
    }

    ctx.status = 500
    ctx.body = 'Algo deu errado, tente novamente';
    return;
  }
}


// TODO: Listar usuários
export const list = async (ctx,) => {
  try {
    const users = await prisma.user.findMany();
    ctx.body = users;
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Algo deu errado, tente novamente';
    return;
  }
}


// TODO: Criar usuário
export const create = async (ctx,) => {
  try {
    const saltRounds = 10

    const hashedPassword = await bcrypt.hash(ctx.request.body.password, saltRounds)

    const user = await prisma.user.create({
      data: {
        name: ctx.request.body.name,
        email: ctx.request.body.email,
        password: hashedPassword,
      }
    })

    ctx.body = user
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Algo deu errado, tente novamente';
  }
}


// TODO: Actualizar usuário
export const update = async (ctx,) => {
  const { name, email } = ctx.request.body;

  try {
    const user = await prisma.user.update({
      where: {
        id: ctx.params.id
      },
      data: { name, email }
    })

    ctx.body = user
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Algo deu errado, tente novamente';
  }
}


// TODO: Deletar usuário
export const remove = async (ctx,) => {
  try {
    await prisma.user.delete({
      where: {
        id: ctx.params.id
      },
    })

    ctx.body = { id: ctx.params.id }
  } catch (error) {
    ctx.status = 500
    ctx.body = 'Algo deu errado, tente novamente';
  }
}


