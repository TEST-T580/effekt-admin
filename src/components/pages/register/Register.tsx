import { MainHeader, SubHeader } from '../../style/elements/headers.style';
import React from 'react';
import { Page } from '../../style/elements/page.style';
import { SingleDonation } from '../../modules/single-donation/SingleDonation';
import { ReportUpload } from '../../modules/report-upload/ReportUpload';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../models/state';
import { fetchActiveOrganizationsAction } from '../../../store/organizations/organizations.action';
import { RegisterReceiptComponent } from '../../modules/donations/receipt/Receipt';

export const RegisterComponent: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const organizations = useSelector((state: AppState) => state.organizations.active);
  if (!organizations) {
    dispatch(fetchActiveOrganizationsAction.started(undefined));
    return <div>Loading organizations</div>;
  }

  return (
    <Page>
      <MainHeader>Register donations</MainHeader>

      <SubHeader>Upload report</SubHeader>
      <ReportUpload></ReportUpload>

      <SubHeader>Process single donation</SubHeader>
      <SingleDonation organizations={organizations}></SingleDonation>

      <SubHeader>Resend receipt</SubHeader>
      <RegisterReceiptComponent></RegisterReceiptComponent>
    </Page>
  );
};
