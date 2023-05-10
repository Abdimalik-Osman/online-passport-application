import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function StepperOne() {
  return (
    <form>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Personal Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Use a permanent address where you can receive mail.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4 sm:col-start-1">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900">
              NATIONAL ID
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="city"
                id="city"
                autoComplete="address-level2"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
  <button type="button"
    class="w-full sm:w-auto rounded-md bg-indigo-600 px-5 py-2 mt-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    check
  </button>
</div>

          {/* //FIRST NAME */}
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900">
              First name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* LAST NAME */}
          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900">
              Last name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* //MOTHER FIRST NAME */}
          <div className="sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900">
              MOTHER'S FIRST NAME
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="mFname"
                id="mFname"
                autoComplete="given-name"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/*MOTHER'S LAST NAME */}
          <div className="sm:col-span-3">
            <label
              htmlFor="mLname"
              className="block text-sm font-medium leading-6 text-gray-900">
              MOTHER'S LAST NAME
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="mLname"
                id="mLname"
                autoComplete="family-name"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* sex */}
          <div className="sm:col-span-2">
            <p className="mt-1 text-sm leading-6 text-gray-600">
              SELECT YOUR SEX.
            </p>
            <input
              id="push-everything"
              name="push-notifications"
              type="radio"
              className="h-4 w-4 border-gray-300 mx-2 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="mLname"
              className="text-sm mr-5 font-medium leading-6 text-gray-900">
              MALE
            </label>
            <input
              id="push-everything"
              name="push-notifications"
              type="radio"
              className="h-4 w-4 border-gray-300 mx-2 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="mLname"
              className="text-sm font-medium leading-6 mx-2 text-gray-900">
              MALE
            </label>
          </div>
          {/* occupation */}
          <div className="sm:col-span-2">
            <p className="mt-1 text-sm leading-6 text-gray-600">
              SELECT YOUR OCCUPATION.
            </p>
            <input
              id="comments"
              name="comments"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 mr-1.5 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="mLname"
              className="text-sm mr-5 font-medium leading-6 text-gray-900">
              Student
            </label>
            <input
              id="comments"
              name="comments"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 mr-1.5 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="mLname"
              className="text-sm font-medium leading-6 mx-2 text-gray-900">
              Employee
            </label>
            <input
              id="comments"
              name="comments"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 mr-1.5 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="mLname"
              className="text-sm font-medium leading-6 mx-2 text-gray-900">
              Others
            </label>
          </div>

          {/* <div className="sm:col-span-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div> */}

          {/* nationality */}
          <div className="sm:col-span-2">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900">
              SELECT COUNTRY
            </label>
            <div className="mt-2">
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                <option>SOMALIA</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          {/* MARITAL STATUS */}
          <div className="sm:col-span-2">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900">
              MARITAL STATUS
            </label>
            <div className="mt-2">
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                <option>Single</option>
                <option>Husband</option>
                <option>Widow</option>
              </select>
            </div>
          </div>
          {/* place of birth */}
          <div className="sm:col-span-1">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900">
              DATE OF BIRTH
            </label>
         
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="date"
                autoComplete="email"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* place of birth */}
          <div className="sm:col-span-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900">
              PLACE OF BIRTH
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* <div className="col-span-full">
            <label
              htmlFor="street-address"
              className="block text-sm font-medium leading-6 text-gray-900">
              Street address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="street-address"
                id="street-address"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900">
              City
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="city"
                id="city"
                autoComplete="address-level2"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="region"
              className="block text-sm font-medium leading-6 text-gray-900">
              State / Province
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="region"
                id="region"
                autoComplete="address-level1"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="postal-code"
              className="block text-sm font-medium leading-6 text-gray-900">
              ZIP / Postal code
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="postal-code"
                id="postal-code"
                autoComplete="postal-code"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div> */}
        </div>
      </div>
    </form>
  );
}
