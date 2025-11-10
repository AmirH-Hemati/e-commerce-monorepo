import useCartStore from "@/stores/cartStore";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export default function CartItems() {
  const { cart, handelDeleteProduct } = useCartStore();
  if (cart.length === 0)
    return <p className="text-sm text-gray-500">Item does not exist</p>;
  return cart.map((item) => (
    <div
      className="flex items-center justify-between"
      key={item._id + item.selectedSize + item.selectedColor}
    >
      <div className="flex gap-8">
        {/* IMAGE */}
        <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
          <Image
            src={
              item.images.find((image) => image.color === item.selectedColor)
                ?.image || ""
            }
            alt={item.name}
            fill
            unoptimized
            className="object-cover"
          />
        </div>
        {/* ITEM DETAILS */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-xs text-gray-500">Quantity: {item.qty}</p>
            <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
            <p className="text-xs text-gray-500">Color: {item.selectedColor}</p>
          </div>
          <p className="font-medium">${item.price.toFixed(2)}</p>
        </div>
      </div>
      {/* DELETE BUTTON */}
      <div>
        <button
          className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 text-red-400 flex items-center justify-center cursor-pointer"
          onClick={() => handelDeleteProduct(item)}
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  ));
}
