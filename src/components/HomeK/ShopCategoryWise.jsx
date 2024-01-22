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
    href: "/products?gender=2a812e75-af73-4638-b6a4-ca6d0529a368&category=537c3299-a506-455e-8e8d-1f65160f8537&subcategory=081b5b79-1ef6-4d01-9eda-1dba42c7b33b"
  },
  {
    id: 2,
    gender : "Women",
    title: "Women's Kurta",
    cat: "Women Topwear",
    name: "Kurta",
    smimg: dress5,
    img:cat2,
    href: "/products?gender=92aa7db0-e157-469d-ac90-e97d11e96940&category=a6389dbb-9579-4caa-857e-726e82e6fb60&subcategory=a01297c3-7247-4d23-93d4-358c20de43e8"
  },
  {
    id: 3,
    title: "Men's T-Shirts",
    gender : "Men",
    cat : "Casual Topwear",
    name: "T-Shirts",
    smimg: dress6,
    img:cat3,
    href: "/products?gender=2a812e75-af73-4638-b6a4-ca6d0529a368&category=537c3299-a506-455e-8e8d-1f65160f8537&subcategory=8b68529b-386b-4606-b339-f2d918dfdf7f"
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
