import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { ProductsList, Orders } from "@repo/validation";
import Image from "next/image";
import Link from "next/link";

const CardList = ({
  title,
  orders,
  products,
}: {
  title: string;
  products?: ProductsList | undefined;
  orders?: Orders | undefined;
}) => {
  return (
    <ScrollArea className=" rounded-md h-96  ">
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      <div className="flex flex-col gap-2">
        {products &&
          products?.length > 0 &&
          products.map((product) => (
            <Card
              key={product._id}
              className="flex-row items-center justify-between gap-4 p-2"
            >
              <div className="w-12 h-12 rounded-sm relative overflow-hidden">
                <Image
                  src={Object.values(product.images)[0]?.image || ""}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="flex-1 p-0">
                <CardTitle className="text-md font-medium">
                  {product.name}
                </CardTitle>
              </CardContent>
              <CardFooter className="p-0 font-semibold  text-sm text-primary">
                ${product.price}
              </CardFooter>
            </Card>
          ))}

        {orders &&
          orders?.length > 0 &&
          orders.map((item) => (
            <Card
              key={item._id}
              className="flex-row items-center justify-between gap-4 p-4"
            >
              <CardContent className="flex-1 p-0 ">
                <p className="text-xs font-medium flex-1 ">
                  Date Order :
                  {new Date(item.createdAt).toLocaleDateString("en-US")}
                </p>
              </CardContent>
              <Badge variant="secondary">{item.status}</Badge>
              <span className="text-primary font-semibold text-sm">
                {item.totalAmount}
              </span>
              <CardFooter className="p-0">
                <Link
                  href={`/orders/${item._id}`}
                  className="bg-foreground hover:bg-foreground/90 text-muted rounded-md text-xs px-2 py-1 font-medium"
                >
                  see deatils
                </Link>
              </CardFooter>
            </Card>
          ))}
      </div>
    </ScrollArea>
  );
};

export default CardList;
