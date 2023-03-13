import express from "express";
import {renderMain, renderRoom, createRoom, enterRoom, removeRoom, sendChat} from "../controllers/index.js";

const router = express.Router();

router.get("/", renderMain);

router.get("/room", renderRoom);

router.post("/room", createRoom);

router.get("/room/:id", enterRoom);

router.delete("/room/:id", removeRoom);

router.post("/room/:id/chat", sendChat);

export default router;