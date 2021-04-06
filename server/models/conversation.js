/**
 * Conversation Model
 * @author Binh Nguyen
 * @since 0.0.1
 */
 const mongoose = require('mongoose');

 const { Schema } = mongoose;
 
 const MessageSchema = new Schema({
    author: { type: String, index: true },
    content: String
 }, { timestamps: { createdAt: 'created' } });

 const ConversationSchema = new Schema({
     // for future use if group chat is implemented
    startedBy: { type: String, index: true },
    participants: [String],
    messages: [MessageSchema]
 }, { timestamps: { updatedAt: 'lastUpdated' } });
 
 mongoose.model('Conversation', ConversationSchema);