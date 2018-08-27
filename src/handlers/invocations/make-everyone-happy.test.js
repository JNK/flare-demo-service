const { handler, contextBuilder, db } = requireHandler(__dirname, './make-everyone-happy');

describe('make-everyone-happy', () => {
  beforeAll(async () => {
    await db.open();
  });

  beforeEach(async () => {
    await db.clear();
  });

  it('should make 3 foos happy when every foo is sad', async () => {
    // Arrange
    const context = await contextBuilder('all sad');

    // Act
    const output = await handler(context);

    // Assert
    expect(output).not.toBeNull();
    expect(output.length).toBe(3);
  });

  it('should make one foo happy when one foo is sad', async () => {
    // Arrange
    const context = await contextBuilder('some happy');

    // Act
    const output = await handler(context);

    // Assert
    expect(output).not.toBeNull();
    expect(output.length).toBe(1);
  });

  it('should make no foo happy when all foos are happy', async () => {
    // Arrange
    const context = await contextBuilder('all happy');

    // Act
    const output = await handler(context);

    // Assert
    expect(output).not.toBeNull();
    expect(output.length).toBe(0);
  });

  afterAll(async () => {
    await db.close();
  });
});
