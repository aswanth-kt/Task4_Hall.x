// const users = [
//   { name: "Alexandra Morgan", email: "alex.morgan@studio.io", createdAt: "Jan 12, 2023", bg: "#e8d5c4", fg: "#7c4f2f" },
//   { name: "James Nakamura",   email: "james.n@devhub.co",     createdAt: "Jul 5, 2021",  bg: "#c4d5e8", fg: "#2f527c" },
//   { name: "Priya Sharma",     email: "priya@growthco.in",     createdAt: "Mar 1, 2023",  bg: "#d5c4e8", fg: "#4f2f7c" },
// ];

import { useLocation } from "react-router-dom";

export default function Profile() {
  const location = useLocation();

  const user = location.state?.user

  return (
    <div className="flex flex-col gap-3 p-6">
        <div key={user.email} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
          
          {/* Avatar with first letter */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold shrink-0"
            style={{ backgroundColor: "#e8d5c4", color: "#7c4f2f" }}
          >
            {user.name.charAt(0)}
          </div>

          {/* Info */}
          <div>
            <p className="text-sm font-medium text-gray-800">{user.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
            <p className="text-xs text-gray-400 mt-0.5">Created {user.createdAt}</p>
          </div>

        </div>
    </div>
  );
}