import { connectToDB } from "@utils/database";
import Trip from "@models/trip"

export const GET = async (request) => {
    try {
        await connectToDB();
        const trips = await Trip.find({}).populate('creator');

        return new Response(JSON.stringify(trips), {status: 200})
    } catch (error) {
        return new Reponse ("Failed to fetch all trips", {status: 500})
    }
}