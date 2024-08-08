export const selectOptions: { [key: string]: string[] } = {
  boothGenre: ['模擬店ジャンル1', '模擬店ジャンル2', '模擬店ジャンル3'],
  categoryType: ['タイプ1', 'タイプ2', 'タイプ3'],
  outstageGenre: ['音楽', 'ダンス', 'パフォーマンス'],
  outstageVenue: [
    'メインステージ',
    'パフォーマンスエリア',
    'エントランスエリア',
  ],
  roomGenre: ['教室ジャンル1', '教室ジャンル2', '教室ジャンル3'],
  eventBuilding: ['第一校舎', 'メディア棟', '和泉ラーニングスクエア'],
  eventDate: ['2日', '3日', '4日'],
};

export const tripleOptions: { [key: string]: { value: string; label: string }[] } = {
  photographPermission: [
    { value: '撮影可', label: '撮影可' },
    { value: '撮影不可', label: '撮影不可' },
    { value: '不明', label: '不明' },
  ],
  isDrinkAvailable: [
    { value: '販売有り', label: '販売有り' },
    { value: '販売無し', label: '販売無し' },
    { value: '不明', label: '不明' },
  ],
  isEcoTrayUsed: [
    { value: '利用有り', label: '利用有り' },
    { value: '利用無し', label: '利用無し' },
    { value: '不明', label: '不明' },
  ],
  isEventTicketAvailable: [
    { value: 'チケット有り', label: 'チケット有り' },
    { value: 'チケット無し', label: 'チケット無し' },
    { value: '不明', label: '不明' },
  ],
  isReservationRequired: [
    { value: '整理券有り', label: '整理券有り' },
    { value: '整理券無し', label: '整理券無し' },
    { value: '不明', label: '不明' },
  ],
  isGoodsAvailable: [
    { value: '販売有り', label: '販売有り' },
    { value: '販売無し', label: '販売無し' },
    { value: '不明', label: '不明' },
  ],
};