import { differenceInDays, format, getDay } from 'date-fns';

/* eslint-disable no-useless-escape */
export const isEmail = (email) => {
  const emailRegex =
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  return emailRegex.test(email);
};

export const isEmailBack = (email) => {
  const emailRegex = /^(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  return emailRegex.test(email);
};

export const isCheckPassword = (password) => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  return passwordRegex.test(password);
};

export const emojiSlice = (value) => {
  const checkvalue =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  const validvalue = value.replace(checkvalue, '');

  return validvalue;
};

export const numberSlice = (value) => {
  const validvalue = value.replace(/[^0-9]/g, '');

  return validvalue;
};

export const spaceSlice = (value) => {
  const strSpace = /\s/;

  const validvalue = value.replace(strSpace, '');
  return validvalue;
};

export const viewDay = (value) => {
  switch (value) {
    case 0:
      return '일';
    case 1:
      return '월';
    case 2:
      return '화';
    case 3:
      return '수';
    case 4:
      return '목';
    case 5:
      return '금';
    case 6:
      return '토';
    default:
      return '토';
  }
};

export const renderDate = (createdDate = new Date()) => {
  const date = new Date(String(createdDate).replace(/-/g, '/'));

  return `${format(date, 'M/d')} (${viewDay(getDay(date))})`;
};

export const renderDay = (expiredDate = new Date()) => {
  const date = new Date(String(expiredDate).replace(/-/g, '/'));
  const nowDate = new Date();
  return differenceInDays(date, nowDate) + 1;
};
