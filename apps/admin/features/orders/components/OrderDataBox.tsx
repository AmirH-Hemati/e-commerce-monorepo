import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderClient } from "@repo/validation";
import Image from "next/image";
export default function OrderDataBox({ order }: { order: OrderClient }) {
  return (
    <Card className="p-0 overflow-hidden mt-4">
      <CardHeader className="bg-purple-600 p-3  flex flex-row justify-between items-center ">
        <span className="font-medium text-sm">
          Date Order : {new Date(order.createdAt).toLocaleString("en-US")}
        </span>
      </CardHeader>

      <CardContent className="flex-1 px-3 space-y-6 ">
        <CardTitle className="text-sm font-medium">
          <span>Order By : </span>
          <span>{order?.userId?.name}</span>
        </CardTitle>
        <div className="flex gap-2 items-center justify-between font-medium text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <h3>Address : </h3>
            <span>{order?.address?.city} ,</span>
            <span>{order?.address?.address}</span>
          </div>
          <span>phone : {order?.address?.phone}</span>
        </div>

        <div className=" mt-4">
          {order?.orderItems?.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-y  p-2 rounded-md"
            >
              <div className="flex items-center gap-2">
                <div className="border-2 w-12 h-12 relative rounded-md overflow-hidden">
                  <Image
                    src={
                      item?.productId?.images?.find(
                        (image) => image.color === item.selectedColor
                      )?.image || ""
                    }
                    alt={item.name}
                    fill
                    className="object-cover "
                    unoptimized
                  />
                </div>
                <span className="font-medium text-sm">{item.name}</span>
              </div>
              <div className="flex gap-2 text-xs  font-medium">
                <span className="text-muted-foreground">
                  Quantity : {item.quantity} ,{" "}
                </span>
                <span>Color : {item.selectedColor} , </span>
                <span className="text-muted-foreground">
                  Size : {item.selectedSize}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-300 p-2 my-5">
          <span className="text-green-800 font-semibold ">
            Total Price : {order.totalAmount ? order.totalAmount : "NOT PAID"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
