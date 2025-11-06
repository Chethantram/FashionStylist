import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "components/AppImage";
import LoaderHanger from "components/Loader";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [user, setUser] = useState(null);

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logout = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message || "Logged out successfully");
        setUserId("");
      } else {
        toast.error(res?.data?.message || "Error logging out");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Error logging out");
    }
  };
  useEffect(() => {
    const fetchingUserId = async () => {
      // Logic to fetch and set user ID if authenticated
      try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/fetch-user-id",
          { withCredentials: true }
        );
        setUserId(res?.data?.userId || "");
      } catch (error) {
        console.log("Error", error);
        setUserId("");
      } finally {
        setIsLoading(false);
      }
    };
    fetchingUserId();
  }, []);

  const navigationItems = [
    { name: "Home", path: "/", icon: "Home" },
    {
      name: "AI Stylist",
      path: `/ai-stylist-chat/${userId}`,
      icon: "MessageCircle",
    },
    { name: "Style Assessment", path: "/style-assessment", icon: "User" },
    {
      name: "Shopping Assistant",
      path: "/shopping-assistant",
      icon: "ShoppingBag",
    },
    { name: "About us", path: "/about", icon: "Info" },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
    fetchProfile();
  }, []);

  if(isLoading){
    return <LoaderHanger/>; // or a loading spinner
  }

  

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-brand  lg:px-20">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 flex-shrink-0">

          <Image src="/logo.png" alt="logo" className="w-10 h-10" />
          <Image src={'/title.png'} className="w-20 h-10" alt="StyleMind"/>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                isActivePath(item?.path)
                  ? "bg-brand-cream text-brand-text-brand-primary"
                  : "text-brand-text-secondary hover:text-brand-text-primary hover:bg-muted"
              }`}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.name}</span>
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          {userId ? (
            <div className="">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className=" border relative rounded-full flex items-center justify-center cursor-pointer  transition-smooth"
              >
                <Image
                className="object-cover overflow-hidden w-10 h-10 rounded-full"
                  src={
                    user?.avatar
                      ? `http://localhost:5000/uploads/${user?.avatar}`
                      : "https://github.com/shadcn.png"
                  }
                />
              </div>
              <div className="bg-white absolute mt-5 right-4 shadow-lg rounded-lg w-48">
                {isOpen && (
                  <div>
                    <Link
                      to={"/profile"}
                      className="flex items-center  space-x-3 px-4 py-3 w-full text-left rounded-lg text-sm font-medium text-gray-800 hover:text-gray-600 hover:bg-muted transition-smooth"
                    >
                      <Icon name="UserRoundPen" size={20} />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to={"/wishlist"}
                      className="flex items-center  space-x-3 px-4 py-3 w-full text-left rounded-lg text-sm font-medium text-gray-800 hover:text-gray-600 hover:bg-muted transition-smooth"
                    >
                      <Icon name="Heart" size={20} />
                      <span>Favorite</span>
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center  space-x-3 px-4 py-3 w-full text-left rounded-lg text-sm font-medium text-red-600 hover:text-red-800 hover:bg-muted transition-smooth"
                    >
                      <Icon name="LogOut" size={20} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link to={"/login"}>
              <Button
                className="border-2 border-[#203b6c] bg-transparent rounded-3xl text-[#203b6c] px-6 hover:scale-105 transition-all duration-300"
                size="sm"
                iconPosition="left"
              >
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={toggleMobileMenu}
          iconName={isMobileMenuOpen ? "X" : "Menu"}
        />
      </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border shadow-brand-modal">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? "bg-brand-cream text-brand-text-primary"
                    : "text-brand-text-secondary hover:text-brand-text-primary hover:bg-muted"
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.name}</span>
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-border space-y-2">
              {userId ? (
                <div>
                  <Link
                    to={"/profile"}
                    className="flex items-center relative space-x-3 px-4 py-3 w-full text-left rounded-lg text-sm font-medium text-brand-text-secondary hover:text-brand-text-primary hover:bg-muted transition-smooth"
                  >
                    <Icon name="User" size={20} />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to={"/wishlist"}
                    className="flex items-center relative space-x-3 px-4 py-3 w-full text-left rounded-lg text-sm font-medium text-brand-text-secondary hover:text-brand-text-primary hover:bg-muted transition-smooth"
                  >
                    <Icon name="Heart" size={20} />
                    <span>Favorite</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded-lg text-sm font-medium text-red-600 hover:text-red-800 hover:bg-muted transition-smooth"
                  >
                    <Icon name="LogOut" size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link to={"/login"}>
                  <Button
                    className="border-2 w-full border-brand-gold bg-transparent rounded-md mt-2 text-brand-gold px-6 hover:scale-105 transition-all duration-300"
                    size="sm"
                    iconPosition="left"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
