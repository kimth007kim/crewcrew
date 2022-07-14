import { atom } from 'recoil';

export const timelineFilter = atom({
  key: 'timelineFilter',
  default: '0',
});

export const BtnOpened = atom({
  key: 'BtnOpened',
  default: false,
});

export const DataLists = atom({
  key: 'DataLists',
  default: [],
});

export const TimelineChanged = atom({
  key: 'TimelineChanged',
  default: false,
});
