import express from "express";
import cors from "cors";
import bodyParser from "body-parser"; // Import the whole module
import { client, connectDB } from "./config/db.js";
import { ObjectId } from "mongodb";

const app = express();
const port = 8002;

// Destructure the necessary middleware functions
const { urlencoded, json } = bodyParser;

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

await connectDB(); // Ensure DB connection is established before starting the server
// Access the database and collection
const db = client.db("event-management"); // Replace 'mydatabase' with your database name
const collection = db.collection("events"); // Replace 'events' with your collection name

app.post("/events", async (req, res) => {
  const newEvent = req.body;
  try {
    const result = await collection.insertOne(newEvent);
    console.log("Document inserted with _id:", result.insertedId);
    res.send("200", newEvent);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Delete event route
app.delete("/delEvent", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).send("No event ID provided.");
  }

  try {
    // Convert id to ObjectId if necessary
    let objectId;
    if (ObjectId.isValid(id)) {
      objectId = new ObjectId(id);
    } else {
      return res.status(400).send("Invalid event ID format.");
    }

    const result = await collection.deleteOne({ _id: objectId });
    console.log(result);

    if (result.deletedCount === 0) {
      return res.status(404).send(`Event with ID ${id} not found.`);
    }
    res.status(200).send(`Event with ID ${id} deleted successfully.`);
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/getEvents", async (req, res) => {
  try {
    const events = await collection.find().toArray();

    res.send(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).send("Internal Server Error");
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
