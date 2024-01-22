import React from 'react';

const CancellationPolicy = () => {
  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 mb-24">
      <h1 className="text-3xl font-bold ">Cancellation Policy</h1>

      <h2 className='text-2xl font-bold mt-6'>How do I cancel an order ?</h2>
      <p>
        You can cancel your order online before the product has been shipped. Your entire order amount will be refunded.
        <br />
        In order to cancel an item in your order:<br />
        <ul>
          <li>
            log into your Sizeupp Online store account and go to the 'My Orders' page.</li>
          <li>
            Identify the item you want to cancel and click on the corresponding 'View Details' link.
          </li>
          <li>In the detailed order page, you will see 'Cancel' links against each of the items in that order.</li>
          <li>Click on the 'Cancel' link, indicate the reason for cancellation, choose a mode of refund and confirm cancellation.</li>
          <li>Once your cancellation request is created, we will ensure that the cancellation is processed as soon as possible.</li>
        </ul>
        <br />
        Unfortunately, an order cannot be cancelled once the item has been shipped.
        <br />
        Kindly feel free to reject the order once it reaches to you.
      </p>

      <h2 className='text-2xl font-bold mt-6'>How long will it take to process my cancellation request?</h2>
      <p>
        Once you request the cancellation of item(s) in your order, it will take us a maximum of 1-2 business days to cancel the order and initiate a refund. You will be notified of the same by email.<br />
        The refund mode will be back to its original source of transaction. The refunded amount will reflect in your account in 6-7 days business days for the respective banks to process the refund. Please get in touch with the banks directly in case of any delays post confirmation of cancellation/refund by Sizeupp Online store.
      </p>


      <h2 className='text-2xl font-bold mt-6'>What are the modes of refund available after cancellation?</h2>
      <p>
        In order to confirm cancellation of item(s) in your order, you need to indicate your refund preference.<br />
        Modes of refund:
        <br />
        <ul>
          <li>
            <span className='underline'>Back to Source</span> - In this case, within working days the money will be refunded back to the payment mode/account that was originally used to make the transaction.
            <br/>
            Once you have requested the cancellation of item(s) in your order, Sizeupp Online store will complete the cancellation and initiate the refund, depending on your preference.

          </li>
        </ul>
      </p>
    </div>
  );
};

export default CancellationPolicy;
