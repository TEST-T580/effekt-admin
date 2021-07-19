import React, { useEffect } from 'react'
import { RouteComponentProps, NavLink } from 'react-router-dom';
import { Page } from '../../style/elements/page.style';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../models/state';
import { IVippsAgreement } from '../../../models/types';
import { ResourceHeader, ResourceSubHeader, SubHeader } from '../../style/elements/headers.style';
import { HorizontalPanel } from '../donations/donation.component.style';
import { fetchVippsAgreementAction } from '../../../store/vipps/vipps.actions';
import { AgreementKeyInfoComponent } from '../../modules/vipps/singleagreement/agreement.keyinfo';
import { DistributionGraphComponent } from '../../modules/distribution/graph.component';

interface IParams {
    id: string
}

export const VippsAgreementPageComponent: React.FunctionComponent<RouteComponentProps<IParams>> = ({ match }: RouteComponentProps<IParams>) => {
    const agreementID = match.params.id
    const dispatch = useDispatch()

    const agreement: IVippsAgreement | undefined = useSelector((state: AppState) => state.vippsAgreements.currentAgreement)

    useEffect(() => {
        dispatch(fetchVippsAgreementAction.started({ id: agreementID }))
    }, [agreementID, dispatch])


    if (agreement && !agreement.id) {
        return (
            <Page>
                <ResourceHeader hasSubHeader={true}>Agreement {agreementID} not found</ResourceHeader>

                <NavLink to={`/vipps/agreements`}>See all agreements</NavLink><br></br>
            </Page>
        )
    }
    if (agreement && agreement.id) {
        return (
            <Page>
                <ResourceHeader hasSubHeader={true}>Agreement {agreementID}</ResourceHeader>
                <ResourceSubHeader>Donor ID {agreement.donorID}</ResourceSubHeader>

                <SubHeader>Keyinfo</SubHeader>
                <HorizontalPanel>
                    <div style={{ width: '400px', height: '380px' }}>
                        <DistributionGraphComponent distribution={agreement.distribution}></DistributionGraphComponent>
                    </div>
                    <AgreementKeyInfoComponent agreement={agreement} />
                </HorizontalPanel>

                <SubHeader>Meta</SubHeader>
                {agreement.status === "ACTIVE" && <div><a target="_blank" rel="noreferrer" href={`https://minside.gieffektivt.no/${agreement.agreement_url_code}`}>Edit agreement</a><br></br></div>}
                <NavLink to={`/vipps/agreements`}>See all agreements</NavLink><br></br>
            </Page>
        )
    }
    else {
        return (<Page>Loading agreement {agreementID}</Page>)
    }
}