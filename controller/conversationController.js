const ProcessedMessage = require('../models/ProcessedMessage');

// GET /conversations
exports.getConversations = async (req, res, next) => {
  try {
    const convos = await ProcessedMessage.aggregate([
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: '$waId',
          lastMessage:   { $first: '$body' },
          lastTimestamp: { $first: '$timestamp' },
          unreadCount:   { $sum: { $cond: [{ $eq: ['$status', 'sent'] }, 1, 0] } }
        }
      },
      {
        $project: {
          waId: '$_id', lastMessage: 1, lastTimestamp: 1, unreadCount: 1, _id: 0
        }
      }
    ]);
    res.json(convos);
  } catch (err) {
    next(err);
  }
};
