export const site = {
  name: "Last Bus Stop Ministry",
  short: "LBSM",
  tagline: "Where Lives Are Transformed Through Christ",
  domain: "https://lastbusstopministry.org",
  description:
    "Last Bus Stop Ministry — a vibrant, Spirit-filled church in Agboju, Amuwo-Odofin, Lagos. Powerful worship, life-changing messages and a warm family for every visitor.",
  phone: { display: "+234-805-551-5723", href: "+2348055515723", wa: "2348055515723" },
  email: "info@lastbusstopministry.org",
  address: "212, Old Ojo Road, Agboju, Amuwo-Odofin, Lagos, Nigeria",
  addressShort: "Agboju, Amuwo-Odofin, Lagos",
  social: {
    facebook: "https://www.facebook.com/lastbusstopministry",
    instagram: "https://www.instagram.com/lastbusstopministry",
    youtube: "https://www.youtube.com/lastbusstopministry",
  },
  heroVideo: {
    youtubeId: "gTJ1bFapnhY",
    mp4: process.env.NEXT_PUBLIC_HERO_MP4 || "",
  },
};

export const waLink = (message: string) =>
  `https://wa.me/${site.phone.wa}?text=${encodeURIComponent(message)}`;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Ministries", href: "/ministries" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  { label: "Visit", href: "/visit" },
  { label: "Give", href: "/give" },
  { label: "Contact", href: "/contact" },
];

export const services = [
  { title: "Sunday Worship Service", day: "Sundays", time: "9:00 AM – 12:00 PM", place: "Main Sanctuary", text: "Experience powerful worship and life-changing messages from God's Word." },
  { title: "Midweek Prayer Meeting", day: "Wednesdays", time: "6:00 PM – 8:00 PM", place: "Prayer Hall", text: "Join us for fervent prayer and spiritual breakthrough." },
  { title: "Youth Fellowship Night", day: "Fridays", time: "7:00 PM – 9:00 PM", place: "Youth Center", text: "Dynamic programs for young people to grow in faith and fellowship." },
  { title: "Women's Ministry Meeting", day: "Monthly", time: "9:00 AM – 1:00 PM", place: "Main Sanctuary", text: "Empowering women of God for greater impact in their homes and communities." },
];

export type Ministry = { slug: string; title: string; short: string; text: string; image?: string; points: string[] };
export const ministries: Ministry[] = [
  { slug: "childrens-church", title: "Children's Church", short: "Teaching the next generation the Word of God.", text: "We teach the next generation the Word of God through fun, interactive, and culturally relevant programs.", image: "/assets/images/departments/children.jpg", points: ["Bible stories and interactive lessons", "Songs, activities and creative teaching", "A safe, loving environment for every child"] },
  { slug: "women", title: "Women Department", short: "Empowering women to transform families and communities.", text: "Empowering women to transform families and communities with the Word of God in today's challenging world.", image: "/assets/images/departments/women.jpg", points: ["Monthly women's ministry meeting", "Prayer, teaching and fellowship", "Mentorship and community impact"] },
  { slug: "music", title: "Music Ministry", short: "Leading powerful worship through gospel music.", text: "Leading powerful worship through Nigerian gospel music, choirs, and instrumental excellence.", image: "/assets/images/departments/music.jpg", points: ["Choir and vocal team", "Instrumentalists and sound team", "Leading worship at every service"] },
  { slug: "missions", title: "Missions", short: "Taking the gospel beyond our walls.", text: "Taking the gospel beyond our walls to unreached communities in Nigeria and beyond.", image: "/assets/images/departments/missions.jpg", points: ["Community outreach and evangelism", "Supporting unreached communities", "Partnering to spread the gospel"] },
  { slug: "youth", title: "Youth Fellowship", short: "Inspiring the next generation in faith.", text: "Dynamic programs for young people to grow in faith and fellowship — held every Friday night at the Youth Center.", image: "/assets/images/leaders/youth.jpg", points: ["Friday Youth Fellowship Night, 7:00 – 9:00 PM", "Discipleship and purpose-building", "A strong support system for students and young adults"] },
  { slug: "men", title: "Men's Ministry", short: "Building men of faith, family and purpose.", text: "A fellowship for men to grow in the Word, pray together and lead their homes and communities with integrity.", points: ["Fellowship and accountability", "Teaching rooted in Scripture", "Serving the church and community"] },
];

export const leaders = [
  { name: "Pastor Chinyere Amaechi", role: "Senior Pastor", text: "Spiritual leader with a passion for equipping believers.", image: "/assets/images/leaders/pastor.jpg" },
  { name: "Youth Leader", role: "Youth & Young Adults", text: "Inspiring the next generation in faith.", image: "/assets/images/leaders/youth.jpg" },
  { name: "Women Ministry Leader", role: "Women's Ministry", text: "Empowering women in their faith journey.", image: "/assets/images/leaders/women.jpg" },
];

export const foundation = [
  { icon: "Target", title: "Mission", text: "To preach the unadulterated Word of God and make disciples of all nations, starting from our community in Lagos." },
  { icon: "Telescope", title: "Vision", text: "To see lives transformed by the power of the Holy Spirit, families restored, and communities impacted for Christ." },
  { icon: "Heart", title: "Core Values", text: "Worship, Prayer, Fellowship, Evangelism, and Discipleship rooted in African Christian excellence." },
];

export const testimonials = [
  { name: "Adeola Adeyemi", role: "Mother & Business Owner", text: "Last Bus Stop Ministry has transformed my family. The teachings have brought healing and prosperity into our home." },
  { name: "Chinedu Okafor", role: "University Student", text: "I found purpose and direction here. The youth fellowship has been a strong support system for me in school." },
  { name: "Grace Johnson", role: "Retired Teacher", text: "After years of searching, I've finally found a church that feeds my soul. The worship is powerful and authentic." },
];

export const highlights = [
  { image: "/assets/images/departments/music.jpg", kicker: "Worship", title: "Powerful, Spirit-led worship", text: "Nigerian gospel, choirs and instrumental excellence that lift every heart.", href: "/ministries/music" },
  { image: "/assets/images/blog/prayer.jpg", kicker: "Prayer", title: "Persistent prayer, real breakthrough", text: "Join our midweek prayer meeting every Wednesday evening.", href: "/events" },
  { image: "/assets/images/blog/spirit.jpg", kicker: "The Word", title: "Rooted in the unadulterated Word", text: "Dynamic preaching that equips believers for effective Christian living.", href: "/about" },
  { image: "/assets/images/departments/children.jpg", kicker: "Children", title: "Raising the next generation", text: "Fun, interactive and culturally relevant Bible teaching for children.", href: "/ministries/childrens-church" },
  { image: "/assets/images/departments/women.jpg", kicker: "Women", title: "Women empowered by the Word", text: "Transforming families and communities through faith and fellowship.", href: "/ministries/women" },
  { image: "/assets/images/departments/missions.jpg", kicker: "Missions", title: "The gospel beyond our walls", text: "Reaching unreached communities in Nigeria and beyond.", href: "/ministries/missions" },
];

export type Post = { slug: string; title: string; excerpt: string; date: string; author: string; image: string; readTime: string; body: string[] };
export const posts: Post[] = [
  {
    slug: "the-power-of-persistent-prayer", title: "The Power of Persistent Prayer",
    excerpt: "Discover how consistent prayer can transform your spiritual life and bring breakthrough in difficult situations.",
    date: "May 15, 2025", author: "Pastor Chinyere Amaechi", image: "/assets/images/blog/prayer.jpg", readTime: "4 min read",
    body: [
      "Prayer is not a last resort for the believer — it is the lifeline of the Christian walk. Jesus taught His disciples that they ought always to pray and not lose heart, because persistence in prayer builds faith, patience and a deeper dependence on God.",
      "Persistent prayer does not mean repeating words until God relents. It means staying at the throne with confidence, trusting that our Father hears, cares and answers in His perfect time. Many breakthroughs come to those who refuse to stop knocking.",
      "Make prayer a daily rhythm: set a time, find a quiet place, open the Word, and speak honestly with God. Bring your family, your work, your community and your nation before Him. Then listen — He still speaks.",
      "Join us every Wednesday evening at the Prayer Hall as we pray together for breakthrough, healing and direction. You do not have to pray alone.",
    ],
  },
  {
    slug: "raising-godly-children-in-modern-nigeria", title: "Raising Godly Children in Modern Nigeria",
    excerpt: "Practical biblical wisdom for parents navigating the challenges of raising children in today's world.",
    date: "May 8, 2025", author: "Evangelist Solomon Amaechi", image: "/assets/images/blog/children.jpg", readTime: "5 min read",
    body: [
      "Raising children today comes with pressures our parents never imagined — screens, peer influence and a fast-changing culture. Yet the Bible's guidance remains steady: train up a child in the way he should go, and when he is old he will not depart from it.",
      "Start at home. Children learn faith more from what they see than from what they hear. Pray with them, read Scripture together, and let them watch you forgive, serve and trust God in hard seasons.",
      "Build a community around your family. Children thrive when they are surrounded by other believers who love them. Our Children's Church exists to partner with parents, teaching the Word through songs, stories and activities that children enjoy.",
      "Above all, be patient with the process. You are planting seeds that God will water.",
    ],
  },
  {
    slug: "the-holy-spirit-and-spiritual-gifts", title: "The Holy Spirit and Spiritual Gifts",
    excerpt: "Understanding the manifestations of the Holy Spirit and how to operate in your spiritual gifts.",
    date: "May 1, 2025", author: "Pastor Chinyere Amaechi", image: "/assets/images/blog/spirit.jpg", readTime: "5 min read",
    body: [
      "The Holy Spirit is not an idea or a force — He is God with us, the Helper Jesus promised. He convicts, comforts, guides into truth and empowers the church for witness.",
      "Scripture teaches that the Spirit gives gifts to every believer for the common good. These gifts are not trophies for personal display; they are tools for building up the body of Christ and serving people around us.",
      "To grow in your gift, stay close to the Word, remain in prayer, submit to godly leadership and serve faithfully where you are. Gifts mature as they are used in love.",
      "If you are unsure of your gift, join a department and start serving. God often reveals what He has placed in you as you step out.",
    ],
  },
];

export const faqs = [
  { q: "What time are your services?", a: "Sunday Worship Service holds from 9:00 AM to 12:00 PM in the Main Sanctuary. Midweek Prayer Meeting is on Wednesdays from 6:00 PM to 8:00 PM, and Youth Fellowship Night is on Fridays from 7:00 PM to 9:00 PM." },
  { q: "I'm a first-time visitor. What should I expect?", a: "Expect powerful worship, dynamic preaching and warm Nigerian hospitality that makes every visitor feel like family. Come as you are — we will be glad to meet you." },
  { q: "Is there a place for my children?", a: "Yes. Our Children's Church teaches the next generation the Word of God through fun, interactive and culturally relevant programs." },
  { q: "How do I join a department?", a: "Create a member account, choose your department (Men's, Women's or Youth) during registration, and our team will welcome you into the fellowship." },
  { q: "How can I give my tithe or offering?", a: "Make a payment to any of our official accounts listed on the Give page, then upload your receipt from your member dashboard so it can be verified." },
  { q: "How do I send a prayer request?", a: "Use the Prayer Request page — your request is sent straight to our prayer team on WhatsApp." },
];
