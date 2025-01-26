import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
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

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="p-3 flex justify-between items-center px-10 bg-transparent relative z-10 ">
      <img src="/textLogo.png" className="h-[40px] lg:h-[60px]" />
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium">{user.given_name}</h2>
              <Popover>
                <PopoverTrigger>
                  <img
                    src={user?.picture}
                    className="h-[35px] w-[35px] rounded-full"
                  />
                </PopoverTrigger>
                <PopoverContent className="cursor-pointer">
                  <h2
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    Log Out
                  </h2>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="logo" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google securely.</p>
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
  );
}

export default Header;
