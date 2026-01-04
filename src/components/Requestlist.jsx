import React from 'react'

function Requestlist() {

  const data = [
    { reqNo: "SR-101", title: "Leptop dead", type: "Computer Issue", status: "Pending", date: "20-Dec", finalStatus: "closed" },
    { reqNo: "SR-102", title: "Mobile Heating", type: "Mobile Issue", status: "In Progress", date: "21-Dec", finalStatus: "Open" },


  ]
  return (
    <div className='grid content-center'>
      <h3 className='text-2xl text-center m-3'>Request</h3>

      <table className='border border-gray-300 border-collapse rounded-lg m-3 shadow-md text-center p-4'>
        <thead>
          <tr>
            <th className='border px-3 py-2'>Request No.</th>
            <th className='border px-3 py-2'>Title</th>
            <th className='border px-3 py-2'>Type</th>
            <th className='border px-3 py-2'>Status</th>
            <th className='border px-3 py-2'>Date</th>
            <th className='border px-3 py-2'>Final Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (<>
              <tr key={index}>
                <td className='border px-3 py-2'>{item.reqNo}</td>
                <td className='border px-3 py-2'>{item.title}</td>
                <td className='border px-3 py-2'>{item.type}</td>
                <td className='border px-3 py-2'>{item.status}</td>
                <td className='border px-3 py-2'>{item.date}</td>
                <td className='border px-3 py-2'>{item.finalStatus}</td>
              </tr>
            </>)
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Requestlist