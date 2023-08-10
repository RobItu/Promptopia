"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    let inputText;
    if (typeof e === "string") {
      inputText = e.toLowerCase();
    } else if (typeof e === "object" && e.target) {
      inputText = e.target.value.toLowerCase();
    } else {
      return;
    }

    if (inputText.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filteredPrompts = posts.filter(
        (post) =>
          post.prompt.toLowerCase().includes(inputText) ||
          post.tag.toLowerCase().includes(inputText) ||
          post.creator.username.toLowerCase().includes(inputText)
      );
      setFilteredPosts(filteredPrompts);
    }

    setSearchText(inputText);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setFilteredPosts(data);
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center ">
        <input
          type="text"
          placeholder="Search for a prompt, tag or username"
          value={searchText}
          onChange={(e) => {
            handleSearchChange(e);
          }}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={filteredPosts}
        handleTagClick={(tag) => {
          handleSearchChange(tag);
        }}
        text={searchText}
      />
    </section>
  );
};

export default Feed;
