export const articleArr = [
  {
    htmlId: 'postRecent',
    name: '최신 글',
    color: '#00b7ff',
    value: 'recent',
  },
  {
    htmlId: 'postPopular',
    name: '많이 본 글',
    color: '#00b7ff',
    value: 'popular',
  },
  {
    htmlId: 'postDeadline',
    name: '마감임박 글',
    color: '#00b7ff',
    value: 'expired',
  },
];

export const approachArr = [
  {
    htmlId: 'postOnline',
    name: '온라인',
    color: '#00b7ff',
    value: '1',
    index: 0,
  },
  {
    htmlId: 'postOffline',
    name: '오프라인',
    color: '#00b7ff',
    value: '0',
    index: 1,
  },
];

export const allFilter = [
  {
    htmlId: 'CategoryAll',
    name: '전체',
    color: '#00b7ff',
    value: '0',
  },
];

export const studyFilterArr = [
  {
    htmlId: 'CategoryStudy1',
    name: '어학',
    color: '#001881',
    value: '3',
    index: 0,
  },
  {
    htmlId: 'CategoryStudy2',
    name: '취업',
    color: '#001881',
    value: '4',
    index: 1,
  },
  {
    htmlId: 'CategoryStudy3',
    name: '고시/공무원',
    color: '#001881',
    value: '5',
    index: 2,
  },
  {
    htmlId: 'CategoryStudy4',
    name: '프로젝트',
    color: '#001881',
    value: '6',
    index: 3,
  },
  {
    htmlId: 'CategoryStudy5',
    name: '스터디기타',
    color: '#001881',
    value: '7',
    index: 4,
  },
];

export const hobbyFilterArr = [
  {
    htmlId: 'CategoryHobby0',
    name: '예술',
    color: '#F7971E',
    value: '8',
    index: 5,
  },
  {
    htmlId: 'CategoryHobby1',
    name: '요리',
    color: '#F7971E',
    value: '9',
    index: 6,
  },
  {
    htmlId: 'CategoryHobby2',
    name: '운동',
    color: '#F7971E',
    value: '10',
    index: 7,
  },
  {
    htmlId: 'CategoryHobby3',
    name: '게임',
    color: '#F7971E',
    value: '11',
    index: 8,
  },
  {
    htmlId: 'CategoryHobby4',
    name: '덕질',
    color: '#F7971E',
    value: '12',
    index: 9,
  },
  {
    htmlId: 'CategoryHobby5',
    name: '트렌드',
    color: '#F7971E',
    value: '13',
    index: 10,
  },
  {
    htmlId: 'CategoryHobby6',
    name: '취미기타',
    color: '#F7971E',
    value: '14',
    index: 11,
  },
];

export const cateogoryAll = [...hobbyFilterArr, ...studyFilterArr];
