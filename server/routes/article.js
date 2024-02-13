import express from "express";
import {
  getArticle,
  postArticle,
  getOneArticle,
  deleteArticle,
  updateArticle,
  getComments,
  postComment,
  deleteComment,
} from "../controller/article.js";

const router = express.Router();

router.get("/", getArticle);
router.get("/:id", getOneArticle);
router.post("/", postArticle);
router.delete("/:id", deleteArticle);
router.patch("/:id", updateArticle);

router.get("/comments/:id", getComments);
router.post("/comments", postComment);
router.delete("/comments/:id", deleteComment);

export default router;
