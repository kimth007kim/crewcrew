import { atom } from 'recoil';

export const infoMessageState = atom({
  key: 'messageMyinfo',
  default: '',
});

export const infoNicknameState = atom({
  key: 'nicknameMyinfo',
  default: '',
});

export const infoCategoryState = atom({
  key: 'categoryMyinfo',
  default: [],
});

export const infoSaveState = atom({
  key: 'saveMyinfo',
  default: false,
});

export const infoCancelState = atom({
  key: 'cancelMyinfo',
  default: false,
});
