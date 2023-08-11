"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const parts = pathname.split("/"); // Split the URL by "/"
  const id = parts[parts.length - 1]; // Get the last part of the array

  console.log(id);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();

      setUsername(data[0].creator.username);
      console.log(username);

      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleEdit = (post) => {};
  const handleDelete = async (post) => {};
  return (
    <Profile
      name={`${username}'s`}
      description={`Welcome to ${username}'s profile, here you can see all of their posts.`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default UserProfile;
