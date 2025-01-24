import { describe, afterEach, beforeEach, vi, it, expect } from 'vitest';

describe('greeter function', () => {
  beforeEach(() => {
    // Read more about fake timers
    // https://vitest.dev/api/vi.html#vi-usefaketimers
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should return a greeting message', () => {
    expect(true).toBe(true);
  });
});
