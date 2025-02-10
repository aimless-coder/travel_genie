function Footer() {

    const currentYear = new Date().getFullYear();

  return (
    <div className="mt-24">
        <div className="h-[70px] flex items-center">
            <div className="grid place-items-start px-14 w-[50%]">  
            <img src="/images/logo.png" alt="logo" className="h-[45px] md:h-[55px]" />
            </div>
            <div className="w-[50%] min-h-[70px] bg-[#4b164c] rounded-l-full grid place-items-center">
                <h2 className="text-sm text-white">&copy; {currentYear} Travel Genie. All rights reserved.</h2>
            </div>
        </div>
    </div>
  )
}

export default Footer