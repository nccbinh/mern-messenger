/**
 * Conversation Model
 * @author Binh Nguyen
 * @since 0.0.1
 */
 const mongoose = require('mongoose');

 const { Schema } = mongoose;
 
 const MessageSchema = new Schema({
    author: { type: String, index: true },
    created: Date,
    content: String
 });

 const ConversationSchema = new Schema({
     // for future use if group chat is implemented
    startedBy: { type: String, index: true },
    // references to participated users can be made here, but that would make no-sql pointless
    // conversation starter is included
    participants: [String],
    lastUpdated: Date,
    messages: [MessageSchema]
 });
 
 mongoose.model('Conversation', ConversationSchema);