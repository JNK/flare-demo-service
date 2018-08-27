module.exports = {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  isHappy: {
    type: Boolean,
    required: true,
    default: true,
  },
};
