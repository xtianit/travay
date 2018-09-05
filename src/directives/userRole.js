import { store } from '../store/';

const role = {
  manager: 0, // anyone who creates a job automatically gets this role
  evaluator: 1, // person whom a manager assigns to review the completion of a job
  worker: 2, // anyone who claims a job, but cannot be the manager or evaluator of that same job
  sponsor: 3 // anyone who donates to a job
};

const hide = vnode => {
  if (vnode.elm.parentElement) {
    vnode.elm.parentElement.removeChild(vnode.elm);
  }
};

export const userRole = {
  bind(el, binding, vnode) {
    const userId = store.userData;
    const { value, modifiers } = binding;
    if (value.role) {

      // Manager only
      if (Reflect.has(modifiers, 'manager')) {
        if (value.role[0] !== userId) hide(vnode);
      }

      // Evaluator only
      if (Reflect.has(modifiers, 'evaluator')) {
        if (value.role[1] !== userId) hide(vnode);
      }

      // Worker only
      if (Reflect.has(modifiers, 'worker')) {
        if (value.role[2] !== userId) hide(vnode);
      }

      // Sponsor only
      if (Reflect.has(modifiers, 'sponsor')) {
        if (value.role[3] !== userId) hide(vnode);
      }

      // Signed in users only
      if (Reflect.has(modifiers, 'signedIn')) {
        if (!userId) hide(vnode);
      }

      // Not for a poster of the job
      if (Reflect.has(value, 'posterId') && userId) {
        if (value.posterId === userId) {
          hide(vnode);
        }
      }

      // Only if user did not claim the job && is not the evaluator
      if (Reflect.has(modifiers, 'canClaim')) {
        if (
          value.role[0] === userId ||
          value.role[1].includes(userId) ||
          (value.role[3].includes(userId) && value.role[2] === userId)
        ) {
          console.log('NOT HIDING');
        } else {
          hide(vnode);
        }
      }

      // Only sponsor if not claimed, not the evaluator, not the manager, and not the worker
      if (Reflect.has(modifiers, 'canSponsor')) {
        if (
          value.role[0] === userId ||
          value.role[1] === userId ||
          value.role[2] === userId
        )
          hide(vnode);
      }
    }
  }
};
