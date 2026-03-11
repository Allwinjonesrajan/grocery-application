import React from "react";

function OfferPage({ onNavigate }) {

const offers = [

{
title:"Fresh Fruits Offer",
discount:"30% OFF",
img:"https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg"
},

{
title:"Vegetable Combo",
discount:"25% OFF",
img:"https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg"
},

{
title:"Dairy Products",
discount:"20% OFF",
img:"https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg"
},

{
title:"Snacks Festival",
discount:"40% OFF",
img:"https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg"
}

];

return (

<div className="offer-container">

<h2 className="offer-title">🔥 Today's Special Offers</h2>

<div className="offer-grid">

{offers.map((item,index)=>(

<div className="offer-card" key={index}>

<img src={item.img} alt={item.title} />

<span className="discount-badge">{item.discount}</span>

<div className="offer-overlay">

<h3>{item.title}</h3>

<button className="shop-btn" onClick={onNavigate}>Shop Now</button>

</div>

</div>

))}

</div>

</div>

);

}

export default OfferPage;