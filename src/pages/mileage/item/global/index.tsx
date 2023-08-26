import { StarIcon } from 'src/theme/overrides/CustomIcons';
import EnhancedTable from 'src/components/common/CustomTable';
import {
  MILEAGE,
  ISVISIBLE,
  REGISTERED_DATE,
  MANAGE,
  CHECK_BOX,
  NUM,
  CATEGORY,
  SEMESTER,
  ITEM,
  DESCRIPTION,
  DESCRIPTION1,
  DESCRIPTION2,
  FILE_DESCRIPTION,
  ISVISIBLE_STUDENT,
  ISINPUT_STUDENT,
  ISDUPLICATE_RECORD,
  ISEVALUATE_CSEE,
  ISEVALUATE_PORTFOLIO,
  ISEVALUATE_FUSION,
  MAX_MAILEAGE,
} from 'src/assets/data/fields';
import SWModal from 'src/components/common/modal/SWModal';
import { EDITGLOBALITEM, EDITITEM } from 'src/assets/data/modal/modals';
import { dispatch } from 'src/redux/store';
import { setMileageGlobalList } from 'src/redux/slices/data';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

/**
 * @component [마일리지 항목] 게시판
 */

/**
 * @kind [마일리지 항목]
 * @breif enum
 */

export enum MileageGlobalItemBoard {
  'NUM' = NUM,
  'CATEGORY' = CATEGORY,
  'SEMESTER' = SEMESTER,
  'ITEM' = ITEM,
  'MILEAGE' = MILEAGE,
  'ISVISIBLE' = ISVISIBLE,
  'REGISTERED_DATE' = REGISTERED_DATE,
  'MANAGE' = MANAGE,
}

/**
 * @kind [마일리지 항목]
 * @breif 데이터 인터페이스
 */
interface Data {
  [MileageGlobalItemBoard.CATEGORY]: string;
  [MileageGlobalItemBoard.SEMESTER]: string;
  [MileageGlobalItemBoard.ITEM]: string;
  [MileageGlobalItemBoard.MILEAGE]: number;
  [MileageGlobalItemBoard.ISVISIBLE]: boolean;
  [MileageGlobalItemBoard.REGISTERED_DATE]: string;
  [MileageGlobalItemBoard.MANAGE]: string;
}

/**
 * @kind [마일리지 항목]
 * @brief 데이터 생성 함수
 *
 *  */
function createData(
  num: number,
  category: string,
  semester: string,
  item: string,
  mileage: number,
  isVisible: boolean,
  registeredDate: string,
  manage: string
): Data {
  return {
    [MileageGlobalItemBoard.NUM]: num,
    [MileageGlobalItemBoard.CATEGORY]: category,
    [MileageGlobalItemBoard.SEMESTER]: semester,
    [MileageGlobalItemBoard.ITEM]: item,
    [MileageGlobalItemBoard.MILEAGE]: mileage,
    [MileageGlobalItemBoard.ISVISIBLE]: isVisible,
    [MileageGlobalItemBoard.REGISTERED_DATE]: registeredDate,
    [MileageGlobalItemBoard.MANAGE]: manage,
  };
}

/**
 * @kind [마일리지 항목]
 * @brief 테이블 헤더
 */
const headCells = [
  {
    id: [MileageGlobalItemBoard.NUM],
    numeric: false,
    disablePadding: true,
    label: '번호',
  },
  {
    id: [MileageGlobalItemBoard.CATEGORY],
    numeric: true,
    disablePadding: false,
    label: '카테고리명',
  },
  {
    id: [MileageGlobalItemBoard.SEMESTER],
    numeric: true,
    disablePadding: false,
    label: '학기',
  },
  {
    id: [MileageGlobalItemBoard.ITEM],
    numeric: true,
    disablePadding: false,
    label: '항목명',
  },
  {
    id: [MileageGlobalItemBoard.MILEAGE],
    numeric: true,
    disablePadding: false,
    label: '마일리지',
  },
  {
    id: [MileageGlobalItemBoard.ISVISIBLE],
    numeric: true,
    disablePadding: false,
    label: '보이기',
  },
  {
    id: [MileageGlobalItemBoard.REGISTERED_DATE],
    numeric: true,
    disablePadding: false,
    label: '등록일',
  },
  {
    id: [MileageGlobalItemBoard.MANAGE],
    numeric: true,
    disablePadding: false,
    label: '관리',
  },
];

const IParams = {
  [CATEGORY]: '카테고리테스트',
  [SEMESTER]: '2022-01',
  [ITEM]: '웹 서비스 캠프',
  [MILEAGE]: 30,
  [MAX_MAILEAGE]: 50,
  [DESCRIPTION1]: '설명 1',
  [DESCRIPTION2]: '설명 2',
  [FILE_DESCRIPTION]: '첨부파일 설명',
  [ISVISIBLE]: true,
  [ISVISIBLE_STUDENT]: false,
  [ISINPUT_STUDENT]: false,
  [ISDUPLICATE_RECORD]: false,
  [ISEVALUATE_CSEE]: false,
  [ISEVALUATE_PORTFOLIO]: false,
  [ISEVALUATE_FUSION]: false,
};

/**

   * @kind [마일리지 항목]

   * @description 마일리지 항목 리스트
   */


const rows = [
  createData(
    1,
    '전공 마일리지',
    '2022-01',
    '웹 서비스 캠프',
    30,
    true,
    '2023-08-21',

    <SWModal type={EDITGLOBALITEM} beforeData={IParams} />
  ),
  createData(
    2,
    '비교과 - 연구활동',
    '2022-01',
    '웹 서비스 캠프',
    30,
    true,
    '2023-08-21',

    <SWModal type={EDITGLOBALITEM} beforeData={IParams} />
  ),
  createData(
    3,
    '비교과 - 전공활동',
    '2022-01',
    '웹 서비스 캠프',
    30,
    false,
    '2023-08-21',

    <SWModal type={EDITGLOBALITEM} beforeData={IParams} />
  ),
  createData(
    4,
    '비교과 - 특강참여',
    '2022-01',
    '웹 서비스 캠프',
    30,
    false,
    '2023-08-21',

    <SWModal type={EDITGLOBALITEM} beforeData={IParams} />
  ),
  createData(
    5,
    '비교과 - 학회활동',
    '2022-02',
    '웹 서비스 캠프',
    30,
    true,
    '2023-08-21',
    <SWModal type={EDITGLOBALITEM} beforeData={IParams} />
  ),
  createData(
    6,
    '비교과 - 행사참여',
    '2022-02',
    '웹 서비스 캠프',
    30,
    true,
    '2023-08-21',
    <SWModal type={EDITGLOBALITEM} beforeData={IParams} />
  ),
];

import axiosInstance from 'src/utils/axios';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import MileageCategory from 'src/components/board/MileageCategory';

interface ICategory {
  id: number;
  name: string;
  maxPoints: number;
}

interface IGlobalItem {
  id: number;
  category: ICategory;
  itemName: string;
  isPortfolio: boolean;
  description1: string;
  description2: string;
  stuType: 'C' | 'F' | 'CF';
}

interface IGlobalItemList {
  items: IGlobalItem[];
}

export const getServerSideProps: GetServerSideProps<{
  fetchData: IGlobalItemList;
}> = async () => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_API_KEY}/api/mileage/categories`);
  const res = await axiosInstance.get('/api/mileage/items');
  const fetchData = res.data;
  console.log(fetchData);
  return { props: { fetchData } };
};

export default function MileageCategory({
  fetchData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  /**
   * 리액트 메모를 쓰거나 하면 성능 최적화가 될것 같은..
   */
  const data = useSelector((state) => state.data.mileageGlobalList);
  const dispatch = useDispatch();

  console.log(fetchData);

  const convertedFetchList = fetchData.items?.map((item) => {
    const beforeData = {
      [NUM]: item.id,
      [CATEGORY]: item.category.name,
      [SEMESTER]: '2022-01', // 없어야 되는 값
      [ITEM]: item.itemName,
      [MILEAGE]: 30, //없어야 되는 값
      [MAX_MAILEAGE]: 50, // 없어야 되는 값
      [DESCRIPTION1]: item.description1,
      [DESCRIPTION2]: item.description2,
      [FILE_DESCRIPTION]: '첨부파일 설명', // 업서야 되는 듯
      [ISVISIBLE]: true,
      [ISVISIBLE_STUDENT]: false,
      [ISINPUT_STUDENT]: false,
      [ISDUPLICATE_RECORD]: false,
      [ISEVALUATE_CSEE]: item.stuType === 'F' ? false : true,
      [ISEVALUATE_PORTFOLIO]: item.isPortfolio,
      [ISEVALUATE_FUSION]: item.stuType === 'C' ? false : true,
    };
    return createData(
      item.id,
      item.category.name,
      '2022-01',
      item.itemName,
      30,
      true,
      '2023-08-21',
      <SWModal type={EDITGLOBALITEM} beforeData={beforeData} />
    );
  });

  return (
    <EnhancedTable
      originalRows={convertedFetchList}
      headCells={headCells}
      type="마일리지 글로벌 항목"
    />
  );
}
