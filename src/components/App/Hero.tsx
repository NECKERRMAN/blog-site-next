const Hero = () => {
  return (
    <div className='flex justify-between items-center px-5 bg-blue-100 py-10 lg:py-0'>
    <div className="px-10 space-y-5">
        <h1 className='text-6xl max-w-xl font-serif'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h1>
        <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam deserunt non velit, maiores fugiat dolorem deleniti.</h2>
    </div>

    <img className='hidden md:inline-flex h-32 lg:h-full' src="https://i.pinimg.com/originals/dd/a8/74/dda874377fd5aa13353472bf0fe61a79.png" alt="hero" />
    </div>
  )
}

export default Hero