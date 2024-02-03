import {Schema, model, models} from "mongoose";

const TripSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    trip: {
        type: String,
        required: [true, "Trip is required."],
    },
    tag: {
        type: String,
        required: [true, "Tag is required."]
    }
});

const Trip = models.Trip || model("Trip", TripSchema);

export default Trip;