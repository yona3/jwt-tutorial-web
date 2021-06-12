import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ChangeEvent, FormEvent } from "react";

import { Layout } from "../components/Layout";
import { useForm } from "../hooks/form";

const Login: NextPage = () => {
  const { values, handleSetValues } = useForm({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleSetName = (e: ChangeEvent<HTMLInputElement>) =>
    handleSetValues("name", e.target.value);

  const handleSetEmail = (e: ChangeEvent<HTMLInputElement>) =>
    handleSetValues("email", e.target.value);

  const handleSetPassword = (e: ChangeEvent<HTMLInputElement>) =>
    handleSetValues("password", e.target.value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password } = values;
    const body = {
      name,
      email,
      password,
    };

    try {
      const res = await fetch("http://localhost:8080/user/register", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log("data: ", data);
      router.push("/");
    } catch (err) {
      console.error("error: ", err);
    }
  };

  return (
    <Layout>
      <p>Register</p>
      <form className="flex flex-col mt-3 max-w-sm" onSubmit={handleSubmit}>
        <input
          className="p-2 rounded border border-gray-400"
          type="name"
          placeholder="name"
          value={values.name}
          onChange={handleSetName}
        />
        <input
          className="p-2 mt-2 rounded border border-gray-400"
          type="email"
          placeholder="email"
          value={values.email}
          onChange={handleSetEmail}
        />
        <input
          className="p-2 mt-2 rounded border border-gray-400"
          type="password"
          placeholder="password"
          value={values.password}
          onChange={handleSetPassword}
        />
        <button
          className="
            py-2 mt-2 text-white bg-blue-400 hover:bg-blue-500 
            rounded border transition duration-200
           "
        >
          submit
        </button>
      </form>
      <div className="mt-5">
        <Link href="/register">
          <button className="py-1 px-4 mr-3 rounded-md border border-gray-300">login</button>
        </Link>
        <Link href="/">
          <button className="py-1 px-4 rounded-md border border-gray-300">home</button>
        </Link>
      </div>
    </Layout>
  );
};

export default Login;
