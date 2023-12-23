import React, { useState } from 'react';

const Faq = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">FAQs</h1>

      {/* Account Section */}
      <div className="mb-4">
        <div
          className="cursor-pointer border-b border-gray-300 flex justify-between items-center py-2"
          onClick={() => toggleSection('account')}
        >
          <h2 className="text-xl font-semibold">Account</h2>
          <span className="text-blue-500">{activeSection === 'account' ? '▼' : '▶'}</span>
        </div>

        {activeSection === 'account' && (
          <div className="pl-4 mt-2">
            <Dropdown
              question="How do I create an account?"
              answer="You can simply click on the sign-up button, fill in the required sections, and you are registered with us."
            />
           <Dropdown
              question="How do I change my password?"
              answer="Customers may change their password at any time. All you may need to do is please click on https://sizeupp.com/account/login then select on `Forgot Your Password`. Enter your registered email address in the provided box and follow the password reset link to change your password"
                      />
            <Dropdown
              question="I forgot my password. What should I do now?"
              answer="Please click on https://sizeupp.com/account/login  then click on `Forgot Your Password.` Please submit your email address and follow the password reset link to change your password"
            />          
          </div>
        )}
      </div>

      {/* Order Section */}
      <div className="mb-4">
        <div
          className="cursor-pointer border-b border-gray-300 flex justify-between items-center py-2"
          onClick={() => toggleSection('order')}
        >
          <h2 className="text-xl font-semibold">Order</h2>
          <span className="text-blue-500">{activeSection === 'order' ? '▼' : '▶'}</span>
        </div>

        {activeSection === 'order' && (
          <div className="pl-4 mt-2">
            <Dropdown
                question="How do I view my active orders?"
                answer="Please click on the CART link on top of the page to see your active orders."
                />

                <Dropdown
                question="How do I view my past orders?"
                answer="Please login into your account to view your past orders."
                />

                <Dropdown
                question="How do I know if my order has been placed successfully?"
                answer="When you place an order, you will receive a confirmation email and SMS along with an estimated time frame of delivery. You can also check your order under the My Orders tab."
                />

                <Dropdown
                question="My order hasn't yet arrived"
                answer="Once your order has been placed, you will receive an email with a tentative shipping and delivery date. Alternatively, please check the status of your order under the My Orders tab."
                />

                <Dropdown
                question="How can I modify my order?"
                answer="Unfortunately, at this time, we do not allow modifications to orders that have been placed. If you’ve changed your mind about a product, you may cancel the order before it's shipped and place a fresh order. In case it's shipped, you will have to return the order, and a full refund will be issued against the order once received by us."
                />
          </div>
        )}
      </div>

      {/* Shipping Section */}
      <div className="mb-4">
        <div
          className="cursor-pointer border-b border-gray-300 flex justify-between items-center py-2"
          onClick={() => toggleSection('shipping')}
        >
          <h2 className="text-xl font-semibold">Shipping</h2>
          <span className="text-blue-500">{activeSection === 'shipping' ? '▼' : '▶'}</span>
        </div>

        {activeSection === 'shipping' && (
          <div className="pl-4 mt-2">
            <Dropdown
                question="How many days does it take to ship the products?"
                answer="Let’s break it down to make it easy for you. It takes 1-2 working days to ship within the city, 2-3 days within the state, 3-5 working days in Metropolitan Cities, and 5-7 days anywhere in India."
                />

                <Dropdown
                question="How do I add/remove a shipping address?"
                answer="Please login to your account and click on the View Addresses link to add/remove a shipping address."
                />

                <Dropdown
                question="Do we ship international?"
                answer="No, we don’t ship international as of now."
                />
          </div>
        )}
      </div>

      {/* Payment Section */}
      <div className="mb-4">
        <div
          className="cursor-pointer border-b border-gray-300 flex justify-between items-center py-2"
          onClick={() => toggleSection('payment')}
        >
          <h2 className="text-xl font-semibold">Payment</h2>
          <span className="text-blue-500">{activeSection === 'payment' ? '▼' : '▶'}</span>
        </div>

        {activeSection === 'payment' && (
          <div className="pl-4 mt-2">
            
<Dropdown
  question="What payment methods are accepted?"
  answer="At present, we accept payment via Net-Banking, UPI, Debit and Credit Cards."
/>

<Dropdown
  question="My order was unsuccessful, but my account was still debited. What should I do now?"
  answer="If your card is debited by mistake, don’t worry. Failed transactions are normally automatically reversed within 7 business days. This time-frame can vary from bank to bank, so please contact your bank for further info."
/>

<Dropdown
  question="Help, I’ve been charged twice!"
  answer="This is very unlikely. However, if you believe that you’ve been mistakenly charged multiple times for the same order, please write to us with screenshots of your bank statement at customercare@sizeupp.com. We will do our best to resolve your issue."
/>

          </div>
        )}
      </div>

      {/* Returns Section */}
      <div className="mb-4">
        <div
          className="cursor-pointer border-b border-gray-300 flex justify-between items-center py-2"
          onClick={() => toggleSection('returns')}
        >
          <h2 className="text-xl font-semibold">Returns</h2>
          <span className="text-blue-500">{activeSection === 'returns' ? '▼' : '▶'}</span>
        </div>

        {activeSection === 'returns' && (
          <div className="pl-4 mt-2">
            <p></p>
                      {/* Additional returns-related questions go here */}
                      
                <Dropdown
                question="Can I return part or all of my order at the time of delivery?"
                answer="Can I return part or all of my order at the time of delivery?
                Instant returns are not possible. Products will have to be sent back after initiating a reverse pick-up request or by self-shipping if reverse pick-up is not available."
                />
          </div>
        )}
      </div>
    </div>
  );
};
const Dropdown = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="mb-2">
        <div
          className="cursor-pointer border-b border-gray-300 flex justify-between items-center py-2"
          onClick={toggleDropdown}
        >
          <h3 className="text-lg font-medium">{question}</h3>
          <span className={`text-blue-500 ${isOpen ? 'transform rotate-180' : ''}`}>▼</span>
        </div>
  
        {isOpen && (
          <div className="pl-4">
            <p className="text-md">{answer}</p>
          </div>
        )}
      </div>
    );
  };
  
export default Faq;
