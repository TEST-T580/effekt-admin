import { AnyAction, isType } from 'typescript-fsa';
import Decimal from 'decimal.js';
import { GraphingState } from '../state';
import { fetchTotalByPeriodAction } from './graphing.actions';
import { toastError } from '../../util/toasthelper';

export const graphingReducer = (
  state: GraphingState = {},
  action: AnyAction,
): GraphingState => {
  if (isType(action, fetchTotalByPeriodAction.done)) {
    return {
      ...state,
      total: action.payload.result.map((item) => ({
        ...item,
        sum: new Decimal(item.sum),
      })),
    };
  }
  if (isType(action, fetchTotalByPeriodAction.failed)) {
    toastError('Failed to get aggregated data', action.payload.error.message);
  }

  return state;
};
