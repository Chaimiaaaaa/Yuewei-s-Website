// ─────────────────────────────────────────
//  now/2026.js
//
//  每个 entry 是一个月份块，items 是这个月的条目
//
//  条目有两种：
//
//  1. 普通条目（只有一行文字，不可点击）：
//     { tag: "Reading", text: "苏枕书《在京都》" }
//
//  2. 可点击条目（有详情页，需要有 id 和 content）：
//     { tag: "Concert", text: "TXT · Singapore", id: "txt-singapore",
//       content: [
//         { type: "text",   value: "这里写感悟文字，可以很长" },
//         { type: "img",    src: "/images/now/xxx.jpg", width: "full" },
//         { type: "img",    src: "/images/now/xxx.jpg", width: "two-thirds" },
//         { type: "img",    src: "/images/now/xxx.jpg", width: "half" },
//         { type: "img",    src: "/images/now/xxx.jpg", width: "full", blend: true },  // 正片叠底
//         { type: "text",   value: "图片之间也可以穿插文字" },
//         { type: "row",    images: [
//           { src: "/images/now/xxx.jpg" },
//           { src: "/images/now/xxx.jpg" },
//         ]},
//         { type: "scroll", images: [
//           { src: "/images/now/xxx.jpg" },
//           { src: "/images/now/xxx.jpg" },
//           { src: "/images/now/xxx.jpg" },
//         ]},
//       ]
//     }
//
//  tag 可以是任何文字，常用的有：
//  Concert / Travel / Life / Reading / Watching / Listening / Drawing / Event
//
// ─────────────────────────────────────────
export const now2023 = [
  {
    id: "now-2023-04",
    year: 2023,
    month: "April 2023",
    items: [
      {
        tag: "Concert",
        text: "TXT · Singapore",
        //id: "txt-singapore-2023",
        /*content: [
          { type: "text", value: "2023.3.31 - 2023.4.3" },
          { type: "text", value: "2023.4.1" },
          { type: "text", value: "TXT在新加坡的演唱会" },
         //{ type: "img",    src: "public/images/now/2023/1.jpeg", width: "two-thirds" },

        ],*/
        images: [],
      },
    ],
  },
];