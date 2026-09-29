// Q10の回答（determineType で A〜D に変換済み）→ 案内先
// 診断結果（パターン）は案内先の決定に使わない
export const RESULT_PRODUCT_MAP = {
  A: ['igBasic'], // Q10=0 自分でできる集客方法
  B: ['hpbMaster'], // Q10=1 ホットペッパーで集客力を上げる方法
  C: ['hpbConsultation'], // Q10=2 サロン診断や的確なアドバイス
  D: ['aiHpbReservation'], // Q10=3 AIで作業時間を減らすこと
}
