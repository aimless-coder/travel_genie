import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"

function Hero() {
  const navigate = useNavigate()
  const [openDialog, setOpenDialog] = useState(false)

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data))
        setOpenDialog(false)
        navigate("/dashboard/my-profile")
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error)
      })
  }

  const login = useGoogleLogin({
    onSuccess: (res) => {
      getUserProfile(res)
    },
    onError: (err) => console.error(err),
  })

  const handleGetStarted = () => {
    const user = localStorage.getItem("user")
    if (user) {
      navigate("/dashboard/my-profile")
    } else {
      setOpenDialog(true)
    }
  }

  return (
    <div className="flex flex-col px-5 gap-1 md:gap-5 md:px-20 justify-center items-center md:flex-row">
      <div className="p-5 md:p-10 grid place-items-center md:place-items-start">
        <h1 className="font-light text-3xl md:text-5xl text-center md:text-left">
          Unlock <br />
          <span className="font-extrabold text-3xl md:text-5xl">
            Intelligent Travel Guide
          </span>
        </h1>
        <p className="text-xl my-5 font-medium md:text-2xl text-center md:text-left">
          Discover seamless adventures tailored just for you with the power of AI.
        </p>
        <Button className="w-[200px] my-5 md:my-10 bg-[#4b164c]" onClick={handleGetStarted}>
          Get Started
        </Button>
      </div>
      <div className="p-4 h-full grid place-items-center">
        <div className="relative">
          <img src="/images/hero.jpg" alt="hero" className="w-[300px] md:w-[500px]" />
          <div className="absolute inset-0">
            <img src="/images/australia.webp" className="w-[85px] md:w-[100px] rounded-full absolute top-0 -left-5 md:-left-10" alt="Australia" />
            <img src="/images/mountain.webp" className="w-[65px] md:w-[70px] rounded-full absolute top-0 -right-5" alt="Mountain" />
            <img src="/images/london.webp" className="w-[100px] md:w-[120px] rounded-full absolute -bottom-20 left-2" alt="London" />
          </div>
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription className="grid place-items-center">
              <img src="/images/logo.png" alt="logo" className="w-[150px] md:w-[250px]" />
              <h2 className="font-bold text-lg mt-5">Sign In</h2>
              <p>Sign in to the TravelGenie with Google securely.</p>
              <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Hero