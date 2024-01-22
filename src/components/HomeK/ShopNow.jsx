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
                href={`/products?gender=2a812e75-af73-4638-b6a4-ca6d0529a368&category=96bbee9f-18f2-4751-96ee-58f913276144`}
        />
        <Layout 
          Text="Women's Wear"
                Image={banner8}
                smImg={mobile6}
                Orientation={false}
                href={`/products?gender=92aa7db0-e157-469d-ac90-e97d11e96940&category=34ac7219-e916-4ab2-8de4-9181a9fcd772&subcategory=39c5441b-5faf-4415-bbc1-3dd9a109bfa1`}
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