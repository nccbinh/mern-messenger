/**
 * Conversation API
 * @author Binh Nguyen
 * @since 0.0.1
 */
const mongoose = require('mongoose');
const router = require('express').Router();
const Conversation = mongoose.model('Conversation');
const Auth = require('../../middlewares/auth');
const Validator = require('../../middlewares/validator');

/**
 * GET conversation
 * @description get all conversations of a user by username.
 * @returns 201 if success, 422 if fail.
 */
router.get('/getConversations', Auth, Validator.searchConversation, async (req, res, next) => {
    const username = req.query.username;
    Conversation.find({ participants: username }).then(
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
            // sorts by last updated
            conv = conv.sort((a, b) => { return a.lastUpdated - b.lastUpdated });
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
router.get('/getMessages', Auth, Validator.getConversation, async (req, res, next) => {
    const id = req.query.id;
    Conversation.find({ _id: id }).then(
        (results) => {
            if (!results || !results.length) {
                return res.status(422).json({ message: 'Conversation not found.' });
            }
            const result = results[0];
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
router.post('/start', Auth, Validator.newConversation, async (req, res, next) => {
    const { body: { conversation } } = req;
    const conv = {
        startedBy: conversation.from,
        participants: [conversation.from, conversation.to],
        lastUpdated: new Date(),
        messages: [{
            author: conversation.from,
            created: new Date(),
            content: conversation.message
        }]
    };
    const finalConv = new Conversation(conv);

    return finalConv.save()
        .then(
            () => {
                res.status(200).json({
                    message: 'Conversation created successfully.'
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