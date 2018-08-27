const { handler, contextBuilder, db } = requireHandler(__dirname, './create-foo');

describe('create-foo', () => {
  beforeAll(async () => {
    await db.open();
  });

  beforeEach(async () => {
    await db.clear();
  });

  it('should create a new foo with the provided name', async () => {
    // Arrange
    const input = 'John';
    const context = await contextBuilder();

    // Act
    const output = await handler(context, input);

    // Assert
    expect(output).not.toBeNull();
    expect(output.id).not.toBeNull();
    expect(output.name).toEqual(input);
    expect(context.mocks.emit('foo-created')).toHaveBeenCalledWith(output);
  });

  it('should throw an error when a foo name is already taken', async () => {
    // Arrange
    const input = 'real foo';
    const context = await contextBuilder('taken name');
    context.mocks.invoke('some-service', 'some-handler').mockReturnValue('bla');
    context.mocks.invoke('some-service', 'another-handler').mockImplementation(() => ({ foo: 'bar' }));

    // Act
    const outputPromise = handler(context, input);

    // Assert
    expect(outputPromise).rejects.toThrow();
    expect(context.mocks.emit('foo-created')).toHaveBeenCalledTimes(0);
  });

  afterAll(async () => {
    await db.close();
  });
});
