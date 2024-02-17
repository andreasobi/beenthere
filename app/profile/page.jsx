"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/profile';
import { Router } from 'next/router';

const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }
        if(session?.user.id) fetchPosts();
    },[session?.user.id]);

    const handleEdit = (trip) => {
        router.push(`/update-trip?id=${trip._id}`);
    }

    const handleDelete = (trip) => {

    }

    return (
        <Profile
         name="My"
         desc="Welcome to your Profile Page"
         data={posts}
         handleEdit={handleEdit}
         handleDelete={handleDelete}
        />
    )
}

export default MyProfile