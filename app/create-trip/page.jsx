'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreateTrip = () => {
    const router = useRouter();
    const {data: session} = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        trip:'',
        tag:'',
    });

    const createTrip = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch ('/api/trip/new',
            {
                method: 'POST',
                body: JSON.stringify({
                    trip: post.trip,
                    userId: session?.user.id,
                    tag: post.tag
                })
            })

            if(response.ok) {
                router.push('/');
            }

        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

  return (
    <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createTrip}
    />
  )
}

export default CreateTrip