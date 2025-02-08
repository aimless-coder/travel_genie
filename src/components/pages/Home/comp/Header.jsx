import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc';

function Header() {
    const [openDialog, setOpenDialog] = useState(false);

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
            window.location.reload();
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
        <Button className='w-16 md:w-28' onClick={() => setOpenDialog(true)}>Sign In</Button>
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
                className="w-full mt-5 flex gap-4 items-center"
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