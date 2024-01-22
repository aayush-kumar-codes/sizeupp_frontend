import { useState, } from 'react';
import { chevronDownIcon } from '../../assets/icons';

const AccordionItem = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="shadow-sm">
        <header
          className={`flex cursor-pointer items-center justify-between border-t border-c-gray-300 py-5 transition-colors md:py-6 ${isOpen ? 'open' : ''}`}
          onClick={toggleAccordion}
        >
          <h2 className="text-heading pr-2 text-xl font-semibold leading-relaxed md:text-base ">
            {title}
          </h2>
          <div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center">
            <img src={chevronDownIcon} alt="chevronDownIcon" className={`w-4 h-4 ${isOpen ? 'scale-100 rotate-180' : ''
              }`} />
  
            <div
              className={`bg-heading  absolute bottom-0 h-full w-0.5 origin-bottom scale-0 transform rounded-sm transition-transform duration-500 ease-in-out `}
            />
          </div>
        </header>
        <div className={`accordion-text ${isOpen ? 'visible' : 'hidden'} transition-all duration-300 ease-in-out`}>
          <div className="pb-6 text-sm leading-7 text-c-gray-600 md:pb-7">{content}</div>
        </div>
      </div>
    );
  };

  export default AccordionItem