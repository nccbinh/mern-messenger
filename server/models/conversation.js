/**
 * Conversation Model
 * @author Binh Nguyen
 * @since 0.0.1
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
   author: { type: Schema.Types.ObjectId, ref: 'User' },
   content: String
}, { timestamps: { createdAt: 'created' } });

const UnreadSchema = new Schema({
   user: { type: Schema.Types.ObjectId, ref: 'User' },
   count: Number
});

const ConversationSchema = new Schema({
   // for future use if group chat is implemented
   startedBy: { type: Schema.Types.ObjectId, ref: 'User' },
   participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
   messages: [MessageSchema],
   unread: [UnreadSchema]
}, { timestamps: { updatedAt: 'lastUpdated' } });

mongoose.model('Conversation', ConversationSchema);