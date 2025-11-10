const steps = [
  {
    id: 1,
    title: "Shopping Cart",
  },
  {
    id: 2,
    title: "Shipping Address",
  },
];
export default function StepsPayment({ activeStep }: { activeStep: number }) {
  return (
    <div className="flex  flex-col lg:flex-row items-center gap-8 lg:gap-16">
      {steps.map((step) => (
        <div
          className={`flex items-center  gap-2 border-b-2 pb-4 ${
            step.id === activeStep ? "border-gray-800" : "border-gray-200"
          }`}
          key={step.id}
        >
          <div
            className={`w-6 h-6 rounded-full text-white p-4 flex items-center justify-center ${
              step.id === activeStep ? "bg-gray-800" : "bg-gray-400"
            }`}
          >
            {step.id}
          </div>
          <p
            className={`text-sm font-medium ${
              step.id === activeStep ? "text-gray-800" : "text-gray-400"
            }`}
          >
            {step.title}
          </p>
        </div>
      ))}
    </div>
  );
}
