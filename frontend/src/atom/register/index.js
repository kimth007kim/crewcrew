import { atom } from 'recoil';

export const sectionProgress1 = atom({
  key: 'sectionProgress1',
  default: [
    {
      index: 0,
      check: 0,
    },
    {
      index: 1,
      check: 0,
    },
    {
      index: 2,
      check: 0,
    },
    {
      index: 3,
      check: 0,
    },
  ],
});

export const sectionProgress2 = atom({
  key: 'sectionProgress2',
  default: [
    {
      index: 0,
      check: 0,
    },
    {
      index: 1,
      check: 0,
    },
  ],
});

export const sectionProgress3 = atom({
  key: 'sectionProgress3',
  default: [
    {
      index: 0,
      check: 0,
    },
    {
      index: 1,
      check: 0,
    },
    {
      index: 2,
      check: 0,
    },
  ],
});

export const nameState = atom({
  key: 'nameRg',
  default: '',
});

export const emailIdState = atom({
  key: 'emailIdRg',
  default: '',
});

export const emailState = atom({
  key: 'emailRg',
  default: '',
});

export const codeState = atom({
  key: 'codeRg',
  default: '',
});

export const passwordState = atom({
  key: 'passwordRg',
  default: '',
});

export const nickNameState = atom({
  key: 'nickNameRg',
  default: '',
});

export const uploadFileImgState = atom({
  key: 'uploadFileImgRg',
  default: null,
});

export const studyListState = atom({
  key: 'studyListRg',
  default: [],
});

export const hobbyListState = atom({
  key: 'hobbyListRg',
  default: [],
});

export const messageState = atom({
  key: 'messageRg',
  default: '',
});
