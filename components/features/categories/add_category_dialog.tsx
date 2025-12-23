"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

import { Plus } from "lucide-react"

import { addItemCategory } from "@/app/db/actions"

export function AddCategoryDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
          <Button variant="outline" size="icon">
          <Plus />
          </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
          <form action={addItemCategory}>
          <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
              <div className="grid gap-3">
              <Input
                  name="name"
                  id="item_category_input"
                  type="text"
                  placeholder="Enter a new Category Here!"
              />
              </div>
          </div>

          <DialogFooter>
              <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add</Button>
          </DialogFooter>
          </form>
      </DialogContent>
    </Dialog>
  )
}
