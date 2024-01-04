import {banner1,
    banner2,
    banner3,banner4,banner5,banner6,banner7, banner8} from '../../assets/banners'
import { Link,useNavigate} from 'react-router-dom'
import { mobile1,mobile2,mobile3,mobile4,mobile5, mobile6 } from "../../assets/banners/mobile";

export default function ShopNow() {
    return (
      <>
        
        <Layout 
          Text="Men`s Ethnic Wears"
                Image={banner6}
                smImg={mobile4}
                Orientation={false}
                href={`/products?navsearch=Kurta`}
        />
        <Layout 
          Text="Women`s Formal Wear"
                Image={banner8}
                smImg={mobile6}
                Orientation={false}
                href={`/products?navsearch=Formal%20Wear`}
        />
      </>
    )
}
  
const Layout = ({ Text, Image,smImg, Orientation,href }) => {
    
    const navigate = useNavigate();

    function SetOrientation(){
        if(Orientation === false){
            return 'md:justify-start justify-center'
        }
        if(Orientation === true){
            return 'md:justify-end justify-center'
        }
    }

    function SetImageOrientation(){
        if(Orientation === false){
            return ''
        }
        if(Orientation === true){
            return '-scale-x-[1]'
        }
    }

    return (
        <div className={`w-full h-[100vh] relative flex ${SetOrientation()} overflow-hidden
          
        `}>
            <div className='w-full h-full absolute top-0 left-0'>
                <img src={Image} className={`hidden md:block w-full h-full object-cover ${SetImageOrientation()}`} alt="" />
                <img src={smImg} className={`md:hidden block w-full h-full object-cover ${SetImageOrientation()}`} alt="" />

            </div>
            <div className='w-2/3 h-full flex flex-col md:justify-center justify-between items-center text-center z-10 gap-10 lg:p-0 py-16'>
                <h1 className="font-normal lg:text-[3.8rem] capitalize font-serif text-white text-4xl">{Text}</h1>
                <Link to={href}>
                <button className="border-2 border-white text-white w-48 h-16 text-2xl md:w-36 md:h-12 md:text-lg sm:w-28 sm:h-8 sm:text-base">Shop Now</button>

                </Link>
            </div>
        </div>
    )
}