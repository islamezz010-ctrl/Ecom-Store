import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Button } from "../components/ui/Button";
import { API } from "../lib/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const finishLogin = (user) => {
    localStorage.setItem("userInfo", JSON.stringify(user));
    window.dispatchEvent(new Event("auth:changed"));
    navigate("/", { replace: true });
  };

  const handleSuccess = async (credentialResponse) => {
    try {
      const details = jwtDecode(credentialResponse.credential);
      console.log("Google User:", details);

      const userData = {
        googleId: details.sub,
        email: details.email,
        name: details.name,
        picture: details.picture,
      };

      const response = await fetch(`${API}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      const mongoUser = await response.json();

      if (!response.ok) {
        throw new Error(mongoUser.message || "Google auth failed");
      }

      finishLogin({
        ...mongoUser,
        name: mongoUser.name || details.name,
        picture: mongoUser.picture || details.picture,
      });
    } catch (err) {
      console.error("Auth failed", err);
      alert("Authentication failed: " + err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        finishLogin(data);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Login error", err);
      alert("Login error: " + err.message);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-mist-300">
      <form
        onSubmit={handleLogin}
        className="flex flex-col p-8 bg-white gap-5 items-center w-170 dark:bg-gray-900 mt-10 mx-auto h-120 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-2xl"
      >
        <h2 className="text-3xl font-black mb-6 dark:text-white">
          Welcome Back
        </h2>

        <input
          type="email"
          placeholder="Email Address"
          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white border-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white border-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          className="w-40 py-6 mt-7 bg-gray-900 dark:bg-blue-600 text-white font-bold rounded-xl hover:scale-[1.02] transition-transform"
        >
          Sign In
        </Button>

        <div className="p-10 bg-white dark:bg-gray-900 rounded-3xl shadow-none w-full flex flex-col items-center">
          <p className="text-gray-500 mb-4 font-medium">Or continue with</p>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
              console.log("Login Failed");
              alert("Google Login popup was closed or failed.");
            }}
            theme="outline"
            size="large"
            text="signin_with"
            shape="rectangular"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
