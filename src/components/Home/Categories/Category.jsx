import React from 'react'

const Category = () => {
  return (
      <>
          <header className="text-center">
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Categories</h2>

            <p className="mx-auto mt-4 max-w-md text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure
                dicta incidunt est ipsam, officia dolor fugit natus?
            </p>
            </header>
    <div className="mx-auto grid w-full max-w-7xl items-center space-y-4     px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-3">
  <div className="relative aspect-[16/9]  w-auto rounded-md md:aspect-auto md:h-[400px]">
    <img
      src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1s"
      alt="AirMax Pro"
      className="z-0 h-full w-full rounded-md object-cover"
    />
    <div className="absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent"></div>
    <div className="absolute bottom-4 left-4 text-left">
      <h1 className="text-lg font-semibold text-white">Men's</h1>
      <p className="mt-2 text-sm text-gray-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
        debitis?
      </p>
      <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
        Shop Now →
      </button>
    </div>
  </div>
  <div className="relative aspect-[16/9]  w-auto rounded-md md:aspect-auto md:h-[400px]">
    <img
      src="https://images.pexels.com/photos/1034859/pexels-photo-1034859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt="AirMax Pro"
      className="z-0 h-full w-full rounded-md object-cover"
    />
    <div className="absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent"></div>
    <div className="absolute bottom-4 left-4 text-left">
      <h1 className="text-lg font-semibold text-white">Women</h1>
      <p className="mt-2 text-sm text-gray-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
        debitis?
      </p>
      <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
        Shop Now →
      </button>
    </div>
  </div>
  <div className="relative aspect-[16/9]  w-auto rounded-md md:aspect-auto md:h-[400px]">
    <img
      src="https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt="AirMax Pro"
      className="z-0 h-full w-full rounded-md object-cover"
    />
    <div className="absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent"></div>
    <div className="absolute bottom-4 left-4 text-left">
      <h1 className="text-lg font-semibold text-white">Kids</h1>
      <p className="mt-2 text-sm text-gray-300">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
        debitis?
      </p>
      <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
        Shop Now →
      </button>
    </div>
  </div>
  
</div>

      </>
  )
}

export default Category