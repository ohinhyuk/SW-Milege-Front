import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ButtonFlexBox, engToKor } from '../common/modal/SWModal';

import * as Yup from 'yup';
import Button from '@mui/material/Button';

import { TextField, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { dispatch } from 'src/redux/store';
import { closeModal } from 'src/redux/slices/modal';
import CancelButton from '../common/modal/CancelButton';
import SubmitButton from '../common/modal/SubmitButton';
import axiosInstance from 'src/utils/axios';
import { useRouter } from 'next/router';
import {
  COUNTS,
  DESCRIPTION1,
  DESCRIPTION2,
  EXTRAPOINTS,
  POINTS,
  SEMESTERITEMID,
} from '../../assets/data/fields';
import { STUDENT_ID } from 'src/assets/data/fields';
import { ADDMILEAGEREGISTER, EDITMILEAGEREGISTER } from 'src/assets/data/modal/modals';

export default function MileageRegisterForm({ beforeData }) {
  const modalType = useSelector((state) => state.modal.modalType);
  const router = useRouter();
  console.log('beforeData', beforeData);

  const MileageRegisterSchema = Yup.object().shape({
    [SEMESTERITEMID]: Yup.string().required('필수입니다.'),
    [STUDENT_ID]: Yup.number().integer().required('필수입니다.'),
    [COUNTS]: Yup.number().integer().required('필수입니다.'),
    [POINTS]: Yup.number().integer().required('필수입니다.'),
    [EXTRAPOINTS]: Yup.number().integer().required('필수입니다.'),
    [DESCRIPTION1]: Yup.string().required('필수입니다.'),
    [DESCRIPTION2]: Yup.string().required('필수입니다.'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // 카테고리 추가
    // 1) newData 생성
    // 2) axios post
    // 3) alert
    // 4) reload

    const newData = {
      [SEMESTERITEMID]: values[SEMESTERITEMID],
      [STUDENT_ID]: values[STUDENT_ID],
      [COUNTS]: values[COUNTS],
      [POINTS]: values[POINTS],
      [EXTRAPOINTS]: values[EXTRAPOINTS],
      [DESCRIPTION1]: values[DESCRIPTION1],
      [DESCRIPTION2]: values[DESCRIPTION2],
    };

    console.log(newData);
    switch (modalType) {
      case ADDMILEAGEREGISTER:
        axiosInstance
          .post(`/api/mileage/records`, newData)
          .then((res) => {
            alert('마일리지 등록 리스트에 추가되었습니다.');
            router.reload();
          })
          .catch((err) => alert('마일리지 등록 리스트 추가에 실패했습니다.'));
        break;

      case EDITMILEAGEREGISTER:
        axiosInstance
          .patch(`/api/mileage/records/${beforeData.semesterItemId}`, newData)
          .then((res) => {
            alert('마일리지 등록 리스트가 수정되었습니다.');
            router.reload();
          })
          .catch((err) => alert('마일리지 등록 리스트 수정이 실패했습니다.'));
        break;
    }
  };

  return (
    <Formik
      initialValues={{
        /**
         * semesterItemId (쿼리 스트링)
         * semesterItemId
         * studentId
         * counts
         * points
         * extraPoints
         * description1
         * description2
         */

        [SEMESTERITEMID]: modalType === EDITMILEAGEREGISTER ? beforeData?.[SEMESTERITEMID] : '',
        [STUDENT_ID]: modalType === EDITMILEAGEREGISTER ? beforeData?.[STUDENT_ID] : '',
        [COUNTS]: modalType === EDITMILEAGEREGISTER ? beforeData?.[COUNTS] : 0,
        [POINTS]: modalType === EDITMILEAGEREGISTER ? beforeData?.[POINTS] : 0,
        [EXTRAPOINTS]: modalType === EDITMILEAGEREGISTER ? beforeData?.[EXTRAPOINTS] : 0,
        [DESCRIPTION1]: modalType === EDITMILEAGEREGISTER ? beforeData?.[DESCRIPTION1] : '',
        [DESCRIPTION2]: modalType === EDITMILEAGEREGISTER ? beforeData?.[DESCRIPTION2] : '',
      }}
      validationSchema={MileageRegisterSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: ' center',
            margin: '30px 0px',
            padding: '0px 20px',
            width: '100%',
            gap: '30px',
          }}
        >
          {[
            SEMESTERITEMID,
            STUDENT_ID,
            COUNTS,
            POINTS,
            EXTRAPOINTS,
            DESCRIPTION1,
            DESCRIPTION2,
          ].map((field) => (
            <>
              <Field
                style={{ minWidth: '300px' }}
                name={field}
                as={TextField}
                type="text"
                label={engToKor(field)}
                variant="standard"
              />
              <ErrorMessage name={field} />
            </>
          ))}
          <ButtonFlexBox>
            <CancelButton modalType={modalType} />
            <SubmitButton />
          </ButtonFlexBox>
        </Form>
      )}
    </Formik>
  );
}
