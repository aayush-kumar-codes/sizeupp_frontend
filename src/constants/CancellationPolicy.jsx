import React from 'react';

const CancellationPolicy = () => {
  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 mb-24">
      <h1 className="text-3xl font-bold ">Cancellation Policy</h1>

      <p>
        <strong>How do I cancel an order?</strong><br />
        You can cancel your order online before the product has been shipped. Your entire order amount will be refunded.
      </p>

      <p className="mt-4">
        <strong>In order to cancel an item in your order:</strong>
      </p>

      <ul className="list-disc ml-6 mt-2">
        <li>Log into your Sizeupp Store account and go to the 'My Orders' page</li>
        <li>Identify the item you want to cancel and click on the corresponding 'View Details' link</li>
        <li>In the detailed order page, you will see 'Cancel' links against each of the items in that order</li>
        <li>Click on the 'Cancel' link, indicate the reason for cancellation, choose a mode of refund, and confirm cancellation</li>
      </ul>

      <p className="mt-4">
        Once your cancellation request is created, we will ensure that the cancellation is processed as soon as possible.
        Unfortunately, an order cannot be canceled once the item has been shipped.
        Kindly feel free to reject the order once it reaches you.
      </p>

      <p className="mt-6">
        <strong>How long will it take to process my cancellation request?</strong>
      </p>

      <p>
        Once you request the cancellation of item(s) in your order, it will take us a maximum of 1-2 business days to cancel the order and initiate a refund. 
        You will be notified of the same by email.
      </p>

      <p className="mt-4">
        The refund mode will be back to the source (same debited account), and the amount will reflect in your account within 6-7 business days.
        Please get in touch with the banks directly in case of any delays post confirmation of cancellation/refund by Sizeupp Store.
      </p>

      <p className="mt-6">
        <strong>What are the modes of refund available after cancellation?</strong>
      </p>

      <p>
        In order to confirm the cancellation of item(s) in your order, you need to indicate your refund preference.
      </p>

      <p className="mt-4">
        <strong>Modes of refund:</strong>
      </p>

      <ul className="list-disc ml-6 mt-2">
        <li>
          <strong>Back to Source -</strong> In this case, within 6-7 working days, the money will be refunded back to the payment mode/account that was originally used to make the transaction.
        </li>
      </ul>

      <p className="mt-4">
        Once you have requested the cancellation of item(s) in your order, Sizeupp Store will complete the cancellation and initiate the refund, depending on your preference.
      </p>
    </div>
  );
};

export default CancellationPolicy;
