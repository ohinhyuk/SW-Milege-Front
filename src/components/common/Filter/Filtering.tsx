import { Box, styled } from '@mui/material';
import CategoryAutoComplete from './CategoryAutoComplete';
import SemesterDropdown from './SemesterDropdown';
import IsVisibleDropdown from './IsVisibleDropdown';
import ItemAutoComplete from './ItemAutoComplete';
import GradeDropdown from './GradeDropdown';
import DepartmentDropdown from './DepartmentDropDown';
import StudentNameAutoComplete from './StudentNameAutoComplete';
import { useSelector } from 'react-redux';

const ResponsiveFilterBox = styled(Box)({
  padding: '10px 0px',
  overflowX: 'scroll',
  display: 'flex',
  width: '100%',
  gap: '10px',
});

export default function Filtering() {
  const tableNum = useSelector((state) => state.component.componentNum);

  function renderComponentsForTableNums(allowedTableNums, Component) {
    return allowedTableNums.includes(tableNum) ? Component : null;
  }
  return (
    <ResponsiveFilterBox>
      {renderComponentsForTableNums([0, 1, 2, 3, 4], <CategoryAutoComplete />)}
      {renderComponentsForTableNums([2, 3, 4, 9], <SemesterDropdown />)}
      {renderComponentsForTableNums([1, 2], <IsVisibleDropdown />)}
      {renderComponentsForTableNums([1, 2, 3, 4], <ItemAutoComplete />)}
      {renderComponentsForTableNums([3, 5, 6, 7, 8, 9, 10], <StudentNameAutoComplete />)}
      {renderComponentsForTableNums([5, 6], <GradeDropdown />)}
      {renderComponentsForTableNums([5, 6, 9], <DepartmentDropdown />)}
    </ResponsiveFilterBox>
  );
}
