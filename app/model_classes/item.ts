import { z } from "zod"

export const ItemSchema = z.object({
  id: z.int(),
  name: z.string(),
  description: z.string(),
  categoryId: z.int(),
  createdAt: z.string(),
})

export type Item = z.infer<typeof ItemSchema>
