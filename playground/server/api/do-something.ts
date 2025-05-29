import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  throw new Error('Error sent manually from back-end')
})
