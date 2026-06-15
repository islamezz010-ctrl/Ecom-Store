import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { API } from "../lib/api";
import { useNotification } from "../hooks/useNotification";
import Button from "../components/Button";

const Login = ({ heading = "Welcome Back" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const notify = useNotification();

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
      notify.error("Authentication failed: " + err.message);
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
        notify.error(data.message);
      }
    } catch (err) {
      console.error("Login error", err);
      notify.error("Login error: " + err.message);
    }
  };

  return (
    <div
      className="flex min-h-screen w-full"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #fcf8ff 0%, #f6f2fa 50%, #eee9f8 100%)",
      }}
    >
      {/* Left Side - Login Form */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-10">
        <form
          onSubmit={handleLogin}
          className="flex flex-col w-full max-w-md gap-6 p-8 bg-white rounded-2xl border border-[#e5e1e9] shadow-xl dark:bg-gray-900 dark:border-gray-800"
        >
          <div>
            <h2 className="text-3xl font-bold text-[#1a146b] dark:text-white mb-2">
              {heading}
            </h2>
            <p className="text-sm text-[#777682] dark:text-gray-400">
              Join our community and start shopping!
            </p>
          </div>

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-xl bg-[#f6f2fa] dark:bg-gray-800 dark:text-white border border-[#e5e1e9] dark:border-gray-700 focus:ring-2 focus:ring-[#1a146b] focus:border-transparent outline-none transition"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-[#f6f2fa] dark:bg-gray-800 dark:text-white border border-[#e5e1e9] dark:border-gray-700 focus:ring-2 focus:ring-[#1a146b] focus:border-transparent outline-none transition"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="submit"
            value="Sign In"
            className="w-full cursor-pointer text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition active:scale-95"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #1a146b 0%, #312e81 100%)",
            }}
          />

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e5e1e9]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-[#777682]">
                Or continue with
              </span>
            </div>
          </div>

          <div className="flex justify-center bg-white dark:bg-gray-900">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => {
                console.log("Login Failed");
                notify.warning("Google Login popup was closed or failed.");
              }}
              theme="outline"
              size="large"
            />
          </div>

          <p className="text-center text-sm text-[#777682]">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="font-semibold text-[#1a146b] hover:text-[#006b5f] transition"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center px-10">
        <div className="relative w-full max-w-md">
          {/* Decorative background shapes */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(26,20,107,0.10) 0%, rgba(0,107,95,0.10) 100%)",
            }}
          ></div>

          <div className="relative z-10 flex flex-col gap-8">
            {/* Happy Shopping Illustration */}
            <svg
              viewBox="0 0 300 300"
              className="w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background circle */}
              <circle cx="150" cy="150" r="140" fill="#f0ecf4" opacity="0.5" />

              {/* Shopping bags - Left */}
              <rect
                x="50"
                y="120"
                width="40"
                height="60"
                rx="4"
                fill="#1a146b"
              />
              <path
                d="M 55 120 L 55 105 Q 55 95 65 95 Q 75 95 75 105 L 75 120"
                stroke="#1a146b"
                strokeWidth="3"
                fill="none"
              />
              <line
                x1="58"
                y1="120"
                x2="58"
                y2="175"
                stroke="#f0ecf4"
                strokeWidth="2"
              />
              <line
                x1="72"
                y1="120"
                x2="72"
                y2="175"
                stroke="#f0ecf4"
                strokeWidth="2"
              />

              {/* Shopping bags - Right */}
              <rect
                x="210"
                y="120"
                width="40"
                height="60"
                rx="4"
                fill="#006b5f"
              />
              <path
                d="M 215 120 L 215 105 Q 215 95 225 95 Q 235 95 235 105 L 235 120"
                stroke="#006b5f"
                strokeWidth="3"
                fill="none"
              />
              <line
                x1="218"
                y1="120"
                x2="218"
                y2="175"
                stroke="#f0ecf4"
                strokeWidth="2"
              />
              <line
                x1="232"
                y1="120"
                x2="232"
                y2="175"
                stroke="#f0ecf4"
                strokeWidth="2"
              />

              {/* Happy face circle */}
              <circle cx="150" cy="90" r="35" fill="#ffd700" />

              {/* Face features */}
              <circle cx="140" cy="85" r="4" fill="#1a146b" />
              <circle cx="160" cy="85" r="4" fill="#1a146b" />

              {/* Happy smile */}
              <path
                d="M 140 95 Q 150 102 160 95"
                stroke="#1a146b"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />

              {/* Sparkles */}
              <circle cx="100" cy="50" r="3" fill="#1a146b" />
              <circle cx="200" cy="50" r="3" fill="#006b5f" />
              <circle cx="80" cy="120" r="2.5" fill="#1a146b" opacity="0.6" />
              <circle cx="220" cy="130" r="2.5" fill="#006b5f" opacity="0.6" />
              <circle cx="120" cy="40" r="2" fill="#1a146b" opacity="0.4" />
              <circle cx="180" cy="45" r="2" fill="#006b5f" opacity="0.4" />
            </svg>

            {/* Motivational Text */}
            <div className="text-center space-y-3">
              <h3 className="text-2xl font-bold text-[#1a146b]">
                Ready to Discover?
              </h3>
              <p className="text-[#474651] leading-relaxed">
                Join thousands of happy shoppers and explore our premium
                collection. Sign in now and enjoy exclusive deals!
              </p>
              <div className="flex items-center justify-center gap-2 text-[#006b5f] font-semibold">
                <span>✨ Free Shipping on Orders Over $50</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
