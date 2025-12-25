import { Label } from "@/components/ui/label";

import { Item, ItemSchema } from "../model_classes/item";

export default async function Home() {

  async function getItems(): Promise<Item[]> {
    const response = await fetch("http://localhost:3000/api/get-items");

    const items = await response.json();

    return ItemSchema.array().parse(items);
  }

  const items = await getItems();

  return (
    <main>
      <h1>Items</h1>

      <br />

      {items.map(cls => (
        <div>
          <Label key={cls.id}>Name: ({cls.name}), Description: ({cls.description}), Category: ({cls.categoryId})</Label>
          <br />
        </div>
      ))}
    </main>
  );
}
