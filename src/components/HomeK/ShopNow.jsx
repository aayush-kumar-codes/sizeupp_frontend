import {banner1,
    banner2,
    banner3,banner4,banner5,banner6,banner7} from '../../assets/banners'
import { Link,useNavigate} from 'react-router-dom'
import { mobile1,mobile2,mobile3,mobile4,mobile5 } from "../../assets/banners/mobile";

export default function ShopNow() {
    return (
      <>
        <Layout 
          Text="Latest Men's Collection"
                Image={banner7}
                smImg={mobile4}
                Orientation={false}
                href={`/products?gender=Men`}
        />
        <Layout 
          Text="Latest Women's Collection"
                Image={banner2}
                smImg={mobile2}
                Orientation={true}
                href={`/products?gender=Women`}
        />
        <Layout 
          Text="Latest Ethnic Wears"
                Image={banner6}
                smImg={mobile5}
                Orientation={false}
                href={`/products?navsearch=Kurta`}
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
                <img src={Image} className={`hidden lg:block w-full h-full object-cover ${SetImageOrientation()}`} alt="" />
                <img src={smImg} className={`md:hidden block w-full h-full object-cover ${SetImageOrientation()}`} alt="" />

            </div>
            <div className='w-2/3 h-full flex flex-col justify-center items-center text-center z-10 gap-10 p-16 sm:p-2'>
                <h1 className="font-normal lg:text-5xl capitalize font-serif text-white text-5xl">{Text}</h1>
                <Link to={href}>
                <button className="border-2 border-white text-white text-lg p-2">Shop Now</button>

                </Link>
            </div>
        </div>
    )
}