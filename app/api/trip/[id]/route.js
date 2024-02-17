import { connectToDB } from "@utils/database";
import Trip from "@models/trip"

// GET Trips
export const GET = async (request, {params}) => {
    try {
        await connectToDB();
        const trip = await Trip.findById(params.id).populate('creator');
        if(!trip) return new Response("Trip not found", {status:404})
        return new Response(JSON.stringify(trip), {status: 200})
        
    } catch (error) {
        return new Reponse ("Failed to fetch all trips", {status: 500})
    }
}

// PATCH Trips
export const PATCH = async (request, {params}) => {
    const { trip, tag } = await request.json();

    try {
        await connectToDB();
        const existingTrip = await Trip.findByIdAndUpdate(
            params.id,
            {
                trip:trip, 
                tag: tag
            }
            );
        if(!existingTrip) return new Response ("Trip could not be updated", {status: 500})

        // existingTrip.trip = trip;
        // existingTrip.tag = tag;

        await existingTrip.save();
        return new Response(JSON.stringify(existingTrip), {status:200})
    } catch (error) {
        return new Response("Failed to update Trip", {status:500})
    }
}

// DELETE Trips
export const DELETE = async (request, {paramt}) => {
    try {
        await connectToDB();
        const toDeleteTrip = await Trip.findByIdAndDelete(params.id);
        return new Response("Trip deleted", {status: 200});
    } catch (error) {
        return new Response("Failed to delete trip", {status:500})
        
    }
}