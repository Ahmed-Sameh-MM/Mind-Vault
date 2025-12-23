import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { LabeledInput } from "@/components/labeled_input"
import { Label } from "@/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/dialog"

import { addItem, addItemCategory } from "./db/actions";
import { ItemCategory, ItemCategorySchema } from "./model_classes/item_category";

import { Plus } from "lucide-react";

export default async function Home() {

  async function getItemCategories(): Promise<ItemCategory[]> {
    const response = await fetch("http://localhost:3000/api/get-item-categories");

    const itemCategories = await response.json();

    return ItemCategorySchema.array().parse(itemCategories);
  }

  const itemCategories = await getItemCategories();

  return (
    <main>
      <h1>Fluid</h1>

      <br />
      <br />

      <form action={addItem}>
        <LabeledInput
          name="name"
          label="Item Name"
          id="item_name_input"
          type="text"
          placeholder="Enter Name Here!"
        />

        <br />

        <LabeledInput
          name="description"
          label="Item Description"
          id="item_description_input"
          type="text"
          placeholder="Enter Description Here!"
        />

        <br />

        <Label>Select or Create a Cateogry!</Label>

        <Select name="category">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {itemCategories.map(cls => (
              <SelectItem key={cls.id} value={String(cls.id)}>{cls.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <br />

        <Button variant="outline" type="submit">Add Item</Button>
      </form>

      <br />
      
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
    </main>
  );
}
