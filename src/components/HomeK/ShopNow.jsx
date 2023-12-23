import {banner1,
    banner2,
    banner3,banner4,banner5} from '../../assets/banners'
import { Link } from 'react-router-dom'

export default function ShopNow() {
    return (
      <>
        <Layout 
          Text="Latest Women's Collection"
          Image={banner2}
          Orientation= {false}
        />
        <Layout 
          Text="Latest Men's Collection"
          Image={banner4}
          Orientation= {true}
        />
        <Layout 
          Text="Shop Now, Slay Later"
          Image={banner5}
          Orientation= {false}
        />
      </>
    )
}
  
const Layout = ({Text, Image, Orientation}) => {
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
          md:h-[80vh] 
        `}>
            <div className='w-full h-full absolute top-0 left-0'>
                <img src={Image} className={`w-full h-full object-cover ${SetImageOrientation()}`} alt="" />
            </div>
            <div className='w-2/3 h-full flex flex-col justify-center items-center text-center z-10 gap-10 p-16 sm:p-2'>
                <h1 className="font-normal lg:text-5xl capitalize font-[Times-new-roman] text-white text-5xl">{Text}</h1>
                <Link to="/products">
                <button className="border-2 border-white text-white text-lg p-2">Shop Now</button>

                </Link>
            </div>
        </div>
    )
}