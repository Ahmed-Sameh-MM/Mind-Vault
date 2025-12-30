import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LabeledInput } from "@/components/labeled_input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddCategoryDialog } from "@/components/features/categories/add_category_dialog";
import ItemList from "@/components/features/items/item_list";
import { AuthButton } from "@/components/supabase/auth-button";

import { addItem } from "@/app/db/actions";
import { ItemCategory, ItemCategorySchema } from "@/app/model_classes/item_category";
import { requireAuth } from "@/lib/auth/guards";

async function getItemCategories(): Promise<ItemCategory[]> {
  const response = await fetch("http://localhost:3000/api/get-item-categories");

  const itemCategories = await response.json();

  return ItemCategorySchema.array().parse(itemCategories);
}

export default async function Home() {

  await requireAuth();

  const itemCategories = await getItemCategories();

  return (
    <main>
      <h1>Mind Vault</h1>

      <br />

      <AuthButton />

      <h1>Items</h1>

      <br />

      <ItemList itemCategories={itemCategories}/>

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
          label="Item Description (Optional)"
          id="item_description_input"
          type="text"
          placeholder="Enter Description Here!"
        />

        <br />

        <Label>Select or Create a Category!</Label>

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
