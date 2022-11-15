import { z } from 'zod'
import { requiredAndInvalidPropMessage, invalidTypeMessage } from './zodUtils'

export const createTaskBody = z.object({

  // props do owner

    // obrigatórias
    name:        z.string( requiredAndInvalidPropMessage('name', 'string') ),
    pomodorable: z.boolean( requiredAndInvalidPropMessage('pomodorable', 'bool') ),
    isUrgent:    z.boolean( requiredAndInvalidPropMessage('isUrgent', 'bool') ),

    // de tipo DateTime
    concludedAt: z.string( invalidTypeMessage('concludedAt', 'string') ).nullable(),
    deadline:    z.string( invalidTypeMessage('deadline', 'string')).nullable(),

    // props objetos

    // tag: z.object({
    //   areaId:    z.string( invalidTypeMessage('areaId', 'string') ).nullable(),
    //   subAreaId: z.string( invalidTypeMessage('subAreaId', 'string') ).nullable(),
    // }),
    
    // demais props
    description:       z.string({invalid_type_error: 'concludedAtmust be a string in DateTime timestamp format'}).nullable(),
    estimatedSessions: z.number({invalid_type_error: 'estimatedSessions must be a number'}).nullable(),
    doneSessions:      z.number({invalid_type_error: 'doneSessions must be a number'}).nullable(),
    closed:            z.boolean({invalid_type_error: 'closed must be a bool'}).nullable(),

})