/* =========================
   第5回 案内先（Q10の回答だけで決まる）
   Q10①〜④ ＝ type A〜D ＝ 案内先①〜④

   ・キー（igBasic など）は products.js / resultMap.js を成立させるための内部キー。
     計測の product_key として既存どおり送信されるが、第5回の案内先の正式な
     分析識別は type A〜D（＝Q10①〜④）と cta_url とする。
     既存GASの保存状態が未確認のため、キー名は変更しない。
   ・url はホルダー提供のURLをそのまま使用（独自のパラメータは付けない）。
   ・name は内部の区別用。結果ページには表示しない。
========================= */

export const PRODUCTS = {
  // 案内先①（Q10①・type A）
  igBasic: {
    name: '案内先①',
    description: null,
    url: 'https://sendenhi-zero.com/hpmanyual',
    isConsultation: false,
    cta: '予約を増やす基本を見る',
  },

  // 案内先②（Q10②・type B）
  hpbMaster: {
    name: '案内先②',
    description: null,
    url: 'https://utage-system.com/p/cJTrRSHtJVu8',
    isConsultation: false,
    cta: '無料で集客のコツを受け取る',
  },

  // 案内先③（Q10③・type C）
  hpbConsultation: {
    name: '案内先③',
    description: null,
    url: 'https://utage-system.com/p/KhAsa8VUlFs2',
    isConsultation: false,
    cta: '予約が増えるクーポン例を見る',
  },

  // 案内先④（Q10④・type D）
  aiHpbReservation: {
    name: '案内先④',
    description: null,
    url: 'https://utage-system.com/p/Bu7lqAdurRl4',
    isConsultation: true,
    cta: '理想のサロンへの進め方を確認',
  },
}
