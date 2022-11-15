import Fastify from 'fastify'
import cors from '@fastify/cors'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

import { createTaskBody } from './utils/schemaValidation'

async function start() {
  const fastify = Fastify({
    logger: true
  })

  // moca o acesso à API ao indicado em origin. true indica acesso livre
  await fastify.register(cors, { 
    origin: true,
  })

  const prisma = new PrismaClient({
    log: ['query'],
  })

  fastify.get('/tasks/count', async () => {
    const count = await prisma.task.count()

    return { count }
  })

  fastify.post('/tasks', async (req, res) => {

    // zod faz o schema-validation e tipa as propriedades

    const parsedTaskProps = createTaskBody.parse(req.body)

    await prisma.task.create({
      data: {

        User: {
          connect: {
            id: "1", // usando um mesmo owner pras tasks criadas enquanto não implemento findById
          }
        },

        tag: {
          create: {}
        },

        ...parsedTaskProps
      }
    })

    return res.status(201).send({ ...parsedTaskProps })
  })

  fastify.get('/users')

  fastify.post('/users', (req, res) => {

    const createUserBody = z.object({
      name: z.string()
    })

    const { name } = createUserBody.parse(req.body)

    return res.status(201).send({ name })
  })

  await fastify.listen({ port: 3333 })
}

start()