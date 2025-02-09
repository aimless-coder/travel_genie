import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);

    const handleButton = () => {
      if (user) {
        navigate("/dashboard/my-profile")
      } else {
        setOpenDialog(true)
      }
    }

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
            localStorage.setItem("user", JSON.stringify(res.data));
            setOpenDialog(false);
            navigate("/dashboard/my-profile");
          })
          .catch((error) => {
            console.error("Error fetching user profile:", error);
          });
      };

      const login = useGoogleLogin({
        onSuccess: (res) => {
          getUserProfile(res);
        },
        onError: (err) => console.log(err),
      });

  return (
    <div className='py-3 grid place-items-center'>
        <div className='h-full w-full px-5 md:px-20 flex justify-between items-center'>
        <img src="/images/logo.png" alt="Travel Genie Logo" className='h-[50px] md:h-[80px]' />
        <div className='flex gap-5'>
        {user && <div className="gap-4 flex items-center">
                <h2 className="hidden text-lg font-semibold text-gray-700 md:grid">{user.given_name}</h2>
                <img 
                  src={user?.picture} 
                  alt="" 
                  className="h-[40px] w-[40px] rounded-full border-2 border-[#4b164c] shadow-sm hover:shadow-md transition-all duration-300" 
                />
              </div>}
        <Button className='w-20 md:w-28 bg-[#4b164c]' onClick={handleButton}>{user? "Dashboard" : "Sign In"}</Button>
        </div>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription className='grid place-items-center'>
              <img src="/images/logo.png" alt="logo" className='w-[150px] md:w-[250px]' />
              <h2 className="font-bold text-lg mt-5">Sign In</h2>
              <p>Sign in to the TravelGenie with Google securely.</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center bg-[#4b164c]"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Header