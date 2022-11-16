import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'

import { createTaskBody, createUserBody, createTagBody } from './utils/schemaValidation'

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

  fastify.post('/users', async (req, res) => {

    const { name, email, password } = createUserBody.parse(req.body)

    try {
      await prisma.user.create({
        data: {
          name,
          email, 
          password,
        }
      })
    } catch (e) {

    }

    return res.status(201).send({ name, email })
  })

  fastify.post('/tags', async (req, res) => {
    
    const { areaId, subAreaId } = createTagBody.parse(req.body)

    await prisma.tag.create({
      data: {
        areaId,
        subAreaId,
      }
    })

    return res.status(201).send({ areaId, subAreaId })
  })

  

  await fastify.listen({ port: 3333 })
}

start()