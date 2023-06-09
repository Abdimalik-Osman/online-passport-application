import React,{useState} from 'react'
import { ToastContainer, toast       } from 'react-toastify'
const Modal = ({handleClose, isOpen}) => {
    const [isChecked, setIsChecked] = useState(false)
    const handleIsCheck = () =>{
        setIsChecked(!isChecked);
      }
  return (
    <>
       <ToastContainer />
    <div
    
    id="staticModal"
    data-modal-backdrop="static"
    tabIndex="-1"
    aria-hidden="true"
    className={`fixed top-0 left-0 right-0 z-50 ${
      isOpen ? '' : 'hidden'
    } flex justify-center items-center w-screen h-screen`}
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
  >
    <div
      className="relative bg-white rounded-lg shadow dark:bg-gray-900"
      style={{ width: '100%', maxWidth: '800px', maxHeight: '100vh' }}
    >
      <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-900">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
          Passport Rules
        </h3>
      </div>

      <div className="p-4 md:p-6 space-y-4 md:space-y-6 overflow-y-auto" style={{ maxHeight: '70vh' }}>
        <ol className="text-sm md:text-base leading-relaxed text-gray-900 dark:text-gray-400">
          <li>1- Applicants must be Somali citizens or have proof of Somali citizenship to apply for a new passport.</li>
          <li>2- Applicants must provide accurate and complete information during the application process, including personal details, contact information, and supporting documents. Any false or misleading information may result in the rejection of the application.</li>
          <li>3- Applicants must pay the processing fee and any applicable convenience fees within the given time frame. Failure to make payment within the specified period may result in the cancellation or delay of the passport application.</li>
          <li>4- The processing fee is non-refundable and non-transferable. Applicants are advised to appear on their scheduled appointment with complete requirements or risk forfeiting payment.</li>
          <li>5- Applicants must protect their passport and keep it in a safe place. Any loss or damage to the passport may result in additional fees and delays in obtaining a replacement passport.</li>
          <li>6- Applicants must report any errors or issues with their passport as soon as possible to the passport office or the support team of the online passport system.</li>
          <li>7- Applicants must not share their passport details or personal information with anyone else.</li>
          <li>8- The passport system is not responsible for any delays, loss, or damage caused by external factors such as courier services or postal services.</li>
          <li>9- The new passport is valid for a period of five years and can be renewed after the expiration date.</li>
          <li className='mt-3'>
            <input
              type="checkbox"
              id="myCheckbox"
              className="form-checkbox h-4 w-4 text-green-500"
              name="isChecked"
              value={isChecked}
              onChange={handleIsCheck}
            />{" "}
            <span className='text-xs md:text-sm font-bold'>I confirm that I have read, understood and agree to the above conditions.</span>
          </li>
        </ol>
      </div>

      <div className="flex items-center p-4 md:p-6 space-x-1 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-4 md:px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          style={{display: isChecked == false?"none" : ""}}
          onClick={handleClose}
        >
          I accept
        </button>
      </div>
    </div>
  </div>
  </>
  )
}

export default Modal
