import { useLocation } from "react-router-dom";

export default function Profile() {
  const location = useLocation();

  const user = location.state?.user

  return (
    <div className="flex flex-col gap-3 p-6">
        <div key={user.email} className="flex items-center justify-center h-screen gap-20 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
          
          {/* Avatar with first letter */}
          <div
            className="w-22 h-22 rounded-full flex items-center justify-center text-5xl font-semibold shrink-0"
            style={{ backgroundColor: "#e8d5c4", color: "#7c4f2f" }}
          >
            {user.name.charAt(0)}
          </div>

          {/* Info */}
          <div>
            <p className="text-2xl font-bold text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-500 mt-0.5">{user.email}</p>
            <p className="text-sm text-gray-400 mt-0.5">Created {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>

        </div>
    </div>
  );
}