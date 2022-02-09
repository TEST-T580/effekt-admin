import styled from 'styled-components';
import { grey15, grey02, grey30, grey70, azure02, azure50, } from '../../colors';
import checked_inactive from '../../../../assets/checked_inactive.svg';
import checked_active from '../../../../assets/checked_active.svg';

interface WrapperProps {
  checked: boolean;
}

export const EffektCheckWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
  user-select: none;
  margin: 6px 0;
`;

export const EffektCheckBox = styled.div<WrapperProps>`
  display: inline-block;
  vertical-align: middle;

  border: 1px solid ${grey15};
  background-color: ${grey02};
  width: 24px;
  height: 24px;

  background-image: url('${(props) => (props.checked ?  checked_active : checked_inactive)}');
  background-size: 20px;
  background-position: center;
  background-repeat: no-repeat;
`;

interface LabelProps {
  inverted: boolean;
}
export const EffektCheckLabel = styled.div<LabelProps>`
  display: inline-block;
  vertical-align: middle;
  color: ${(props) => (props.inverted ?  'white' : 'black')};
  font-weight: 600;
  font-size: 14px;
  margin-left: 10px;
`;

export const SelectAllButton = styled.div`  
    font-size: 12px;
    text-decoration: underline;
    margin-top: 0px;
    font-weight: 500;
    color: ${grey70};
    &:hover{
      color: ${grey30};
      cursor: pointer;
    }
    &:active{
      color: ${azure50};
    }
`;