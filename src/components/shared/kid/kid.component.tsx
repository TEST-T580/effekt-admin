import React, { useState } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import Decimal from 'decimal.js';
import { AppState } from '../../../store/state';

// Styling
import {
  KIDWrapper,
  KIDUpperBracket,
  KIDLowerBracket,
  KIDInnerContent,
} from './kid.component.style';

// Models
import { IOrganization, IDistributionShare } from '../../../types';

// SubComponents
import { KIDDonorComponent } from './donor/donor.component';
import { KIDControls } from './controls/controls.component';
import { KIDDistribution } from './distribution/distribution.component';
import { calculateDistributionSum } from '../../../util/kid';
import { showDonorSelectionComponent } from '../../../store/donor/select/donor-selection.actions';

interface IProps {
  donationAmount?: number;
  organizations: Array<IOrganization>;
  KID?: number;
  distribution: Array<IDistributionShare>;
  onChange(distribution: Array<IDistributionShare>): void;
}

export const KIDComponent: React.FunctionComponent<IProps> = ({
  donationAmount,
  organizations,
  KID,
  onChange,
  distribution,
}) => {
  const dispatch = useDispatch();

  const [distributionSum, setDistributionSum] = useState<Decimal>(
    calculateDistributionSum(distribution),
  );
  // TODO: Add support for absolute values
  const distributionMax = new Decimal(100);

  const donor = useSelector(
    (state: AppState) => state.donorSelector.selectedDonor,
  );

  const openDonorSelectionDialog = () => {
    dispatch(showDonorSelectionComponent());
  };

  const distributionChanged = (distribution: Array<IDistributionShare>) => {
    setDistributionSum(calculateDistributionSum(distribution));
    onChange(distribution);
  };

  return (
    <KIDWrapper>
      <KIDUpperBracket />
      <KIDInnerContent>
        {/* Donor */}
        <div>
          <KIDDonorComponent
            selectedDonor={donor}
            openDonorSelectionDialog={openDonorSelectionDialog}
          />
        </div>
        {/* Split */}
        <div>
          <KIDDistribution
            distribution={distribution}
            onChange={distributionChanged}
          />
        </div>

        {/* Controls */}
        <div>
          <KIDControls
            distributionMax={distributionMax}
            distributionSum={distributionSum}
          />
        </div>
      </KIDInnerContent>
      <KIDLowerBracket />
    </KIDWrapper>
  );
};
