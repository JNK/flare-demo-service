/**
 * This handler will create a new foo.
 *
 * @param context <> - The default invocation context
 * @param name <String> - The name of the new foo
 *
 * @returns the new foo
 */
module.exports = async (context, name) => {
  let newFoo;

  try {
    newFoo = await context.foo.createOne({ name });
  } catch (error) {
    context.log.warn('Failed to create a foo', error.message);
    await context.helpers.crazyFunction([]);
    throw Error('Failed to create foo');
  }

  await context.emit('foo-created', newFoo);

  return newFoo;
};
