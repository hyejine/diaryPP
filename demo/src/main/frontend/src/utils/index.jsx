import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // 윤년 판단 플러그인
import 'dayjs/locale/ko'; // 한국어 가져오기

// dayjs.locale('ko');

export const DateFormat = 'YYYY년 MM월 DD일 ddd요일';
export const DiaryDateFormat = 'YYYY-MM-DDT00:00:00+09:00';
export const DiaryDowunloadFormat = 'YY.MM.DD';
export const ChartDateFormat = 'YYYY-MM-DD';

export const localDateRenderer = (v) => {
    return dayjs(v).locale('ko').format(DateFormat);
};

export const diaryDateRenderer = (v) => {
    return dayjs(v).locale('ko').format(DiaryDateFormat);
};

export const diaryDowunloadRenderer = (v) => {
    return dayjs(v).locale('ko').format(DiaryDowunloadFormat);
};

export const chartDateRender = (v) => {
    return dayjs(v).locale('ko').format(ChartDateFormat);
};