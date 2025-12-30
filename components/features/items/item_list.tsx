import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Item, ItemSchema } from "@/app/model_classes/item";
import { ItemCategory } from "@/app/model_classes/item_category";

async function getItems(): Promise<Item[]> {
    const response = await fetch("http://localhost:3000/api/get-items");

    const items = await response.json();

    return ItemSchema.array().parse(items);
}

export default async function ItemList({ itemCategories }: { itemCategories: ItemCategory[] }) {

  const items = await getItems();

  // Map categoryId -> categoryName
  const categoryMap = itemCategories.reduce((acc, cat) => {
    acc[cat.id] = cat.name;

    return acc;
  }, {} as Record<number, string>);

  // Group items by categoryId
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.categoryId]) {
        acc[item.categoryId] = [];
    }

    acc[item.categoryId].push(item);
    
    return acc;
  }, {} as Record<number, Item[]>);

  return (
    <div className="flex gap-6 p-6 overflow-x-auto">
      {Object.entries(groupedItems).map(([categoryIdStr, items]) => {
        const categoryId = parseInt(categoryIdStr, 10);
        
        const categoryName = categoryMap[categoryId];

        return (
          <div key={categoryId} className="min-w-[200px]">
            <h2 className="text-xl font-bold mb-2">{categoryName}</h2>
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                  </CardHeader>
                  {item.description && (
                    <CardContent>
                        <CardDescription>{item.description}</CardDescription>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
