import { PaystackButton } from "react-paystack";

interface PayementGatewayProps {
  onCancelPayment: () => void;
  amount: number;
}

const PayementGateway = ({ onCancelPayment, amount }: PayementGatewayProps) => {
  const config = {
    currency: "KES",
    reference: new Date().getTime().toString(),
    email: "vvdkh.group@gmail.com",
    amount: amount * 10000,
    publicKey: "pk_test_1f7e46a3cc7f4ef52a18454d8c93a54f0bf6cd1f",
  };
  const handlePaystackSuccessAction = (reference: any) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Pay",
    className: "btn btn-sm mt-2",
    onSuccess: (reference: any) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  const handleCancelPayment = () => {
    onCancelPayment();
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className=" bg-white p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900">Confirm Purchase</h2>
          <p className="text-black">
            Are you sure you want to buy this artwork?
          </p>
          <div className="flex justify-end ">
            <PaystackButton {...componentProps} />
            <button
              onClick={() => handleCancelPayment()}
              className="btn btn-sm mt-2 ml-2 btn-accent"
              type="submit"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayementGateway;
