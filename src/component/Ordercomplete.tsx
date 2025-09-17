import { AiOutlineCheckCircle } from "react-icons/ai";


const Ordercomplete = () => {



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Icon + Animation */}
      <div className="text-green-500 text-[5rem] animate-bounce">
        <AiOutlineCheckCircle />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mt-4 mb-2 animate-fadeIn">
        Order Placed Successfully!
      </h1>

      <p className="text-gray-600 mb-6 animate-fadeIn delay-200">
        Thank you for your purchase. Your order is being processed.
      </p>

    </div>
  );
};

export default Ordercomplete;
