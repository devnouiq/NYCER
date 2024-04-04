import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import { AccountContext } from "../hooks/Account";
import { getEmails, getUsersData } from "../services/api/GetUsersData";
import { UserIcon } from "lucide-react";

interface IdTokenPayload {
  email: string;
}

interface SessionData {
  idToken: {
    payload: IdTokenPayload;
  };
}

interface KeywordType {
  keyword: string;
  count: number;
  _id: string;
}

// interface UserDataType {
//   _id: string;
//   user: any;
//   keywords: Keyword[];
// }

interface EmailsType {
  _id: string;
  email: string;
}

const admin: string = import.meta.env.VITE_ADMIN;

export const AdminPage: React.FC = () => {
  const { getSession } = useContext(AccountContext);
  const [currentUser, setCurrentUser] = useState<SessionData | void>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [keywordsData, setKeywordsData] = useState<KeywordType[]>();
  const [emails, setEmails] = useState<EmailsType[]>();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getSession();
        setCurrentUser(session);
        const data = await getUsersData();
        setKeywordsData(data);
        const allemails = await getEmails();
        setEmails(allemails);
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

  // const getTop3Keywords = (keywords: KeywordType[]): string => {
  //   return keywords
  //     .sort((a, b) => b.count - a.count)
  //     .slice(0, 3)
  //     .map((keyword) => `${keyword.keyword} (${keyword.count})`)
  //     .join(", ");
  // };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center bg-[#AF7153] text-white rounded-lg p-4">
          <UserIcon className="w-6 h-6 mr-2" />
          <p className="text-xl font-semibold">
            Total Users in the waitlist: {emails!.length}
          </p>
        </div>
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full table-auto">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-6 py-3 text-left text-indigo-900">Keywords</th>
              <th className="px-6 py-3 text-left text-indigo-900">
                keywords count
              </th>
            </tr>
          </thead>
          <tbody>
            {keywordsData &&
              keywordsData.map((keyword) => (
                <tr
                  key={keyword._id}
                  className="even:bg-gray-50 hover:bg-gray-100">
                  <td className="px-6 py-4 border-b border-gray-200">
                    {keyword.keyword}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    {keyword.count}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-10">
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full table-auto text-center">
            <caption className="py-2 font-bold text-lg text-indigo-900 bg-indigo-100">
              WaitList Emails
            </caption>
            <tbody>
              {emails &&
                emails
                  .slice(0, Math.ceil(emails.length / 2))
                  .map((email, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-gray-200 transition-colors cursor-pointer`}>
                      <td className="px-4 py-2 border border-gray-300">
                        {email.email}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full table-auto text-center">
            <caption className="py-2 font-bold text-lg text-indigo-900 bg-indigo-100">
              WaitList Emails
            </caption>
            <tbody>
              {emails &&
                emails
                  .slice(Math.ceil(emails.length / 2))
                  .map((email, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-gray-200 transition-colors cursor-pointer`}>
                      <td className="px-4 py-2 border border-gray-300">
                        {email.email}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
