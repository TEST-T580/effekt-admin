import { isType, AnyAction } from 'typescript-fsa';
import { toast } from 'react-toastify';
import { CreateDonorState } from '../../state';
import { createDonorAction } from './create-donor.actions';
import { toastError } from '../../../util/toasthelper';

export const CreateDonorReducer = (
  state: CreateDonorState = {},
  action: AnyAction,
): CreateDonorState => {
  if (isType(action, createDonorAction.done)) {
    toast.success('Created donor!');
  } else if (isType(action, createDonorAction.failed)) {
    toastError('Failed to create donor!', action.payload.error.message);
  }

  return {};
};
