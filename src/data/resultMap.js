// Q10の回答（determineType で A〜D に変換済み）→ 案内先①〜④
// 診断結果（01〜06）・Q7 は案内先の決定に使わない（24セルすべて同じルール）
export const RESULT_PRODUCT_MAP = {
  A: ['igBasic'], // Q10① まずは基本から学んで、自分で改善していきたい → 案内先①
  B: ['hpbMaster'], // Q10② まずは無料で役立つ情報を受け取りながら… → 案内先②
  C: ['hpbConsultation'], // Q10③ テンプレを活用してホットペッパーを… → 案内先③
  D: ['aiHpbReservation'], // Q10④ 自分では原因が分からないので… → 案内先④
}
