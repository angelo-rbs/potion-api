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

    const {
      name, isUrgent, pomodorable, closed, concludedAt, deadline, description,
      doneSessions, estimatedSessions, ownerId, tagId 
    } = createTaskBody.parse(req.body)

    try {
      await prisma.task.create({
        data: {
          name, isUrgent, pomodorable, closed, concludedAt, deadline, description,
          doneSessions, estimatedSessions,
          
          user: {
            connect: {
              id: ownerId,
            }
          },
  
          tag: {
            connect: {
              id: tagId,
            }
          },  
        }
      })
    } catch (err) {

    }
    

    return res.status(201).send({ name, isUrgent, pomodorable, closed, concludedAt, deadline, description,
                                  doneSessions, estimatedSessions,ownerId, tagId })
    
  })

  //fastify.get('/users')            // acesso com id dinâmico?

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