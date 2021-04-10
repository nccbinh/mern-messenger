/**
 * Chat Util
 * @author Binh Nguyen
 * @since 0.0.1
 */
const mongoose = require("mongoose");
const Conversation = mongoose.model("Conversation");

/**
 * @name addConversation
 * @description creates a new conversation
 * @param {Object} conversation Conversation object.
 * @returns saved conversation object
 */
exports.addConversation = async function (conversation) {
  // starts a new conversation
  const finalConv = new Conversation(conversation);

  return finalConv.save().then(
    (conv) => {
      return conv;
    },
    (err) => {
      throw new Error(err);
    }
  );
};

/**
 * @name addMessage
 * @description add a message to a conversation
 * @param {string} id Conversation ID.
 * @param {Object} msg Message object.
 * @returns saved message object
 */
exports.addMessage = async function (id, msg) {
  return Conversation.findByIdAndUpdate(
    id,
    {
      $push: {
        messages: msg,
      },
    },
    { upsert: true }
  ).then(
    (conv) => {
      return conv;
    },
    (err) => {
      throw new Error(err);
    }
  );
};
