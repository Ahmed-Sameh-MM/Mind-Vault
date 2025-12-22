import { z } from "zod"

export const ItemClassSchema = z.object({
  id: z.int(),
  name: z.string(),
})

export type ItemClass = z.infer<typeof ItemClassSchema>
