"use client";
import axios from "axios";

import { useState } from "react";

interface UserRequest {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: any;
  blog: string;
  location: string;
  email: any;
  hireable: any;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

interface ErrorRequest {
  message: string;
  documentation_url: string;
}

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<UserRequest | null>(null);
  const [error, setError] = useState<string | null>(null);

  const base_url = "https://api.github.com/users";

  const handleSubmit = () => {
    axios.get(`${base_url}/${username}`).then(({data}: any) => {
      if (data.message == "Not Found") {
        setUser(null)
        setError("User not found!");
      } else {
        setError(null);
        setUser(data);
      }
      setUsername("");
    }).catch(() => {
      setUser(null)
      console.log("User not found!")
      setError("User not found!");
    })

  };

  return (
    <>
      <div className="flex text-center flex-col mt-20 text-zinc-300">
        <h1 className="text-4xl">github user finder</h1>
        <h2 className="text-xl">developed by mx</h2>
      </div>
      <div className="flex flex-col items-center mt-12">
        <input
          type="text"
          placeholder="github user"
          className="text-zinc-300 bg-slate-950 border border-slate-600 py-2 px-2 w-2/12 rounded outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={() => handleSubmit()}
          className="w-2/12 mt-4 p-3 bg-slate-800 rounded text-zinc-300 hover:bg-slate-900 transition-all"
        >
          search
        </button>
      </div>
      <pre className="text-zinc-300 flex flex-col items-center mt-6">
        {error != null && (
          <div>
            <p>{error}</p>
          </div>
        )}
        {user != null && (
          <div>
            <p>ID: {user.id}</p>
            <p>Login: {user.login}</p>
            <p>Node ID: {user.node_id}</p>
            <p>Name: {user.name}</p>
            <p>Biography: {user.bio}</p>
            <p>Account created at {user.created_at}</p>
            <p>Account updated at {user.updated_at}</p>
            <p>Followers: {user.followers}</p>
            <p>Following: {user.followers}</p>
            <p>Role: {user.type}</p>
            <p>Gists: {user.public_gists}</p>
            <p>Repositories: {user.public_repos}</p>
            <img
              className="w-4/12 mt-4"
              src={user.avatar_url}
              alt={`${user.login}'s image`}
            />
          </div>
        )}
      </pre>
    </>
  );
}
