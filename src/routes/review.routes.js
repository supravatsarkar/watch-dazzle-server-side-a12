const express = require("express");
const reviewController = require("../controllers/review.controllers");

const router = express.Router();

router.get("/", reviewController.getReviews);
router.get("/:id", reviewController.getReviewDetails);
router.post("/", reviewController.addReview);

module.exports = router;
