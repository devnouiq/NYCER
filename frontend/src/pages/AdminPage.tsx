import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import { AccountContext } from "../hooks/Account";
import { getUsersData } from "../services/api/GetUsersData";
import { UserIcon } from "lucide-react";

interface IdTokenPayload {
  email: string;
}

interface SessionData {
  idToken: {
    payload: IdTokenPayload;
  };
}

interface Keyword {
  keyword: string;
  count: number;
  _id: string;
}

interface UserDataType {
  _id: string;
  user: any;
  keywords: Keyword[];
}

const admin: string = import.meta.env.VITE_ADMIN;

export const AdminPage: React.FC = () => {
  const { getSession } = useContext(AccountContext);
  const [currentUser, setCurrentUser] = useState<SessionData | void>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserDataType[]>();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getSession();
        setCurrentUser(session);
        const data = await getUsersData();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSession();
  }, [getSession]);

  if (
    isLoading ||
    !currentUser ||
    !currentUser.idToken ||
    !currentUser.idToken.payload ||
    !currentUser.idToken.payload.email
  ) {
    return <Loading />;
  }

  const userEmail: string = currentUser.idToken.payload.email;

  if (userEmail !== admin) {
    return <Navigate to="/" replace />;
  }

  const getTop3Keywords = (keywords: Keyword[]): string => {
    return keywords
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
      .map((keyword) => `${keyword.keyword} (${keyword.count})`)
      .join(", ");
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center bg-blue-500 text-white rounded-lg p-4">
          <UserIcon className="w-6 h-6 mr-2" />
          <p className="text-lg font-semibold">
            Total Users: {userData!.length}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b border-gray-200">Users</th>
              <th className="px-4 py-2 border-b border-gray-200">Keywords</th>
              <th className="px-4 py-2 border-b border-gray-200">
                Top 3 Keywords
              </th>
            </tr>
          </thead>
          <tbody>
            {userData!.map((user: any) => (
              <tr key={user._id} className="even:bg-gray-50 hover:bg-gray-100">
                <td className="flex items-center px-4 py-2 border-b border-gray-200">
                  {user.username}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {user.keywords
                    .map((keyword: { keyword: string }) => keyword.keyword)
                    .join(", ")}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {getTop3Keywords(user.keywords)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
