import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p>
        This privacy statement describes how Sizeupp collects and uses the personal information you provide on our website: <a href="https://www.sizeupp.in" className="text-blue-500">www.sizeupp.in</a>. It also describes the choices available to you regarding our use of your personal information and how you can access and update this information. We are committed to protecting your privacy. We do not sell, share or rent your personal information to third parties. We collect information about you for 2 reasons: firstly, to process your order and second, to provide you with the best possible service.
      </p>

      <h2 className="text-2xl font-bold mt-6">Personally Identifiable Information We Collect</h2>

      <p>
        When you register for an account on the site, make a purchase, sign up to receive promotional emails from us, or contact us for support or with questions, the types of information we will collect about you include your name, address, phone number, and email address.
      </p>

      {/* ... (Continue with the rest of the content) ... */}

      <h2 className="text-2xl font-bold mt-6">How We Use Your Personally Identifiable Information</h2>

      <p>
        The site is an online shopping portal and uses the submitted information for sale-related transactions only. Information about the customer's email id is used during the course of order processing to make inquiries and get additional inputs/clarifications. The address and telephone number are used for the purpose of mailing the ordered consignment. Other than these areas, the information has no commercial usage.
      </p>

      {/* ... (Continue with the rest of the content) ... */}

      <h2 className="text-2xl font-bold mt-6">Newsletters</h2>

      <p>
        If you wish to subscribe to our newsletter(s), we will use your name and email address to send the newsletter to you. You may unsubscribe from these communications at any time by following the instruction contained within each of the communications you receive.
      </p>

      {/* ... (Continue with the rest of the content) ... */}
      <h2 className="text-2xl font-bold mt-6">Service-related announcements</h2>
      <p>
      We will send you strictly service-related announcements on rare occasions when it is necessary to do so for instance, if our service is temporarily suspended for maintenance, we might send you an email. Generally, you may not opt-out of these communications, which are not promotional in nature. If you do not wish to receive them, you have the option to deactivate your account.
      </p>
      {/* Include other sections as needed */}

      <h2 className="text-2xl font-bold mt-6">Facebook connect</h2>
      <p>
      You can log in to our site using sign-in services such as facebook connect or an open id provider. These services will authenticate your identity and provide you the option to share certain personal information with us such as your name and email address to pre-populate our sign up form. Services like facebook connect give you the option to post information about your activities on this web site to your profile page to share with others within your network.
      </p>

      <h2 className="text-2xl font-bold mt-6">Tell-a-friend</h2>
      <p>
      If you choose to use our referral service to tell a friend about our site or to share your wish list, we will ask you for your friend's name and/or email address. We will automatically send your friend a one-time email inviting him or her to visit the site or view your wish list. Sizeupp stores this information for the sole purpose of sending this one-time email and tracking the success of our referral program. Your friend may contact us at <a href="mailto:">customercare@sizeupp.in</a>  to request that we remove this information from our database.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
