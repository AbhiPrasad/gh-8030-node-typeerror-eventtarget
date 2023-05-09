export class FsError extends Error {
  readonly error: unknown;

  constructor(message: string, e?: unknown) {
    super(message);

    this.error = e;
  }
}
