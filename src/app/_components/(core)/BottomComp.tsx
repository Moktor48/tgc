import React from 'react'

export default function BottomComp() {
  return (
    <div className="flex flex-col justify-items-center">
        <section className="newsletter" id="newsletter">
            <h3>TGC News</h3>
            <p>Our weekly newsletter with all the latest updates and news in The Gaming Council. Subscribe now!</p>
            <form action="#" method="post">
            <input type="email" id="email" placeholder="Enter your email" required />
            <button style={{color: "#c5c5c5"}}>Subscribe</button>
            </form>
        </section>
        <footer className="text-center">
            <p>TGC</p>
        </footer> 
    </div>
  )
}
