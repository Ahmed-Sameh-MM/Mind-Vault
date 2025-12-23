import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { LabeledInput } from "@/components/labeled_input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AddCategoryDialog } from "@/components/features/categories/add_category_dialog";

import { addItem } from "./db/actions";
import { ItemCategory, ItemCategorySchema } from "./model_classes/item_category";

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
          required
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
      
      <AddCategoryDialog />
    </main>
  );
}
