/**
 * This handler will make all unhappy foo's happy.
 *
 * @param context <> - The default invocation context
 *
 * @returns an array of the foo's that are now happy
 */
module.exports = async (context) => {
  let happyFoos;

  try {
    happyFoos = await context.foo.updateMany({ isHappy: false }, { isHappy: true });
  } catch (error) {
    context.log.warn('Failed to make everyone happy', error.message);
    throw Error('Failed to make everyone happy!');
  }

  return happyFoos;
};
