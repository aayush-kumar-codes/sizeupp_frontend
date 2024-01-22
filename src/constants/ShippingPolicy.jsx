import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Shipping Policy</h1>

      <p>
        We offer FREE SHIPPING on some products, and the same will be specified on the product description page.
      </p>

      <p>
        Octroi charges, wherever applicable, are prepaid and not to be borne by the customer.
      </p>

      <p>
        It is our endeavor to ship all items in your order together; however, this may not always be possible due to product characteristics or availability.
      </p>

      <p>
        There may be restrictions on accepting orders for delivery in certain pin codes as a product cannot be shipped to those destinations. In such scenarios, the order will not be accepted online, and a message will be displayed requesting you to provide an alternate pin code.
      </p>

      <p>
        Currently, each order may be shipped only to a single shipping address. If you wish to ship products to different addresses, you need to place a different order for each shipping address. The delivery speeds are available up to 7 business days.
      </p>

      <p>
        Email us at <a href="mailto:customercare@sizeupp.com" className="text-blue-500">customercare@sizeupp.com</a> or call our care number <a href="tel:+918655255488" className="text-blue-500">8655255488</a> in case of any assistance.
      </p>
    </div>
  );
};

export default ShippingPolicy;
