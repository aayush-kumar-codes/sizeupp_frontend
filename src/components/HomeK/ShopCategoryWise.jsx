import React, { useContext } from 'react'
import {
  dress4,
  dress5,
  dress6
} from '../../assets/images'
import {
  useNavigate
} from 'react-router-dom';
import { WBlue1 } from '../../assets/images/women';
import { Wine1 } from '../../assets/images/men';
import { cat2,cat3 } from '../../assets/banners/mobile';
import { AuthContext } from '../../context/AuthProvider';

export const Categories = [
  {
    id: 1,
    title: "Men's Casual Shirts",
    gender : "Men",
    cat : "Casual Topwear",
    name: "Casual Shirts",
    img: Wine1,
    smimg:Wine1,
    href: "/products?gender=56331b14-95bb-4d6f-8fbd-eaf228d25a27&category=db93ce20-7baf-4ebd-be17-89d1215a04c9&subcategory=bb47ee2b-fb8f-4c02-abdb-800d4aa0e327"
  },
  {
    id: 2,
    gender : "Women",
    title: "Women's Kurta",
    cat: "Women Topwear",
    name: "Kurta",
    smimg: dress5,
    img:cat2,
    href: "/products?gender=8303b897-48a5-491e-a763-eb19d275873f&category=95153fbe-1ff6-462d-a637-89b642d6af6c&subcategory=a113aa09-c1ec-4d63-aea6-e40340975b80"
  },
  {
    id: 3,
    title: "Men's T-Shirts",
    gender : "Men",
    cat : "Casual Topwear",
    name: "T-Shirts",
    smimg: dress6,
    img:cat3,
    href: "/products?gender=56331b14-95bb-4d6f-8fbd-eaf228d25a27&category=db93ce20-7baf-4ebd-be17-89d1215a04c9&subcategory=479c2371-55b0-4e0e-8b19-54f59076f893"
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
            smimg={product.smimg}
            key={product.id}
            cat={product.cat}
            gender={product.gender}
            href={product.href}
            func={handleSearch}
          />
        )
      }
    </div>
  )
}



const Layout = ({ Text, Image,linkref,func,gender,cat,href,smimg }) => {
  const navigate = useNavigate(); 
  return (
    <div className={`lg:w-1/3 h-[50rem] relative flex flex-col justify-end
      w-full 
      `}>
      <div className='w-full h-full absolute top-0 left-0 overflow-hidden'>
        <img src={Image} className='object-cover w-full h-full hidden md:block' alt="product" />
        <img src={smimg} className='object-cover w-full h-full md:hidden block' alt="product" />

      </div>
      <div className='h-[60%] w-full flex flex-col justify-center items-center text-center z-10 gap-10 p-16'>
        <h1 className="font-semibold tracking-wider text-3xl capitalize font-sans text-white drop-shadow-lg">{Text}</h1>
       
          <button onClick={()=>navigate(href)} className="border-2 border-white text-white w-48 h-16 text-2xl md:w-36 md:h-12 md:text-lg sm:w-28 sm:h-8 sm:text-base">Shop Now</button>

      </div>
    </div>
  )
}
