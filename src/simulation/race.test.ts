import { describe, expect, it } from 'vitest';
import { runRace } from './race';

describe('cancel versus acceptance model', () => {
  it('exposes both-success contradiction on overlapping reads and blind writes', () => {
    const result = runRace({ strategy: 'unguarded', sequence: 'overlap', repeatCancel: false });
    expect(result.contradiction).toBe(true);
    expect(result.acceptedSuccess).toBe(true);
    expect(result.cancelledSuccess).toBe(true);
    expect(result.finalStatus).toBe('ACCEPTED');
    expect(result.version).toBe(2);
  });
  it('prevents stale second commit with an atomic expected-version check', () => {
    const result = runRace({ strategy: 'atomic', sequence: 'overlap', repeatCancel: false });
    expect(result.contradiction).toBe(false);
    expect(result.cancelledSuccess).toBe(true);
    expect(result.acceptedSuccess).toBe(false);
    expect(result.version).toBe(1);
    expect(result.steps.some(step => step.kind === 'conflict')).toBe(true);
  });
  it('accept-first sequentially rejects subsequent cancellation', () => {
    const result = runRace({ strategy: 'unguarded', sequence: 'accept-first', repeatCancel: false });
    expect(result.finalStatus).toBe('ACCEPTED');
    expect(result.contradiction).toBe(false);
    expect(result.cancelledSuccess).toBe(false);
  });
  it('cancel-first sequentially rejects subsequent acceptance', () => {
    const result = runRace({ strategy: 'atomic', sequence: 'cancel-first', repeatCancel: false });
    expect(result.finalStatus).toBe('CANCELLED');
    expect(result.acceptedSuccess).toBe(false);
  });
  it('repeat-cancel does not create another business effect under illustrative policy', () => {
    const result = runRace({ strategy: 'atomic', sequence: 'cancel-first', repeatCancel: true });
    expect(result.steps.at(-1)?.kind).toBe('effect');
    expect(result.version).toBe(1);
  });
});
