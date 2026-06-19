// ─────────────────────────────────────────
//  data.js  –  all site content lives here
//  To add content: just add an object to the relevant array below.
// ─────────────────────────────────────────

// ── WORK ──────────────────────────────────
// Each project shows as a card on the Work page.
// `images` is the full gallery shown on the detail page.
export const projects = [
  {
    id: "ar",
    title: "If City Can Talk",
    category: "UX Design | AR Design",
    cover: "/images/work/ar/cover.jpg",          // replace with image path e.g. "/images/work/ar-mirror-cover.jpg"
    images: [
      "/images/work/ar/detail-1.jpg", 
      "/images/work/ar/detail-2.jpg", 
      "/images/work/ar/detail-3.jpg",
      //{ src: "/images/work/ar/goal-建筑.jpg"},
      //{ src: "/images/work/ar/goal-文字.jpg" },
      { src: "/images/work/ar/goal-涂鸦.jpg",  width: "two-thirds" },
      //{ src: "/images/work/ar/goal-烟花.jpg"},
    ],         // replace with array of image paths for the gallery
    year: "2023",
    description: "An augmented reality app that promote information sharing and social interaction in university campuses",
  },
  {
    id: "iot",
    title: "Ephemeron",
    category: "UX Design | IoT Device | AI-assisted Design",
    cover: "/images/work/iot/cover.jpg",
    images: [
      "public/images/work/iot/detail-1.jpg", 
      "public/images/work/iot/detail-2.jpg", 
      "public/images/work/iot/detail-3.jpg", 
      "public/images/work/iot/detail-4.jpg",
      { src: "/images/work/iot/result-1.png", width: "full", blend: true, border: false, caption: "Sketch" },

      { scroll: [
        { src: "/images/work/iot/result-2.png" },
        { src: "/images/work/iot/result-13.png" },
        { src: "/images/work/iot/result-3.png" },
        { src: "/images/work/iot/result-4.png" },
        { src: "/images/work/iot/result-5.png" },
        { src: "/images/work/iot/result-6.png" },
        { src: "/images/work/iot/result-7.png" },
        { src: "/images/work/iot/result-8.png" },
        { src: "/images/work/iot/result-9.png" },
        { src: "/images/work/iot/result-10.png" },
        { src: "/images/work/iot/result-11.png" },
        { src: "/images/work/iot/result-12.png" },
        

      ]},
      { src: "/images/work/iot/result-14.png", width: "full", blend: true, border: false },
    ],
    year: "2023",
    description: "A remote companion device for cosplayers (cosers) and clients in cosplay commissions, designed to improve the commissioning experience and reduce withdrawal symptoms",
  },
  {
    id: "robotic",
    title: "EmoWeave",
    category: "Robotic Arm Manufacturing | Human-Robot Interaction Design",
    cover: "/images/work/robotic/cover.jpg",
    images: [
      "public/images/work/robotic/detail-1.jpg", 
      "public/images/work/robotic/detail-2.jpg", 
      "public/images/work/robotic/detail-3.jpg",
      "public/images/work/robotic/detail-4.jpg",
      { group: [
         { row: [
           { src: "/images/work/robotic/1.jpg" },
           { src: "/images/work/robotic/2.jpg" },
           { src: "/images/work/robotic/3.jpg" },
         ]},
         { row: [
           { src: "/images/work/robotic/4.jpg" },
           { src: "/images/work/robotic/5.jpg" },
           { src: "/images/work/robotic/6.jpg" },
        ]}
      ]},
      { src: "images/work/robotic/result-1.jpg", width: "half", blend: true, border: false },
      
      { row: [
           { src: "images/work/robotic/result-3.jpg" },
           { src: "images/work/robotic/result-4.jpg" },
         ]},
      { src: "images/work/robotic/result-2.jpg", width: "full", blend: true, border: false },
    ],
    year: "2024",
    description: "Build a robotic arm to visualize teenagers' emotions in an artistic form, aiming to enhance self-awareness and self-observation",
  },
  {
    id: "architecture",
    title: "Elder Choice",
    category: "Computational Design | Human-Computer Interaction Design",
    cover: "/images/work/architecture/cover.jpg",
    images: [
      "public/images/work/architecture/detail-1.jpg",
      "public/images/work/architecture/detail-2.jpg",
      "public/images/work/architecture/detail-3.jpg",
      { src: "/images/work/architecture/result-1.jpg",  width: "two-thirds" },
      { src: "/images/work/architecture/result-2.jpg",  width: "two-thirds" },
    ],
    year: "2024",
    description: "Create an age-friendly community using Multi-Agent and Cellular Automaton algorithms to address challenges faced by 'Elderly Migrants,' and simulate their housing selection with City Scope devices to enable participatory design",
  },
  {
    id: "frog",
    title: "You're Frog",
    category: "Game Art Design | KTH Course work",
    cover: "/images/work/frog/cover.jpg",          // replace with image path e.g. "/images/work/ar-mirror-cover.jpg"
    images: [
      "/images/work/frog/detail-1.jpg", 
      "/images/work/frog/detail-2.jpg", 
      
      { scroll: [
        { src: "/images/work/frog/result-1.jpg" },
        { src: "/images/work/frog/result-2.jpg" },
      ]},

      { src: "/images/work/frog/result-3.png", width: "full", blend: true, border: false},
      { src: "/images/work/frog/result-4.png", width: "full", blend: true, border: false},
     
    ],         
    year: "2025",
    description: "A potion-themed cozy-game. I was responsible for part of the visual design.",
    links: [
    { label: "Game website", url: "https://you-are-a-frog.netlify.app/" },
    { label: "Watch trailer", url: "https://youtu.be/W94CV-V6GIw" },
    //{ label: "Download · Mac", url: "https://we.tl/t-jC9Znq9VOGvwDtOM" },
    //{ label: "Download · Windows", url: "https://we.tl/t-ti26uBB9mHtZVzh3" },
  ],
  },
];




// ── ART ───────────────────────────────────
// Each artwork shows as a card on the Art page.
// `category` must be either "kpop" or "doll"
export const artworks = [
  {
    id: "art-260520",
    title: "Fanart",
    category: "kpop",   // "kpop" | "doll"
    image: "/images/art/kpop/art-260520.jpg",          // replace with image path
    year: "2026.5.23",
    description: "Hanjin",
  },
  {
    id: "art-2",
    title: "Fanart",
    category: "kpop",
    image: "/images/art/kpop/art-2.jpg",
    year: "2026.5.23",
    description: "",
  },
  {
    id: "art-260521",
    title: "Fanart",
    category: "kpop",
    image: "/images/art/kpop/art-260521.jpg",
    year: "2026.5.21",
    description: "Youngjae",
  },
  {
    id: "art-260523",
    title: "Fanart",
    category: "kpop",
    image: "/images/art/kpop/art-260523.jpg",
    year: "2026.5.23",
    description: "Yeonjun Kai",
  },
  {
    id: "art-1",
    title: "Fanart",
    category: "kpop",
    image: "/images/art/kpop/art-1.jpg",
    year: "2026.5.23",
    description: "",
  },
  
  {
    id: "art-3",
    title: "Fanart",
    category: "kpop",
    image: "/images/art/kpop/art-3.jpg",
    year: "2026.5.23",
    description: "",
  },
  {
    id: "art-4",
    title: "Fanart",
    category: "kpop",
    image: "/images/art/kpop/art-4.jpg",
    year: "2026.5.23",
    description: "",
  },
  {
    id: "art-5",
    title: "Fanart",
    category: "kpop",
    image: "/images/art/kpop/art-5.jpg",
    year: "2026.5.23",
    description: "",
  },
  {
    id: "art-6",
    title: "Fanart",
    category: "kpop",
    image: "/images/art/kpop/art-6.jpg",
    year: "2026.5.23",
    description: "",
  },
  {
    id: "IMG_3366",
    title: "",
    category: "doll",
    image: "public/images/art/doll/IMG_3366.JPG",
    year: "",
    description: "",
  },
  {
    id: "IMG_3560",
    title: "",
    category: "doll",
    image: "public/images/art/doll/IMG_3560.JPG",
    year: "",
    description: "",
  },
  {
    id: "IMG_3723",
    title: "",
    category: "doll",
    image: "public/images/art/doll/IMG_3723.JPG",
    year: "",
    description: "",
  },
];




// ── NOW ───────────────────────────────────
// Add a new object for each entry. `year` drives the sidebar.
// `items` can have any tag you like: Drawing / Watching / Reading / Listening / etc.
export const nowEntries = [
  {
    id: "now-2026-06",
    year: 2026,
    month: "June 2026",
    items: [
      { tag: "Drawing",   text: "迁徙中的鸟，还没画完" },
      { tag: "Watching",  text: "The Bear 第三季" },
      { tag: "Reading",   text: "《生活》杂志" },
    ],
  },
  {
    id: "now-2026-04",
    year: 2026,
    month: "April 2026",
    items: [
      { tag: "Drawing",   text: "雨天的街道" },
      { tag: "Listening", text: "Mitski 循环了两周" },
    ],
  },
  {
    id: "now-2025-12",
    year: 2025,
    month: "December 2025",
    items: [
      { tag: "Watching",  text: "重刷 Fleabag" },
      { tag: "Reading",   text: "苏枕书《在京都》" },
    ],
  },
];

// ── ABOUT ─────────────────────────────────
export const about = {
  name: "Yuewei",
  pronouns: "she/her",
  bio: "A short paragraph about you — your practice, what you care about, where you're based.",
  photo: "",   // replace with your photo path
  email: "yueweih@hotmail.com",
  instagram: "https://www.instagram.com/chaimiaaaaaa?igsh=bGp0N3Q3MGdxOW9r&utm_source=qr",
  rednoteID: "shaolaifanwo1",

  education: [
    { period: "2025 – Present", school: "KTH Royal Institute of Thchnology", major: "MSc in Interactive Media Technology"},
    { period: "2020 – 2025",    school: "South China University of Technology", major: "BA in Architecture"},
  ],

  awards: [
    { year: "2024", title: "Student Scholarship Competition & Ted Lewin Award, Society of Illustrators, New York" },
    { year: "2023", title: "Illustrator 65 Award (Uncommissioned), Society of Illustrators, New York" },
  ],
};
