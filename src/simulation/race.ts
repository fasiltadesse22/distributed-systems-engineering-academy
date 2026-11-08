/** Deterministic educational model. NOT a claim about the Food Ordering Java runtime. */
export type OrderStatus = 'PLACED' | 'CANCELLED' | 'ACCEPTED';
export type Actor = 'Customer' | 'Restaurant';
export type Strategy = 'unguarded' | 'atomic';
export type Sequence = 'cancel-first' | 'accept-first' | 'overlap';
export type ResultKind = 'read' | 'accepted' | 'rejected' | 'conflict' | 'effect';

export interface RaceStep {
  index: number;
  actor: Actor;
  kind: ResultKind;
  label: string;
  before: OrderStatus;
  after: OrderStatus;
  detail: string;
}
export interface RaceInput {
  strategy: Strategy;
  sequence: Sequence;
  repeatCancel: boolean;
}
export interface RaceResult {
  steps: RaceStep[];
  finalStatus: OrderStatus;
  version: number;
  acceptedSuccess: boolean;
  cancelledSuccess: boolean;
  contradiction: boolean;
  summary: string;
  safety: string;
}
interface Attempt {
  actor: Actor;
  wants: OrderStatus;
  snapshot: OrderStatus;
  version: number;
}
export function runRace(input: RaceInput): RaceResult {
  let status: OrderStatus = 'PLACED';
  let version = 0;
  const steps: RaceStep[] = [];
  let acceptedSuccess = false;
  let cancelledSuccess = false;
  const push = (actor: Actor, kind: ResultKind, label: string, before: OrderStatus, after: OrderStatus, detail: string) => {
    steps.push({ index: steps.length + 1, actor, kind, label, before, after, detail });
  };
  const read = (actor: Actor, wants: OrderStatus): Attempt => {
    push(actor, 'read', 'Read current state', status, status, 'Read ' + status + ' at version ' + version + '.');
    return { actor, wants, snapshot: status, version };
  };
  const commit = (attempt: Attempt) => {
    if (attempt.snapshot !== 'PLACED') {
      push(attempt.actor, 'rejected', 'Rejected by business policy', status, status, 'The command observed ' + attempt.snapshot + '; only PLACED is eligible.');
      return;
    }
    if (input.strategy === 'atomic' && (status !== 'PLACED' || version !== attempt.version)) {
      push(attempt.actor, 'conflict', 'Atomic guard rejects stale attempt', status, status, 'Expected PLACED at version ' + attempt.version + ', but current state is ' + status + ' at version ' + version + '.');
      return;
    }
    const before = status;
    status = attempt.wants;
    version++;
    if (attempt.actor === 'Customer') cancelledSuccess = true;
    else acceptedSuccess = true;
    push(attempt.actor, 'accepted', 'Committed ' + status, before, status, 'Accepted ' + attempt.actor + ' command using ' + input.strategy + ' strategy. Version is now ' + version + '.');
  };
  if (input.sequence === 'overlap') {
    const cancel = read('Customer', 'CANCELLED');
    const accept = read('Restaurant', 'ACCEPTED');
    commit(cancel);
    commit(accept);
  } else {
    const actors: Actor[] = input.sequence === 'cancel-first' ? ['Customer', 'Restaurant'] : ['Restaurant', 'Customer'];
    for (const actor of actors) {
      const wants = actor === 'Customer' ? 'CANCELLED' : 'ACCEPTED';
      commit(read(actor, wants));
    }
  }
  if (input.repeatCancel) {
    const before = status;
    push('Customer', 'effect', 'Repeat cancellation command', before, before, (status as OrderStatus) === 'CANCELLED'
      ? 'Policy reports already-cancelled without a second business effect.'
      : 'Policy rejects repeat because the order is not cancellable.');
  }
  const contradiction = acceptedSuccess && cancelledSuccess;
  return {
    steps, finalStatus: status, version, acceptedSuccess, cancelledSuccess, contradiction,
    summary: contradiction
      ? 'Both exclusive outcomes reported success even though the final stored state shows only one. Last-write-wins hides the earlier effect.'
      : input.sequence === 'overlap'
        ? 'Atomic compare-and-update allows only one competing command to commit from the shared snapshot.'
        : 'Sequential evaluation sees the committed state and denies the incompatible second command.',
    safety: contradiction
      ? 'Invariant violated: acceptance and cancellation must not both be confirmed for this order version.'
      : 'Exclusive-success invariant preserved in this modeled execution. This is not proof for a real database or multi-instance service.',
  };
}
