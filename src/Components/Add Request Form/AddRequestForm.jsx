import React from 'react'

function AddRequestForm() {
  return (
    <>
      <form className='max-w-md mx-auto mt-6 border rounded-lg p-6 shadow-md space-y-4'>
        <h2 className='text-xl font-semibold text-center'>Service Request Form</h2>

        {/* Request NO. */}
        <div>
          <label className='block mb-1 font-medium'>Request No.</label>
          <input
            type="text"
            placeholder='SR-102'
            className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </div>

        {/* Title */}
        <div>
          <label className='block mb-1 font-medium'>Title</label>
          <input
            type="text"
            placeholder='Leptop dead'
            className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </div>

        {/* Type */}
        <div>
          <label className='block mb-1 font-medium'>Type</label>
          <input
            type="text"
            placeholder='Computer Issue'
            className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select className='w-full border rounded px-3 py-3'>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className='block mb-1 font-medium'>Date</label>
          <input type="date"
            placeholder='25-12-2025'
            className='w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </div>

        {/* {Final status} */}
        <div>
          <label className="block mb-1 font-medium">Final Status</label>
          <select className='w-full border rounded px-3 py-3'>
            <option>Open</option>
            <option>Closed</option>
          </select>
        </div>

        {/* Submit btn */}
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
        >
         Submit
        </button>


      </form>
    </>
  )
}

export default AddRequestForm