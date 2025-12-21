import React from 'react'

function Requestlist() {

    const data = [
        {id:101 , title:"Leptop dead" , status:"Pending"} , 
        {id:102 , title:"Leptop not charged" , status:"In Progress"}

    ]

    
  return (
    <div>
        <h3>request</h3>
        {data.map((item)=>{
            <p key={index}>{item.title} - {item.status}</p>
        })}
    </div>
  )
}

export default Requestlist