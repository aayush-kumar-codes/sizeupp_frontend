import React, { useContext } from 'react'
import {
  dress,
  dress2,
  dress3,
  dress4
} from '../../assets/images'
import {
  Link,useNavigate
} from 'react-router-dom';
import { WBlue1 } from '../../assets/images/women';
import { Wine1 } from '../../assets/images/men';
import { AuthContext } from '../../context/AuthProvider';

export const Categories = [
  {
    id: 1,
    title: "Men's Casual Shirts",
    gender : "Men",
    cat : "Men Topwear",
    name: "Casual Shirts",
    img: Wine1,
  },
  {
    id: 2,
    gender : "Women",
    title: "Women's Kurta",
    cat: "Women Topwear",
    name: "Kurta",
    img: WBlue1,
  },
  {
    id: 3,
    title: "Men's T-Shirts",
    gender : "Men",
    cat : "Men Topwear",
    name: "T-Shirts",
    img: dress4,
  },
]

export default function ShopCategoryWise() {

  const navigate = useNavigate();
  const { setfilterdata, setnavsearch, setnavgender, setcategory } = useContext(AuthContext)

  const handleSearch = (id, gender, cat) => {
    // setcategory(cat)
    // setfilterdata({
    //   gender: [`${gender}`],
    //   color: [],
    //   size: [],
    //   search: id
    // })

    navigate(`/products?gender=${gender}&category=${cat}&subcategory=${id}`);

  }
  return (
    <div className="h-auto w-full flex flex-col lg:flex-row justify-center ">
      {
        Categories.map((product) =>
          <Layout
            linkref={product.name}
            Text={product.title}
            Image={product.img}
            key={product.id}
            cat={product.cat}
            gender={product.gender}
            func={handleSearch}
          />
        )
      }
    </div>
  )
}



const Layout = ({ Text, Image,linkref,func,gender,cat }) => {
  return (
    <div className={`lg:w-1/3 h-[50rem] relative flex flex-col justify-end
      w-full 
      `}>
      <div className='w-full h-full absolute top-0 left-0 overflow-hidden'>
        <img src={Image} className='object-cover w-full h-full' alt="product" />
      </div>
      <div className='h-[60%] w-full flex flex-col justify-center items-center text-center z-10 gap-10 p-16'>
        <h1 className="font-semibold tracking-wider text-3xl capitalize font-sans text-white drop-shadow-lg">{Text}</h1>
       
          <button onClick={()=>func(linkref,gender,cat)} className="border-2 border-white text-white w-48 h-16 text-2xl md:w-36 md:h-12 md:text-lg sm:w-28 sm:h-8 sm:text-base">Shop Now</button>

      </div>
    </div>
  )
}
