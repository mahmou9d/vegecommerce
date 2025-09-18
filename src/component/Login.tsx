// import { TiHome } from "react-icons/ti";
// import { IoIosArrowForward } from "react-icons/io";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { RootState } from "../store";
import { loginUser } from "../store/authSlice";
import { useToast } from "../hooks/use-toast";

interface ILogin {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Incorrect email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Incorrect password")
    .required("Password is required"),
});

const Login = () => {
    const { toast } = useToast();
    const [errorMsg, setErrorMsg] = useState("");
    const nav = useNavigate();
     const dispatch = useAppDispatch();

     const { loading, access, error } = useAppSelector(
       (state: RootState) => state.auth
     );
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILogin>({
    resolver: yupResolver(schema),
  });
const onSubmit = async (data: ILogin) => {
  try {
    await dispatch(loginUser(data)).unwrap();
        toast({
          title: "Login successful 🎉",
          description: "Welcome back!",
        });
    nav("/");
  } catch (err: any) {
    setErrorMsg(err);
        toast({
          title: "Login failed",
          description: err || "Invalid email or password",
          // variant: "destructive",
        });
  }
};

console.log(errorMsg, "errorMsg");
console.log(error, "error");
  return (
    <div
      className="
    bg-[right_bottom]
    bg-contain
    bg-[url('/images/bg-hero.jpg')]
    h-[100vh] flex justify-center items-center
  "
    >
      <div className="container mx-auto bg-[#f1f2f6]  w-[500px] h-[500px] rounded-[50px] px-12  flex flex-col items-center justify-center">
        <h1 className="text-[25px] font-extrabold pb-4">Log in</h1>
        <div className="h-[1px] w-full bg-[#a7a7a733]" />
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="pt-10 flex flex-col w-full">
            <label className="flex items-center gap-1" htmlFor="">
              Email address <span className="text-red-700"> *</span>
            </label>
            <input
              className=" mt-4 h-10 rounded-full shadow-[#01e281] shadow-sm outline-none py-2 px-6"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="pt-10 flex flex-col w-full">
            <label className="flex items-center gap-1" htmlFor="">
              Password<span className="text-red-700"> *</span>
            </label>
            <div className="relative">
              <input
                className=" w-full mt-4 h-10 rounded-full shadow-[#01e281] shadow-sm outline-none py-2 px-6"
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute top-[47%] right-7 flex items-center text-gray-500 hover:text-gray-800"
              >
                {!showPassword ? (
                  <FaRegEyeSlash size={20} />
                ) : (
                  <FaRegEye size={20} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#01e281] h-12 rounded-full text-white py-3 text-[18px] hover:bg-[#00c46a] transition mt-12"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-[#01e281] font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
// import * as yup from "yup";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useState } from "react";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
// import { Button } from "../components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../store/hook";
// import { RootState } from "../store";
// import { loginUser } from "../store/authSlice";
// import sha256 from "crypto-js/sha256";

// interface ILogin {
//   email: string;
//   password: string;
// }

// const schema = yup.object().shape({
//   email: yup.string().email("Incorrect email").required("Email is required"),
//   password: yup
//     .string()
//     .min(6, "Incorrect password")
//     .required("Password is required"),
// });

// const Login = () => {
//   const [errorMsg, setErrorMsg] = useState("");
//   const nav = useNavigate();
//   const dispatch = useAppDispatch();
//   const { loading, access, error } = useAppSelector(
//     (state: RootState) => state.auth
//   );

//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<ILogin>({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data: ILogin) => {
//   const hashedPassword = CryptoJS.SHA256(data.password).toString();

//   const payload = {
//     email: data.email,
//     password: hashedPassword,
//   };
//     try {
//       await dispatch(loginUser(payload)).unwrap();
//       nav("/");
//     } catch (err: any) {
//       setErrorMsg(err);
//     }
//   };

//   return (
//     <div
//       className="
//         bg-[right_bottom] 
//         bg-contain 
//         bg-[url('/images/bg-hero.jpg')] 
//         h-[100vh] flex justify-center items-center
//       "
//     >
//       <div className="container mx-auto bg-[#f1f2f6] w-[500px] h-[500px] rounded-[50px] px-12 flex flex-col items-center justify-center">
//         <h1 className="text-[25px] font-extrabold pb-4">Log in</h1>
//         <div className="h-[1px] w-full bg-[#a7a7a733]" />
//         <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
//           <div className="pt-10 flex flex-col w-full">
//             <label className="flex items-center gap-1">
//               Email address <span className="text-red-700"> *</span>
//             </label>
//             <input
//               className="mt-4 h-10 rounded-full shadow-[#01e281] shadow-sm outline-none py-2 px-6"
//               type="email"
//               {...register("email")}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-xs mt-1">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           <div className="pt-10 flex flex-col w-full">
//             <label className="flex items-center gap-1">
//               Password<span className="text-red-700"> *</span>
//             </label>
//             <div className="relative">
//               <input
//                 className="w-full mt-4 h-10 rounded-full shadow-[#01e281] shadow-sm outline-none py-2 px-6"
//                 type={showPassword ? "text" : "password"}
//                 {...register("password")}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((p) => !p)}
//                 className="absolute top-[47%] right-7 flex items-center text-gray-500 hover:text-gray-800"
//               >
//                 {!showPassword ? (
//                   <FaRegEyeSlash size={20} />
//                 ) : (
//                   <FaRegEye size={20} />
//                 )}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-xs mt-1">
//                 {errors.password.message}
//               </p>
//             )}
//           </div>

//           <Button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-[#01e281] h-12 rounded-full text-white py-3 text-[18px] hover:bg-[#00c46a] transition mt-12"
//           >
//             {isSubmitting ? "Logging in..." : "Login"}
//           </Button>
//         </form>

//         {errorMsg && <p className="mt-4 text-red-600">{errorMsg}</p>}

//         <p className="mt-6 text-center text-sm text-gray-600">
//           Don’t have an account?{" "}
//           <a
//             href="/signup"
//             className="text-[#01e281] font-medium hover:underline"
//           >
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
