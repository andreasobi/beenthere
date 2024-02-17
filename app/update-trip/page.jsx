'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from '@components/Form';

const EditTrip = () => {
    const searchParams = useSearchParams();
    const tripId = searchParams.get('id');
    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        trip:'',
        tag:'',
    });

    // This Effect happens whenever the tripId changes
    useEffect(() => {
        const getTripDetails = async () => {
            const response = await fetch(`/api/trip/${tripId}`);
            const data = await response.json();
            setPost({
                trip: data.trip,
                tag: data.tag
            })
        }
        if(tripId) getTripDetails();
    }, [tripId])

    const updateTrip = async (e) => {

        //Prevents reload of the browser
        e.preventDefault();
        setSubmitting(true);

        if(!tripId) return alert("Trip ID not found")

        try {
            const response = await fetch (`/api/trip/${tripId}`,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    trip: post.trip,
                    tag: post.tag
                })
            });
            if(response.ok) {
                router.push('/');
            }

        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

  return (
    <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updateTrip}
    />
  )
}

export default EditTrip