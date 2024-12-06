const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const asyncwrap = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js")
const upload=multer({storage});

const listingController = require("../controllers/listings.js");

router
  .route("/")
  .get(asyncwrap(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    asyncwrap(listingController.createListing)
  );

//New Route
router.get("/new", isLoggedIn, asyncwrap(listingController.renderNewForm));

router
  .route("/:id")
  .get(asyncwrap(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    asyncwrap(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, asyncwrap(listingController.destroyListing));

//edit
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  asyncwrap(listingController.renderEditForm)
);

module.exports = router;
