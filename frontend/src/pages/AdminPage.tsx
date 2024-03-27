import React, { useState } from "react";

export const AdminPage = () => {
  const [users, setUsers] = useState([
    { id: "user1", keywords: ["Hydrolic acid", "moisturiser", "...more"] },
  ]);
  const [topKeywords, setTopKeywords] = useState([
    { keyword: "abc", count: 10 },
    { keyword: "abc", count: 10 },
    { keyword: "abc", count: 10 },
  ]);

  const totalUsers = users.length;

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Users</h3>
        <p>Total Users: {totalUsers}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Keywords</th>
            <th>Top 3 Keywords</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.keywords.join(", ")}</td>
              <td>
                <ul>
                  {topKeywords.map((keyword, index) => (
                    <li key={index}>
                      <span>{keyword.keyword}: </span>
                      <span>{keyword.count}</span>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
