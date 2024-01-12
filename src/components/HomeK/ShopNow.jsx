import {banner6,banner8} from '../../assets/banners'
import { Link,useNavigate} from 'react-router-dom'
import {mobile4, mobile6 } from "../../assets/banners/mobile";

export default function ShopNow() {
    return (
      <>
        
        <Layout 
          Text="Men's Ethnic Wear"
                Image={banner6}
                smImg={mobile4}
                Orientation={false}
                href={`/products?gender=56331b14-95bb-4d6f-8fbd-eaf228d25a27&category=db93ce20-7baf-4ebd-be17-89d1215a04c9&subcategory=7f342ad1-b316-40f0-841f-01ec0b31ffbb`}
        />
        <Layout 
          Text="Women's Formal Wear"
                Image={banner8}
                smImg={mobile6}
                Orientation={false}
                href={`/products?gender=8303b897-48a5-491e-a763-eb19d275873f&category=89d81469-02e4-4a2c-a2ac-4080b7f141e3&subcategory=09665092-aad8-4169-afcd-b3ec0e389860`}
        />
      </>
    )
}
  
const Layout = ({ Text, Image,smImg, Orientation,href }) => {


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
                <h1 className="font-normal lg:text-[3.8rem] font-serif text-white text-4xl">{Text}</h1>
                <Link to={href}>
                <button className="border-2 border-white text-white w-48 h-16 text-2xl md:w-36 md:h-12 md:text-lg sm:w-28 sm:h-8 sm:text-base">Shop Now</button>

                </Link>
            </div>
        </div>
    )
}