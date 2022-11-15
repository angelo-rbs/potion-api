import { z } from 'zod'

export function invalidTypeMessage(name: string, type: string) {
  return { invalid_type_error: `${name} must be of type ${type}`}
}

export function requiredPropMessage(name: string) {
  return { required_error: `${name} is required`}
}

export function requiredAndInvalidPropMessage(name: string, type:string) {
  return { ...requiredPropMessage(name), ...invalidTypeMessage(name, type)}
}