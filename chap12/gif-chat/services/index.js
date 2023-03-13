import Room from "../schemas/room.js";
import Chat from "../schemas/chat.js";

export default async function removeRoom(roomId) {
  try {
    await Room.deleteMany({_id: roomId});
    await Chat.deleteMany({room: roomId});
  } catch (error) {
    throw error;
  }
};