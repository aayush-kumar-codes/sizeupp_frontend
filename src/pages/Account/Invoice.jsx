import React,{useRef} from 'react'
import { logo } from '../../assets/banners'
import html2pdf from 'html2pdf.js';

const Invoice = () => {

    const invoiceRef = useRef(null);

  const downloadPDF = () => {
    const content = invoiceRef.current;

    // Check if the content is available
    if (!content) {
      console.error('Invoice content not found.');
      return;
    }

    // Options for html2pdf
    const options = {
      margin: 2,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    // Generate PDF
    html2pdf().from(content).set(options).save();
  };


  return (
      <>
            <section className="bg-gray-50 w-full">
        {/* Invoice */}
              <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10" ref={invoiceRef}>
                  
                <div className="sm:w-11/12 lg:w-3/4 mx-auto">
                {/* Card */}
                <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl">
                    {/* Grid */}
                    <div className="flex justify-between m-4 pb-5 mb-6  border-b border-gray-200">
                    <div>
                        <img src={logo} className="w-32 " />

                    </div>
                    {/* Col */}

                    <div className="text-end">
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Invoice #</h2>
                        <span className="mt-1 block text-gray-500">3682303</span>

                        
                    </div>
                    {/* Col */}
                    </div>
                    {/* End Grid */}
                    
                    
                    {/* <!-- Grid --> */}
  <div className="grid md:grid-cols-2 gap-3">
    <div>
      <div className="grid space-y-3">
        <dl className="grid sm:flex gap-x-3 text-sm">
          <dt className="min-w-[150px] max-w-[200px] text-gray-500">
            Billed to:
          </dt>
          <dd className="text-gray-800">
            <a className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium" href="#">
              sara@site.com
            </a>
          </dd>
        </dl>

        <dl className="grid sm:flex gap-x-3 text-sm">
          <dt className="min-w-[150px] max-w-[200px] text-gray-500">
            Billing details:
          </dt>
          <dd className="font-medium text-gray-800">
            <span className="block font-semibold">Sara Williams</span>
            <address className="not-italic font-normal">
              280 Suzanne Throughway,<br/>
              Breannabury, OR 45801,<br/>
              United States<br/>
            </address>
          </dd>
        </dl>

        <dl className="grid sm:flex gap-x-3 text-sm">
          <dt className="min-w-[150px] max-w-[200px] text-gray-500">
            Shipping details:
          </dt>
          <dd className="font-medium text-gray-800">
            <span className="block font-semibold">Sara Williams</span>
            <address className="not-italic font-normal">
              280 Suzanne Throughway,<br/>
              Breannabury, OR 45801,<br/>
              United States<br/>
            </address>
          </dd>
        </dl>
      </div>
    </div>
    {/* Col */}

    <div>
      <div className="grid space-y-3">
        <dl className="grid sm:flex gap-x-3 text-sm">
          <dt className="min-w-[150px] max-w-[200px] text-gray-500">
            Invoice number:
          </dt>
          <dd className="font-medium text-gray-800">
            ADUQ2189H1-0038
          </dd>
        </dl>

        <dl className="grid sm:flex gap-x-3 text-sm">
          <dt className="min-w-[150px] max-w-[200px] text-gray-500">
            Currency:
          </dt>
          <dd className="font-medium text-gray-800">
            USD - US Dollar
          </dd>
        </dl>

        <dl className="grid sm:flex gap-x-3 text-sm">
          <dt className="min-w-[150px] max-w-[200px] text-gray-500">
            Due date:
          </dt>
          <dd className="font-medium text-gray-800">
            10 Jan 2023
          </dd>
        </dl>

        <dl className="grid sm:flex gap-x-3 text-sm">
          <dt className="min-w-[150px] max-w-[200px] text-gray-500">
            Billing method:
          </dt>
          <dd className="font-medium text-gray-800">
            Send invoice
          </dd>
        </dl>
      </div>
    </div>
    {/* Col */}
  </div>
  {/* End Grid */}

                    {/* Table */}
                    <div className="mt-6">
                    <div className="border border-gray-200 p-4 rounded-lg space-y-4">
                        <div className="hidden sm:grid sm:grid-cols-5">
                        <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">Item</div>
                        <div className="text-start text-xs font-medium text-gray-500 uppercase">Qty</div>
                        <div className="text-start text-xs font-medium text-gray-500 uppercase">Rate</div>
                        <div className="text-end text-xs font-medium text-gray-500 uppercase">Amount</div>
                        </div>

                        <div className="hidden sm:block border-b border-gray-200"></div>

                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        <div className="col-span-full sm:col-span-2">
                            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
                            <p className="font-medium text-gray-800">Design UX and UI</p>
                        </div>
                        <div>
                            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
                            <p className="text-gray-800">1</p>
                        </div>
                        <div>
                            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Rate</h5>
                            <p className="text-gray-800">5</p>
                        </div>
                        <div>
                            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
                            <p className="sm:text-end text-gray-800">$500</p>
                        </div>
                        </div>

                        <div className="sm:hidden border-b border-gray-200"></div>

                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        <div className="col-span-full sm:col-span-2">
                            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
                            <p className="font-medium text-gray-800">Web project</p>
                        </div>
                        <div>
                            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty
                            </h5>
                            <p className="text-gray-800">1</p>
                        </div>
                        <div>
                            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Rate</h5>
                            <p className="text-gray-800">24</p>
                        </div>
                        <div>
                            <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
                            <p className="sm:text-end text-gray-800">$1250</p>
                        </div>
                        </div>
                        <div className="sm:hidden border-b border-gray-200"></div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            <div className="col-span-full sm:col-span-2">
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
                <p className="font-medium text-gray-800">SEO</p>
            </div>
            <div>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
                <p className="text-gray-800">1</p>
            </div>
            <div>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Rate</h5>
                <p className="text-gray-800">6</p>
            </div>
            <div>
                <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
                <p className="sm:text-end text-gray-800">$2000</p>
            </div>
            </div>
            </div>
            </div>
            {/* End Table */}

            {/* Flex */}
            <div className="mt-8 flex sm:justify-end">
            <div className="w-full max-w-2xl sm:text-end space-y-2">
            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
            <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800">Subtotal:</dt>
                <dd className="col-span-2 text-gray-500">$2750.00</dd>
            </dl>

            <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800">Total:</dt>
                <dd className="col-span-2 text-gray-500">$2750.00</dd>
            </dl>

            <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800">Tax:</dt>
                <dd className="col-span-2 text-gray-500">$39.00</dd>
            </dl>

            <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800">Amount paid:</dt>
                <dd className="col-span-2 text-gray-500">$2789.00</dd>
            </dl>

            <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800">Due balance:</dt>
                <dd className="col-span-2 text-gray-500">$0.00</dd>
            </dl>
            </div>
            {/* End Grid */}
            </div>
            </div>
            {/* End Flex */}

            <div className="mt-8 sm:mt-12">
            <h4 className="text-lg font-semibold text-gray-800">Thank you!</h4>
            <p className="text-gray-500">If you have any questions concerning this invoice, use the following contact information:</p>
            <div className="mt-2">
            <p className="block text-sm font-medium text-gray-800">example@site.com</p>
            <p className="block text-sm font-medium text-gray-800">+1 (062) 109-9222</p>
            </div>
            </div>

            <p className="mt-5 text-sm text-gray-500">© 2024 Sizeupp.</p>
            </div>
            {/* End Card */}

            </div>
            </div>
            {/* Buttons */}
            <div className="mt-6 flex justify-center gap-x-3">
            <button
            onClick={downloadPDF}
            className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
          >
            <svg
              className="flex-shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Invoice PDF
          </button>
            <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700" href="#">
            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
            Print
            </a>
            </div>
            {/* End Buttons */}
        {/* End Invoice */}
        </section>              

      </>
  )
}

export default Invoice