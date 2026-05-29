import { useState } from 'react';
import { SignupForm } from '../components/authPage/SignupForm'
import { LoginForm } from '../components/authPage/LoginForm'

const authPage = () => {
  const [tab, setTab] = useState("signup");
  
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className=" max-w-3xl flex rounded-2xl overflow-hidden shadow-xl border border-gray-100">
          <div className="flex-1 bg-white p-8 flex flex-col">
            {/* Tabs */}
            <div className="flex rounded-lg border border-gray-100 overflow-hidden mb-6">
              {["signup", "login"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-2 text-sm font-medium transition-all ${
                    tab === t
                      ? "bg-gray-50 text-gray-800"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {t === "signup" ? "Create account" : "Sign in"}
                </button>
              ))}
            </div>
  
            {tab === "signup" ? (
              <SignupForm onSwitch={() => setTab("login")} />
            ) : (
              <LoginForm onSwitch={() => setTab("signup")} />
            )}
          </div>
        </div>
      </div>
    );
}

export default authPage