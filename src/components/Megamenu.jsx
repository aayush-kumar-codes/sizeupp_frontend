import { styles } from "../style"
import { chevronDownIcon } from "../assets/icons"
import { dress } from "../assets/images"
const Megamenu = () => {
    return (
        <div className={`${styles.paddingX} hidden md:block py-4 w-full relative bg-white shadow z-50`}>
            {/* layout prefixer */}
            <div className={`flex items-center gap-10 max-w-5xl mx-auto`}>

                {/* Online Only */}
                <div className="group">
                    <p className='text-lg tracking-wide cursor-pointer flex items-center justify-center'>
                        Online Only
                        <img src={chevronDownIcon} alt="chvrondown" className=" ml-2 w-4 font-bold" />
                    </p>
                    <div className="hidden group-hover:grid grid-cols-4 absolute left-0 p-10 w-full bg-secondary rounded-md  drop-shadow-md">
                        <div className="col-span-1">
                            <p className="text-lg font-semibold">Online Only</p>
                            <p className="text-sm text-gray-500">Shop online only products</p>
                            < img src={dress} alt="online only" className="w-full h-48 object-contain rounded-md mt-4" />
                            < button className="bg-black text-white rounded-md px-4 py-2 mt-4">Shop Online Only</button>
                            < p className="text-sm text-gray-500 mt-4">@Terms and conditions apply. </p>
                        </div>
                        <div>
                            <ul>
                                <li>

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Woman */}
                <div className="group">
                    <p className='text-lg tracking-wide cursor-pointer flex items-center justify-center'>
                        Woman
                        <img src={chevronDownIcon} alt="chvrondown" className=" ml-2 w-4 font-bold" />
                    </p>
                    <div className="hidden group-hover:flex flex-col absolute left-0 p-10 w-full bg-secondary rounded-md  drop-shadow-md">

                    </div>
                </div>

                {/* Man */}
                <div className="group">
                    <p className='text-lg tracking-wide cursor-pointer flex items-center justify-center'>
                        Man
                        <img src={chevronDownIcon} alt="chvrondown" className=" ml-2 w-4 font-bold" />
                    </p>
                    <div className="hidden group-hover:flex flex-col absolute left-0 p-10 w-full bg-secondary rounded-md  drop-shadow-md">

                    </div>
                </div>

                {/* Kids */}
                <div className="group">
                    <p className='text-lg tracking-wide cursor-pointer flex items-center justify-center'>
                        Kids
                        <img src={chevronDownIcon} alt="chvrondown" className=" ml-2 w-4 font-bold" />
                    </p>
                    <div className="hidden group-hover:flex flex-col absolute left-0 p-10 w-full bg-secondary rounded-md  drop-shadow-md">

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Megamenu