import axios from "axios";
import Button from "components/ui/Button";
import { Loader2, MoveLeft, MoveLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, userSchema } from "utils/schema";
import Image from "components/AppImage";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(isLogin ? loginSchema : userSchema) });

  const onsubmit = async (formData) => {    
    if (isLogin) {
      // Call login API
      try {
        const { email, password } = formData;
        
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email,
          password,
        });
        if (res.data.success) {
          window.location.href = "/"; // Redirect to dashboard on successful login
          toast.success(res?.data?.message || "Login successful");
        } else {
          toast.error(res?.data?.message || "Login failed");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Login failed");
      }
    } else {
      try {
        const { email, password, name } = formData;
        
        const res = await axios.post(
          "http://localhost:5000/api/auth/register",
          { name, email, password }
        );
        if (res?.data?.success) {
          setIsLogin(true);
          toast.success(
            res?.data?.message || "Registration successful. Please login."
          );
        } else {
          toast.error(res?.data?.message || "Registration failed");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Registration failed");
      }
    }
  };

  
  return (
    
    <div  className="min-h-screen max-w-6xl  mx-auto mt-5 bg-orange-50-50 p-4 text-gray-800">
      <Button
        className=" bg-transparent p-0 space-x-2 mb-4 hover:underline hover:text-brand-gold"
        onClick={() => (window.location.href = "/")}
      >
        <MoveLeft className="size-4 text-gray-800" />
        <span className="text-gray-800">Move Back</span>
      </Button>

      <div className=" w-full max-w-md mx-auto border bg-white/90 shadow-lg rounded-2xl p-8 mt-10">
        <div className="flex items-center justify-center mb-5 gap-3">
          <Image src="/logo.png" alt="logo" className="w-10 h-10" />

          <Image src={'/title.png'} className="w-20 h-10" alt="StyleMind"/>
        </div>
        <h2 className="text-xl font-semibold text-center mb-6">
          {isLogin ? "Login to Style Mind" : "Create an Account"}
        </h2>

        <form
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col space-y-2"
        >
          {!isLogin && (
            <>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              placeholder="abc"
              {...register("name")}
              className="px-4 py-2 border text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
            </>
          )}

          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
          <label className="text-sm font-medium mt-2">Email</label>
          <input
            type="email"
            placeholder="abc@gmail.com"
            {...register("email")}
            className="px-4 py-2 border text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          <label className="text-sm font-medium mt-2">Password</label>
          <input
            type="password"
            placeholder="********"
            {...register("password")}
            className="px-4 py-2 border text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-brand-gold  text-gray-100 font-semibold  rounded-lg hover:scale-105 transition duration-300"
          >
            {isSubmitting ? (
              !isLogin ? (
                <>
                  <Loader2 className="mr-2 animate-spin w-4 h-4" />
                  registering...
                </>
              ) : (
                <>
                  <Loader2 className="mr-2 animate-spin w-4 h-4" />
                  login...
                </>
              )
            ) : isLogin ? (
              "Login"
            ) : (
              "Register"
            )}
          </Button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-brand-gold font-medium hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>

  );
}
