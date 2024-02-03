import { connectToDB } from "@utils/database";
import Trip from "@models/trip"

export const POST = async (req) => {
    const {userId, trip, tag} = await req.json();

    try {
        await connectToDB();
        const newTrip = new Trip({
            creator: userId,
            trip,
            tag
        })

        await newTrip.save();
        return new Response (JSON.stringify(newTrip), {status: 201})

    } catch (error) {
        return new Response("Failed to create a new trip", {status: 500})
    }
}