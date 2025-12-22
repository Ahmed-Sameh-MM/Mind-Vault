import { Button } from "@/components/button"
import { LabeledInput } from "@/components/labeled_input"
import { Label } from "@/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select"

import { addItem } from "./db/actions";
import { ItemClass, ItemClassSchema } from "./model_classes/item_class";

import { Plus } from "lucide-react";

export default async function Home() {

  async function getItemClasses(): Promise<ItemClass[]> {
    const response = await fetch("http://localhost:3000/api/get-item-classes");

    const itemClasses = await response.json();

    return ItemClassSchema.array().parse(itemClasses);
  }

  const itemClasses = await getItemClasses();

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

        <Label>Select or Create a Class!</Label>

        <Select name="class">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Class" />
          </SelectTrigger>
          <SelectContent>
            {itemClasses.map(cls => (
              <SelectItem value={String(cls.id)}>{cls.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <br />

        <Button variant={"outline"} size="icon">
          <Plus />
        </Button>

        <br />

        <Button variant={"outline"} type="submit">Add Item</Button>
      </form>
    </main>
  );
}
