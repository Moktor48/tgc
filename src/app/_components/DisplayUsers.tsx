"use client"
import React from 'react'

export default function DisplayUsers(users) {
    console.log(users)


  return (<div></div>)
}
   /* 
    <div>
        {users.map((user) => {
            return (
                <div>
                    <p>
                        {user[0].name}
                        {user[1].admin && "Admin"}
                        {user[2].eso && "ESO"}
                        {user[3].swtor && "SWTOR"}
                        {user[4].ffxiv && "FFXIV"}
                    </p>
                </div>
            )
        })}
    </div>
  )
}
*/