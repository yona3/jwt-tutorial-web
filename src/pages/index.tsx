import type { NextPage } from "next";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import { Layout } from "../components/Layout";
import { UPDATE_ACCESS_TOKEN } from "../store/action";
import { AppContext } from "../store/context";
import type { User } from "../types";

const Index: NextPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const [user, setUser] = useState<User>(null);
  const [accessToken, setAccessToken] = useState("");
  const [error, setError] = useState<string>(null);

  const handleRefreshToken = async () => {
    try {
      const res = await fetch("http://localhost:8080/refresh_token", {
        method: "POST",
        mode: "cors",
        credentials: "include",
      });

      const data = await res.json();

      if (!data.ok) throw new Error("failed refresh token.");
      console.log("handleRefreshToken");
      console.log("data: ", data);

      setAccessToken(data.accessToken);
      dispatch({ type: UPDATE_ACCESS_TOKEN, accessToken: data.accessToken });
      if (error) setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleFetchUser = async () => {
    try {
      const res = await fetch("http://localhost:8080/user/login", {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: { authorization: `bearer ${state.accessToken}` },
      });

      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setUser(data.user);
      setAccessToken(state.accessToken);
      if (error) setError(null);
    } catch (err) {
      console.log("handleFetchUser");
      console.error("error: ", err);
      setError(`error: ${err.message}`);
    }
  };

  const handleLogout = () => {
    dispatch({ type: UPDATE_ACCESS_TOKEN, accessToken: "" });
    setAccessToken("");
    setUser(null);
    setError("logged out.");
  };

  useEffect(() => {
    if (!state.accessToken) handleRefreshToken();
  }, []);

  useEffect(() => {
    if (accessToken !== "" && !user) handleFetchUser();
  }, [accessToken]);

  return (
    <Layout>
      <div className="">
        <div>
          <p>users</p>
          {user && (
            <pre className="mt-3" key={user.id}>
              id: {user.id}
              <br />
              name: {user.name}
              <br />
              email: {user.email}
            </pre>
          )}
          {error && <p className="mt-3">{error}</p>}
        </div>
        <div className="mt-5">
          {user && accessToken ? (
            <button onClick={handleLogout} className="py-1 px-4 rounded-md border border-gray-300">
              logout
            </button>
          ) : (
            <>
              <Link href="/register">
                <button className="py-1 px-4 mr-2 rounded-md border border-gray-300">
                  register
                </button>
              </Link>
              <Link href="/login">
                <button className="py-1 px-4 rounded-md border border-gray-300">login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
