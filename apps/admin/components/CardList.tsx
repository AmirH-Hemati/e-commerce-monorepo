import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { ProductsList, Orders } from "@repo/validation";
import Image from "next/image";

const CardList = ({
  title,
  orders,
  products,
}: {
  title: string;
  products?: ProductsList | undefined;
  orders?: Orders | undefined;
}) => {
  if (!orders || !products) return <p>{title} not found</p>;
  return (
    <ScrollArea className=" rounded-md h-96  ">
      <div className="">
        <h1 className="text-lg font-medium mb-6">{title}</h1>
        <div className="flex flex-col gap-2">
          {title === "Popular Products"
            ? products.map((item) => (
                <Card
                  key={item._id}
                  className="flex-row items-center justify-between gap-4 p-4"
                >
                  <div className="w-12 h-12 rounded-sm relative overflow-hidden">
                    {/* <Image
                      src={Object.values(item.images)[0] || ""}
                      alt={item.name}
                      fill
                      className="object-cover"
                    /> */}
                  </div>
                  <CardContent className="flex-1 p-0">
                    <CardTitle className="text-sm font-medium">
                      {item.name}
                    </CardTitle>
                  </CardContent>
                  <CardFooter className="p-0">${item.price}</CardFooter>
                </Card>
              ))
            : orders.map((item) => (
                <Card
                  key={item._id}
                  className="flex-row items-center justify-between gap-4 p-4"
                >
                  <div className="w-12 h-12 rounded-sm relative overflow-hidden">
                    <Image
                      src={item.orderItems[0]?.productId.images[0].image || ""}
                      alt={item.orderItems[0]?.productId.name || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="flex-1 p-0">
                    <CardTitle className="text-sm font-medium">
                      {/* {item.orderItems} */}
                    </CardTitle>
                    <p className="text-sm ">
                      Date Order :
                      {new Date(item.createdAt).toLocaleDateString("en-US")}
                    </p>
                  </CardContent>
                  <Badge variant="secondary">{item.status}</Badge>
                  <CardFooter className="p-0">
                    {item.totalAmount || "Not Paid"}
                  </CardFooter>
                </Card>
              ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default CardList;
