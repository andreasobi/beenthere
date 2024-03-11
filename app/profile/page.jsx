"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/profile';

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

    const handleDelete = async (trip) => {
        const userHasConfirmed = confirm("Are you sure you want to delete this Trip?");

        if(userHasConfirmed){
            try {
                await fetch(`/api/trip/${trip._id.toString()}`, {
                    method: 'DELETE'
                });

                const filteredPosts = posts.filter((p) => p._id !== trip._id);
                setPosts(filteredPosts);

            } catch (error) {
                onsole.error('Error deleting trip:', error);
                console.log(error);
            }
        }
    }
    return (
        <Profile
         data={posts}
         handleEdit={handleEdit}
         handleDelete={handleDelete}
        />
    )
}

export default MyProfile