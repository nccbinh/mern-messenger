/**
 * Conversation API
 * @author Binh Nguyen
 * @since 0.0.1
 */
const mongoose = require("mongoose");
const router = require("express").Router();
const Conversation = mongoose.model("Conversation");
const User = mongoose.model("User");
const Auth = require("../../middlewares/auth");
const Validator = require("../../middlewares/validator");

/**
 * GET conversation
 * @description get all conversations of a user by username.
 * @returns 201 if success, 422 if fail.
 */
router.get("/", Auth, async (req, res, next) => {
  // gets username from request
  const userId = req.user.id;
  // gets all conversations and sorts by last updated
  Conversation.find({ participants: userId })
    .sort("-lastUpdated")
    .populate("participants", "username")
    .then(
      (results) => {
        // breaks if no matches
        if (!results || !results.length) {
          return res.status(200).json([]);
        }
        // removes unnecessary fields
        let conv = results.map((c) => {
          return {
            id: c._id,
            participants: c.participants,
            lastUpdated: c.lastUpdated,
            // shows only the most recent message for preview
            preview: c.messages[c.messages.length - 1],
          };
        });
        return res.status(200).json(conv);
      },
      (err) => {
        console.log(err);
        return res.status(500).json({
          message: "Internal server error. Please try again later.",
        });
      }
    );
});

/**
 * GET messages
 * @description get all messages of a conversation.
 * @returns 201 if success, 422 if fail.
 */
router.get("/:id", Auth, async (req, res, next) => {
  const id = req.params.id;
  Conversation.findOne({ _id: id })
    .populate("author", "username")
    .then(
      (result) => {
        if (!result) {
          return res.status(422).json({ message: "Conversation not found." });
        }
        // checks if logged in user is one of the participants
        if (result.participants.indexOf(req.user.id) < 0) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        // sorts by last updated
        return res.status(200).json(
          result.messages.sort((a, b) => {
            return a.lastUpdated - b.lastUpdated;
          })
        );
      },
      (err) => {
        console.log(err);
        return res.status(500).json({
          message: "Internal server error. Please try again later.",
        });
      }
    );
});

/**
 * POST start
 * @description Start a new conversation.
 */
router.post("/", Auth, Validator.newConversation, async (req, res, next) => {
  const userId = req.user.id;
  const {
    body: { conversation },
  } = req;
  const recipient = await User.findOne({ username: conversation.to });
  // checks if all members exist
  if (!userId || !recipient) {
    return res.status(422).json({
      errors: { to: "Recipient not found." },
    });
  }
  // starts a new conversation
  const conv = {
    startedBy: userId,
    participants: [userId, recipient._id],
    messages: [
      {
        author: userId,
        content: conversation.message,
      },
    ],
  };
  const finalConv = new Conversation(conv);

  return finalConv.save().then(
    (conv) => {
      res.status(201).json({
        message: "Conversation created successfully.",
        id: conv._id,
      });
    },
    (err) => {
      console.log(err);
      return res.status(500).json({
        message: "Internal server error. Please try again later.",
      });
    }
  );
});

/**
 * POST start
 * @description Start a new conversation.
 */
router.post("/:id", Auth, Validator.newMessage, async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;
  const {
    body: { message },
  } = req;

  // starts a new conversation
  const msg = {
    author: userId,
    content: message,
  };

  return Conversation.findByIdAndUpdate(
    id,
    {
      $push: {
        messages: msg,
      }
    },
    { upsert: true }
  ).then(
    (conv) => {
      return res.status(201).json({
        message: "Message created successfully.",
        id: conv._id,
      });
    },
    (err) => {
      console.log(err);
      return res.status(500).json({
        message: "Internal server error. Please try again later.",
      });
    }
  );
});

module.exports = router;
