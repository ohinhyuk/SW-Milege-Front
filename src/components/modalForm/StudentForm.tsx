import { ErrorMessage, Field, Form, Formik } from 'formik';

import {
  Box,
  Button,
  Chip,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  styled,
} from '@mui/material';
import * as Yup from 'yup';
import { ButtonFlexBox, engToKor } from '../common/modal/SWModal';
import {
  DESCRIPTION,
  CATEGORY,
  MAX_MILEAGE,
  SEMESTER,
  ITEM,
  MILEAGE,
  DESCRIPTION1,
  DESCRIPTION2,
  FILE_DESCRIPTION,
  ISVISIBLE,
  ISVISIBLE_STUDENT,
  ISINPUT_STUDENT,
  ISDUPLICATE_RECORD,
  ISEVALUATE_CSEE,
  ISEVALUATE_PORTFOLIO,
  ISEVALUATE_FUSION,
  MAX_MAILEAGE,
  NUM,
  NAME,
  MOBILE,
  EMAIL,
  ISAPPROVED,
  DEPARTMENT,
  MAJOR1,
  MAJOR2,
  YEAR,
  SEMESTERCOUNT,
} from 'src/assets/data/fields';
import { useSelector } from 'react-redux';
import {
  ADDGLOBALITEM,
  ADDSTUDENT,
  EDITGLOBALITEM,
  EDITITEM,
  EDITSTUDENT,
} from 'src/assets/data/modal/modals';
import CancelButton from '../common/modal/CancelButton';
import SubmitButton from '../common/modal/SubmitButton';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';
import { SID } from '../../assets/data/fields';

const StyleFieldBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: ' center',
  margin: '30px 0px',

  padding: '0px 20px',
  width: '100%',
  gap: '15px',
});

const StyleFieldForm = styled(Form)({
  '@media (max-width: 600px)': {
    scale: '0.8',
    margin: '0px',
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '30px 0px',

  padding: '0px 20px',
  width: '100%',
  gap: '20px',
});

export default function StudentForm({ beforeData }) {
  const modalType = useSelector((state) => state.modal.modalType);
  console.log('debug2', modalType, beforeData);

  const router = useRouter();

  const StudentSchema = Yup.object().shape({
    [NAME]: Yup.string().required('필수입니다.'),
    [SID]: Yup.number().integer().required('필수입니다.'),
    [MOBILE]: Yup.number().integer().required('필수입니다.'),
    [EMAIL]: Yup.string().required('필수입니다.'),
    [DEPARTMENT]: Yup.string().required('필수입니다.'),
    [MAJOR1]: Yup.string().required('필수입니다.'),
    [MAJOR2]: Yup.string().required('필수입니다.'),
    [YEAR]: Yup.number().integer().required('필수입니다.'),
    [SEMESTERCOUNT]: Yup.number().integer().required('필수입니다.'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // 학생 항목 추가
    // 1) newData 생성
    // 2) axios post
    // 3) alert
    // 4) reload

    const newData = {
      [NAME]: values[NAME],
      [SID]: values[SID],
      [MOBILE]: values[MOBILE],
      [EMAIL]: values[EMAIL],
      [ISAPPROVED]: true,
      [DEPARTMENT]: values[DEPARTMENT],
      [MAJOR1]: values[MAJOR1],
      [MAJOR2]: values[MAJOR2],
      [YEAR]: values[YEAR],
      [SEMESTERCOUNT]: values[SEMESTERCOUNT],
    };
    console.log(newData);

    switch (modalType) {
      case ADDSTUDENT:
        axiosInstance
          .post('/api/mileage/students', newData)
          .then((res) => {
            alert('학생이 추가되었습니다.');
            router.reload();
          })
          .catch((err) => {
            console.log(err);
            alert('학생 추가에 실패했습니다.');
          });
        break;

      case EDITSTUDENT:
        axiosInstance
          .patch(`/api/mileage/students/${beforeData[NUM]}`, newData)
          .then((res) => {
            alert(`학생 ${beforeData[NUM]}번이 수정되었습니다.`);
            router.reload();
          })
          .catch((err) => alert('학생 수정에 실패했습니다.'));
        break;
    }
  };
  return (
    <Formik
      initialValues={{
        [NAME]: modalType === EDITSTUDENT ? beforeData?.[NAME] : '',
        [SID]: modalType === EDITSTUDENT ? beforeData?.[SID] : '',
        [MOBILE]: modalType === EDITSTUDENT ? beforeData?.[MOBILE] : '',
        [EMAIL]: modalType === EDITSTUDENT ? beforeData?.[EMAIL] : '',
        [DEPARTMENT]: modalType === EDITSTUDENT ? beforeData?.[DEPARTMENT] : '',
        [MAJOR1]: modalType === EDITSTUDENT ? beforeData?.[MAJOR1] : '',
        [MAJOR2]: modalType === EDITSTUDENT ? beforeData?.[MAJOR2] : '',
        [YEAR]: modalType === EDITSTUDENT ? beforeData?.[YEAR] : '',
        [SEMESTERCOUNT]: modalType === EDITSTUDENT ? beforeData?.[SEMESTERCOUNT] : '',
      }}
      validationSchema={StudentSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <StyleFieldForm>
          <Box sx={{ display: 'flex', width: '100%', gap: '30px' }}>
            <StyleFieldBox>
              {[NAME, SID, MOBILE, EMAIL, DEPARTMENT, MAJOR1, MAJOR2, YEAR, SEMESTERCOUNT].map(
                (field: string, index: number) => (
                  <Box key={index}>
                    <Field
                      sx={{ width: '300px' }}
                      name={field}
                      as={TextField}
                      type="text"
                      label={engToKor(field)}
                      variant="standard"
                    />
                    <ErrorMessage name={field} />
                  </Box>
                )
              )}
            </StyleFieldBox>
          </Box>

          <ButtonFlexBox>
            <CancelButton modalType={modalType} />
            <SubmitButton />
          </ButtonFlexBox>
        </StyleFieldForm>
      )}
    </Formik>
  );
}
