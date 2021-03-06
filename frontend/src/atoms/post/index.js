import { atom } from 'recoil';
import { approachArr, articleArr, allFilter } from '../../frontDB/filterDB';

export const arrayFilterState = atom({
  key: 'arrayFilter',
  default: [...allFilter],
});

export const articleFilterState = atom({
  key: 'articleFilter',
  default: {
    ...articleArr[0],
  },
});

export const approachFilterState = atom({
  key: 'approachFilter',
  default: [...approachArr],
});

export const changedBookmark = atom({
  key: 'changedBookmark',
  default: false,
});

export const lnbBookmarkDelete = atom({
  key: 'lnbBookmarkDelete',
  default: false,
});
