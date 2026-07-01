module.exports.cafe=[
    {
        name:"Hug & Mug",
        description:"Hug a Mug offers supreme coffee experience complete with a delectable spread of pastries, cold beverages, sandwiches, wraps, pastas and snacks.",
        image:[{
            filename:"cafeimage",
            url:"https://thf.bing.com/th/id/OIP.C8MmEtaejpWti-zs_oJzSwHaJ1?w=99&h=108&c=7&qlt=90&bgcl=7957fb&r=0&o=6&dpr=1.3&pid=13.1",
        }],
        owner: "6a4211e75c35d64980160665",
        location: "Scottish Highlands",
        country: "United Kingdom",
        category: "book space",
        geometry: { type: "Point", coordinates: [-4.2026, 57.1200] } 
    },
    {
        name:"Boba Live",
        description:"Thin milk based drink with caramelised brown sugar and chewy boba. A vibrant collection of fruity drinks infused with juicy popping pearls that burst with flavour, delivering a refreshing, playful texture.",
        image:[{
            filename:"cafeimage",
            url:"https://thf.bing.com/th/id/OIP.pFVJGNhXjTwokD9IdXyjOwAAAA?w=186&h=331&c=7&r=0&o=7&cb=thfc1falcon2&dpr=1.3&pid=1.7&rm=3",
        }],
        owner: "6a4211e75c35d64980160665",
        location: "Scottish Highlands",
        country: "United Kingdom",
        category: "book space",
        geometry: { type: "Point", coordinates: [-4.2026, 57.1200] } 
    },
     {
        name:"Bun Boy",
        description:"Bun Boy offers supreme coffee experience complete with a delectable buns.",
        image:[ {
            filename:"cafeimage",
            url:"https://thf.bing.com/th/id/OIP.TexyWChIZ9wrGFx0fan9RAHaFj?w=261&h=196&c=7&r=0&o=7&cb=thfc1falcon2&dpr=1.3&pid=1.7&rm=3",
        }],
        owner: "6a4211e75c35d64980160665",
        location: "Scottish Highlands",
        country: "United Kingdom",
        category: "book space",
        geometry: { type: "Point", coordinates: [-4.2026, 57.1200] } 
    },
]

// workspace

const { ObjectId } = require("mongodb");

module.exports.workspaces=[
    {
        cafe: "6a399645f9bcd10ac77e480a",
        description:"a warm and tidy desk! with wifi",
        price:300,
        category:"desk",

    },
    {
    cafe:  "6a399645f9bcd10ac77e4809",
    description: "quiet corner table with charging port",
    price: 250,
    category: "table",
},

{
    cafe:  "6a399645f9bcd10ac77e4809",
    description: "spacious sofa seat, cozy lighting, wifi",
    price: 400,
    category: "sofa",
},

{
    cafe:  "6a399645f9bcd10ac77e4808",
    description: "open desk near window, natural light",
    price: 350,
    category: "desk",
},

{
    cafe:  "6a399645f9bcd10ac77e480e",
    description: "private booth with soundproof walls",
    price: 600,
    category: "desk",
},

{
    cafe:  "6a399645f9bcd10ac77e4808"  ,
    description: "bean bag lounge, casual seating, wifi",
    price: 200,
    category: "lounge",
},

{
    cafe:  "6a399645f9bcd10ac77e4808",
    description: "group table for 4, strong wifi, power outlets",
    price: 700,
    category: "lounge",
}
]