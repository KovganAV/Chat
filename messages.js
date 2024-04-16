const express = require('express');
const router = express.Router();
const Message = require('../webchat-frontend/src/api/message');

router.post('/', async (req, res) => {
  const { user_id, content } = req.body;

  try {
    const newMessage = new Message({ user_id, content });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  const messageId = req.params.id;

  try {
    await Message.findByIdAndDelete(messageId);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.patch('/:id', async (req, res) => {
  const messageId = req.params.id;
  const { content } = req.body;

  try {
    const updatedMessage = await Message.findByIdAndUpdate(messageId, { content }, { new: true });

    if (!updatedMessage) {
      return res.status(404).send('Message not found');
    }

    res.status(200).json(updatedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
