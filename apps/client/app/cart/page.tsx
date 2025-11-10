"use client";

import { useSearchParams } from "next/navigation";

import ShippingForm from "@/components/ShippingForm";
import StepsPayment from "@/features/order/components/StepsPayment";
import useCartStore from "@/stores/cartStore";
import CartItems from "./CartItems";
import PaymentDetails from "@/features/order/components/PaymentDetails";

const CartPage = () => {
  const searchParams = useSearchParams();
  const { cart } = useCartStore();
  const activeStep = parseInt(searchParams.get("step") || "1");

  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>

      <StepsPayment activeStep={activeStep} />

      <div className="w-full flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-7/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          {activeStep === 1 ? (
            <CartItems />
          ) : activeStep === 2 && cart.length > 0 ? (
            <ShippingForm cart={cart} />
          ) : (
            <p className="text-sm text-gray-500">
              Please Select Product to continue.
            </p>
          )}
        </div>

        <PaymentDetails activeStep={activeStep} />
      </div>
    </div>
  );
};

export default CartPage;
