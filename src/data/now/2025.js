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


export const now2025 = [
  
  {
    id: "now-2025-08",
    year: 2025,
    month: "August 2025",
    items: [
      {
        tag: "Life",
        text: "Arrived in Sweden · KTH",
        //id: "sweden-2025",
        /*content: [
          { type: "text", value: "" },
        ],
        images: [],*/
      },
    ],
  },
  {
    id: "now-2025-07",
    year: 2025,
    month: "June 2025",
    items: [
      {
        tag: "Travel",
        text: "Japan",
        id: "japan-2025",
        content: [
          { type: "text", value: "2025.6.24 - 2025.7.2" },
          { type: "text", value: "2025.6.24 Kyoto 京都" },
          { type: "scroll", images: [
            { src: "public/images/now/2025/japan/IMG_3606.jpeg" },
            { src: "public/images/now/2025/japan/IMG_3628.jpeg" },
            { src: "public/images/now/2025/japan/IMG_3631.jpeg" },
            { src: "public/images/now/2025/japan/IMG_3632.jpeg" },
            { src: "public/images/now/2025/japan/IMG_3641.jpeg" },
            { src: "public/images/now/2025/japan/IMG_3729.jpeg" },
          ]},
          
        ],
        images: [],
      },
    ],
  },
  {
    id: "now-2025-06",
    year: 2025,
    month: "June 2025",
    items: [
      {
        tag: "Life",
        text: "Graduation ceremony",
        id: "graduation-2025",
        content: [
          { type: "text", value: "2025.6.6" },
          { type: "text", value: "今天我本科毕业了，回想起这五年为了画图熬过的夜，都已成为过眼云烟了！" },
        ],
        images: [],
      },
      {
        tag: "Concert",
        text: "TXT · Macau",
        //id: "txt-macau-2025",
        /*content: [
          { type: "text", value: "" },
        ],
        images: [],*/
      },
    ],
  },
];