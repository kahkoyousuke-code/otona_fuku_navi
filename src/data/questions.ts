export type BodyType = "gasshiri" | "hyojun" | "onaka" | "kyasha";
export type StyleType = "kireime" | "casual";
export type SceneType = "work" | "off" | "both";
export type NayamiType = "fit" | "young" | "tedious";
export type YosanType = "low" | "mid" | "high";
export type ResultKey = `${BodyType}-${StyleType}`;

export interface Option {
  k: string;
  label: string;
  value: string;
}

export interface Question {
  id: string;
  title: string;
  options: Option[];
}

export const QUESTIONS: Question[] = [
  {
    id: "taikei",
    title: "体つきは、どれに近いですか？",
    options: [
      { k: "A", label: "肩幅があって、がっしりしている", value: "gasshiri" },
      { k: "B", label: "標準的だと思う", value: "hyojun" },
      { k: "C", label: "お腹まわりが気になってきた", value: "onaka" },
      { k: "D", label: "細身で、華奢な印象がある", value: "kyasha" },
    ],
  },
  {
    id: "funiki",
    title: "どんな雰囲気になりたいですか？",
    options: [
      { k: "A", label: "きちんと・きれいめに見せたい", value: "kireime" },
      { k: "B", label: "リラックスした、こなれた感じ", value: "casual" },
    ],
  },
  {
    id: "basho",
    title: "服を着る場面は、どちらが多いですか？",
    options: [
      { k: "A", label: "仕事・きちんとした場が多い", value: "work" },
      { k: "B", label: "休日・プライベートが多い", value: "off" },
      { k: "C", label: "半々くらい", value: "both" },
    ],
  },
  {
    id: "nayami",
    title: "服選びで、一番こまることは？",
    options: [
      { k: "A", label: "似合うものが、よく分からない", value: "fit" },
      { k: "B", label: "若作りに見えないか心配", value: "young" },
      { k: "C", label: "選ぶのが、とにかく面倒", value: "tedious" },
    ],
  },
  {
    id: "yosan",
    title: "1着にかけられる予算は？",
    options: [
      { k: "A", label: "〜1万円くらい", value: "low" },
      { k: "B", label: "1〜3万円くらい", value: "mid" },
      { k: "C", label: "3万円以上でもよい", value: "high" },
    ],
  },
];

export const PRICE: Record<YosanType, string> = {
  low: "〜10,000円",
  mid: "15,000〜30,000円",
  high: "30,000円〜",
};

export const NAYAMI_LINE: Record<NayamiType, string> = {
  fit: "似合うものが分からないなら、まずはこの3着から。大きく外しません。",
  young: "落ち着いた色とサイズ感でまとめれば、若作りに見えず大人っぽく決まります。",
  tedious: "あれこれ迷わなくて大丈夫。ひとまずこれだけ揃えれば形になります。",
};

export const SCENE_LABEL: Record<SceneType, string> = {
  work: "仕事の日に",
  off: "休日に",
  both: "オン・オフ兼用で",
};

export type Answers = {
  taikei?: BodyType;
  funiki?: StyleType;
  basho?: SceneType;
  nayami?: NayamiType;
  yosan?: YosanType;
};
