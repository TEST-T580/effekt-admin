import { put, select, call } from 'redux-saga/effects';
import { uploadReportAction, ReportTypes } from './report-upload.actions';
import { AppState } from '../state';
import { IAccessToken } from '../../auth';
import * as API from '../../util/api';

const getApiToken = (state: AppState) => state.auth.currentToken;

export function* uploadReport(action: any) {
  try {
    const token: IAccessToken = yield select(getApiToken);

    let reportType;
    switch (action.payload.type) {
      case ReportTypes.OCR:
        reportType = 'ocr';
        break;
      case ReportTypes.PAYPAL:
        reportType = 'paypal';
        break;
      case ReportTypes.VIPPS:
        reportType = 'vipps';
        break;
      case ReportTypes.BANK:
        reportType = 'bank';
        break;
      default:
        throw new Error('Report type not supported');
    }

    const formData = new FormData();
    formData.append('report', action.payload.report);
    formData.append('metaOwnerID', action.payload.metaOwnerID);

    const data = yield call(API.call, {
      endpoint: `/reports/${reportType}`,
      method: API.Method.POST,
      token: token.token,
      formData,
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(
      uploadReportAction.done({ params: action.payload, result: data.content }),
    );
  } catch (ex) {
    yield put(uploadReportAction.failed({ params: action.payload, error: ex }));
  }
}
