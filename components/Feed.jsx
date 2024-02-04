'use client';

import { useState, useEffect } from 'react';
import TripCard from './TripCard';

const TripCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <TripCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
  }

  useEffect(() => {
      const fetchPosts = async () => {
        const response = await fetch('api/trip');
        const data = await response.json();

        setPosts(data);
      }

      fetchPosts();
    },[]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for Trips"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <TripCardList
        data={posts}
        handleTagClick={() => {}}
      />

    </section>  
  )
};

export default Feed;
