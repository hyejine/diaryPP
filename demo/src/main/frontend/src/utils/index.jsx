import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // 윤년 판단 플러그인
import 'dayjs/locale/ko'; // 한국어 가져오기

// dayjs.locale('ko');

export const DateFormat = 'YYYY년 MM월 DD일 ddd요일';
export const localDateRenderer = (v) => {
    return dayjs(v).locale('ko').format(DateFormat);
};