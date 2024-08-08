// src/data/columns.ts
export const participantColumns = [
  { label: '参加団体名', key: 'participantName' },
  { label: 'フリガナ', key: 'ruby' },
  { label: 'SNSアカウント', key: 'socialMedia' },
];

const commonProgramColumns = [
  { label: '企画名', key: 'programName' },
  { label: 'キャッチフレーズ', key: 'catchphrase' },
  { label: '企画内容', key: 'details' },
  // { label: 'ジャンル', key: 'genre' },
  { label: '企画イメージ図', key: 'programImage' },
  // { label: '開始時間', key: 'startTime' },
  // { label: '終了時間', key: 'endTime' },
  // { label: '公開日', key: 'releaseDate' },
];

export const boothProgramColumns = [
  ...commonProgramColumns,
  { label: 'ジャンル', key: 'boothGenre' },
  { label: '企画区分', key: 'categoryType' },
  { label: 'ドリンクの販売の有無', key: 'isDrinkAvailable' },
  { label: 'エコトレー利用の有無', key: 'isEcoTrayUsed' },
];

export const outstageProgramColumns = [
  ...commonProgramColumns,
  { label: 'ジャンル', key: 'outstageGenre' },
  { label: '実施場所', key: 'outstageVenue' },
  { label: '企画実施日', key: 'eventDate' },
  { label: '撮影の可否', key: 'photographPermission' },
];

export const roomProgramColumns = [
  ...commonProgramColumns,
  { label: 'ジャンル', key: 'roomGenre' },
  { label: '企画実施校舎', key: 'eventBuilding' },
  { label: '企画実施教室', key: 'eventRoom' },
  { label: '企画実施日', key: 'eventDate' },
  { label: '撮影の可否', key: 'photographPermission' },
  { label: 'チケットの有無', key: 'isEventTicketAvailable' },
  { label: '整理券の有無', key: 'isReservationRequired' },
  { label: '物品販売の有無', key: 'isGoodsAvailable' },
  { label: 'エコトレー利用の有無', key: 'isEcoTrayUsed' },
];
