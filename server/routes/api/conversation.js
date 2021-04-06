/**
 * Conversation API
 * @author Binh Nguyen
 * @since 0.0.1
 */
const mongoose = require('mongoose');
const router = require('express').Router();
const Conversation = mongoose.model('Conversation');
const User = mongoose.model('User');
const Auth = require('../../middlewares/auth');
const Validator = require('../../middlewares/validator');

/**
 * GET conversation
 * @description get all conversations of a user by username.
 * @returns 201 if success, 422 if fail.
 */
router.get('/', Auth, Validator.searchConversation, async (req, res, next) => {
    // gets username from request
    const username = req.user.username;
    // gets all conversations and sorts by last updated
    Conversation.find({ participants: username }).sort('-lastUpdated').then(
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
                    preview: c.messages[c.messages.length - 1].content
                }
            });
            return res.status(200).json(conv);
        },
        (err) => {
            console.log(err);
            return res.status(500).json({
                message: 'Internal server error. Please try again later.'
            });
        }
    );
});

/**
 * GET messages
 * @description get all messages of a conversation.
 * @returns 201 if success, 422 if fail.
 */
router.get('/:id', Auth, async (req, res, next) => {
    const id = req.params.id;
    Conversation.findOne({ _id: id }).then(
        (result) => {
            if (!result) {
                return res.status(422).json({ message: 'Conversation not found.' });
            }
            // checks if logged in user is one of the participants
            if (result.participants.indexOf(req.user.username) < 0) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            // sorts by last updated
            return res.status(200)
                .json(result.messages.sort((a, b) => { return a.lastUpdated - b.lastUpdated }));
        },
        (err) => {
            console.log(err);
            return res.status(500).json({
                message: 'Internal server error. Please try again later.'
            });
        }
    );
});

/**
 * POST start
 * @description Start a new conversation.
 */
router.post('/', Auth, Validator.newConversation, async (req, res, next) => {
    const username = req.user.username;
    const { body: { conversation } } = req;
    const recipient = await User.findOne({ username: conversation.to });
    // checks if the user to start the conversation with exists
    if(!recipient) {
        return res.status(422).json({
            errors: { to: 'Recipient not found.' }
        });
    }
    // starts a new conversation
    const conv = {
        startedBy: username,
        participants: [username, conversation.to],
        messages: [{
            author: username,
            content: conversation.message
        }]
    };
    const finalConv = new Conversation(conv);

    return finalConv.save()
        .then(
            (conv) => {
                res.status(201).json({
                    message: 'Conversation created successfully.',
                    id: conv._id
                });
            },
            (err) => {
                console.log(err);
                return res.status(500).json({
                    message: 'Internal server error. Please try again later.'
                });
            });
});

module.exports = router;