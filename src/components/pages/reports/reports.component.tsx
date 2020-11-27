import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
import { Page } from '../../shared/elements/page.style';
import { MainHeader, SubHeader } from '../../shared/elements/headers.style';
import { AppState } from '../../../store/state';
import {
  EffektSwitch,
  SwitchSelected,
} from '../../shared/elements/effekt-switch/effekt-switch.component';
import {
  EffektCheckChoice,
  EffektCheckForm,
} from '../../shared/elements/effekt-check/effekt-check-form.component';
import { API_URL } from '../../../config/config';
import { EffektButton } from '../../shared/elements/button.style';
import { grey30 } from '../../../config/colors';
import {
  FormSection,
  FormSectionHeader,
} from '../../shared/elements/from-section';
import { EffektDateRange } from '../../shared/range/date-range.component';
import { fetchPaymentMethodsAction } from '../../../store/donations/donation/single/single-donation.actions';

export enum ReportFileFormats {
  EXCEL,
  JSON,
}

export const ReportsComponent: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const token = useSelector((state: AppState) => state.auth.currentToken);

  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(new Date());

  // TODO: CREATE GENERAL PAYMENT METHOD SELECTOR
  // TODO: Move payment methods to different place in state
  const paymentMethods = useSelector(
    (state: AppState) => state.singleDonation.paymentMethods,
  );
  if (paymentMethods.length === 0)
    dispatch(fetchPaymentMethodsAction.started(undefined));

  const [paymentMethodIds, setPaymentMethodIds] = useState<Array<number>>([4]);
  const paymentMethodChoices: Array<EffektCheckChoice> = paymentMethods.map(
    (method) => ({
      label: method.abbriviation,
      value: method.id,
      selected: paymentMethodIds.indexOf(method.id) !== -1,
    }),
  );

  const [fileFormat, setFileFormat] = useState<ReportFileFormats>(
    ReportFileFormats.EXCEL,
  );
  const fileFormatChanged = useCallback(
    (selected: SwitchSelected) =>
      setFileFormat(
        selected === SwitchSelected.LEFT
          ? ReportFileFormats.EXCEL
          : ReportFileFormats.JSON,
      ),
    [setFileFormat],
  );

  const reportRangeUrl = `${API_URL}/reports/range?pretty`;
  const form = React.createRef<HTMLFormElement>();

  return (
    <Page>
      <MainHeader>Reports</MainHeader>
      <SubHeader>Transaction reports</SubHeader>
      <form method="POST" action={reportRangeUrl} target="_blank" ref={form}>
        {/* Consider splitting each section into subcomponents */}
        <FormSection>
          <FormSectionHeader>Range</FormSectionHeader>

          <EffektDateRange
            from={from}
            onChangeFrom={(date: Date | null) => setFrom(date)}
            to={to}
            onChangeTo={(date: Date | null) => setTo(date)}
          />

          <span style={{ color: grey30, marginLeft: '14px', fontSize: '14px' }}>
            Date range is inclusive
          </span>

          <input
            type="hidden"
            name="fromDate"
            value={from ? DateTime.fromJSDate(from).toISODate().toString() : ''}
          />
          <input
            type="hidden"
            name="toDate"
            value={to ? DateTime.fromJSDate(to).toISODate().toString() : ''}
          />
        </FormSection>

        <FormSection>
          <FormSectionHeader>Payment methods</FormSectionHeader>

          <EffektCheckForm
            choices={paymentMethodChoices}
            onChange={(choices) => setPaymentMethodIds(choices)}
          />
          <input
            type="hidden"
            name="paymentMethodIDs"
            value={paymentMethodIds.join('|')}
          />
        </FormSection>

        <FormSection>
          <FormSectionHeader>Filetype</FormSectionHeader>

          <EffektSwitch
            left="Excel"
            right="JSON"
            selected={
              fileFormat === ReportFileFormats.EXCEL
                ? SwitchSelected.LEFT
                : SwitchSelected.RIGHT
            }
            onChange={fileFormatChanged}
          />
          <input
            type="hidden"
            name="filetype"
            value={fileFormat === ReportFileFormats.EXCEL ? 'excel' : 'json'}
          />
        </FormSection>

        <input type="hidden" name="token" value={token ? token.token : ''} />

        <EffektButton onClick={() => form.current && form.current.submit()}>
          Download
        </EffektButton>
      </form>
    </Page>
  );
};
