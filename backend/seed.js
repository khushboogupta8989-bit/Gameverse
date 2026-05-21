require('dotenv').config();
const mongoose = require('mongoose');

// --- 1. IMPORT ALL MODELS (Fixed) ---
const Player = require('./models/Player');
const Quiz = require('./models/Quiz');
const Game = require('./models/Game');
const Tournament = require('./models/Tournament');
const Article = require('./models/Article');
const Contact = require('./models/Contact'); // Added
const Highlight = require('./models/Highlight'); // Added
const Discussion = require('./models/Discussion'); // Added
const CommunityEvent = require('./models/CommunityEvent'); // Added

const connectDB = require('./config/db');

connectDB();

const seedDB = async () => {
  try {
    // 1. CLEAR DATA
    console.log('Clearing old data...');
    await Player.deleteMany({});
    await Quiz.deleteMany({});
    await Game.deleteMany({});
    await Tournament.deleteMany({});
    await Article.deleteMany({});
    await Highlight.deleteMany({});
    await Discussion.deleteMany({});
    await CommunityEvent.deleteMany({});
    console.log('Data cleared.');

    // REPLACE YOUR PLAYER SOCIALS WITH THIS FULL CORRECT FORMAT
    // YouTube links are full clickable URLs

    console.log('Seeding 20 Players...');

    await Player.deleteMany({});

    const players = [

      {
        rank: 1,
        name: "Jonathan",
        realName: "Jonathan Amaral",
        game: "BGMI",
        region: "India",
        team: "GodLike Esports",
        score: 3120,
        matches: 165,
        wins: 82,
        kd: 5.1,
        winRate: "49.6%",
        achievements: "BGIS Finalist",
        gameId: "5112583562",
        socials: {
          youtube: "https://www.youtube.com/@JonathanGaming",
          instagram: "https://www.instagram.com/jonathangamingae/"
        }
      },

      {
        rank: 2,
        name: "Scout",
        realName: "Tanmay Singh",
        game: "BGMI",
        region: "India",
        team: "XSpark",
        score: 3010,
        matches: 160,
        wins: 75,
        kd: 4.9,
        winRate: "46.8%",
        achievements: "BGMI Pro Series",
        gameId: "5144284479",
        socials: {
          youtube: "https://www.youtube.com/@ScoutOP",
          instagram: "https://www.instagram.com/scoutop/"
        }
      },

      {
        rank: 3,
        name: "MortaL",
        realName: "Naman Mathur",
        game: "BGMI",
        region: "India",
        team: "Soul",
        score: 2940,
        matches: 170,
        wins: 73,
        kd: 4.6,
        winRate: "42.9%",
        achievements: "PMIS Champion",
        gameId: "5129029183",
        socials: {
          youtube: "https://www.youtube.com/@MortaL",
          instagram: "https://www.instagram.com/mortal/"
        }
      },

      {
        rank: 4,
        name: "Mavi",
        realName: "Harmandeep Singh",
        game: "BGMI",
        region: "India",
        team: "Orangutan",
        score: 2810,
        matches: 155,
        wins: 66,
        kd: 4.4,
        winRate: "42.5%",
        achievements: "Top IGL",
        gameId: "5176580512",
        socials: {
          youtube: "https://www.youtube.com/@Mavi"
        }
      },

      {
        rank: 5,
        name: "Snax",
        realName: "Raj Varma",
        game: "BGMI",
        region: "India",
        team: "XSpark",
        score: 2700,
        matches: 150,
        wins: 61,
        kd: 4.2,
        winRate: "40.6%",
        achievements: "BMPS Finalist",
        gameId: "5128809348",
        socials: {
          youtube: "https://www.youtube.com/@SnaxGaming"
        }
      },

      {
        rank: 6,
        name: "Neyoo",
        realName: "Suraj Majumdar",
        game: "BGMI",
        region: "India",
        team: "GodLike Esports",
        score: 2610,
        matches: 148,
        wins: 58,
        kd: 4.0,
        winRate: "39.1%",
        achievements: "Support King",
        gameId: "5115885888",
        socials: {
          youtube: "https://www.youtube.com/@Neyoo"
        }
      },

      {
        rank: 7,
        name: "Owais",
        realName: "Mohammed Owais",
        game: "BGMI",
        region: "India",
        team: "Soul",
        score: 2520,
        matches: 146,
        wins: 55,
        kd: 3.9,
        winRate: "37.6%",
        achievements: "Veteran Player",
        gameId: "OwaisSoul",
        socials: {
          youtube: "https://www.youtube.com/@Owais"
        }
      },

      {
        rank: 1,
        name: "SK Rossi",
        realName: "Ganesh Gangadhar",
        game: "Valorant",
        region: "India",
        team: "Global Esports",
        score: 980,
        matches: 66,
        wins: 44,
        kd: 1.31,
        winRate: "66.6%",
        achievements: "India Star",
        gameId: "ROSSI#GE",
        socials: {
          youtube: "https://www.youtube.com/@SKRossi"
        }
      },

      {
        rank: 2,
        name: "Lightningfast",
        realName: "Ganesh Gangadhar",
        game: "Valorant",
        region: "India",
        team: "Velocity Gaming",
        score: 950,
        matches: 64,
        wins: 42,
        kd: 1.29,
        winRate: "65.6%",
        achievements: "VCSA Winner",
        gameId: "LF#123",
        socials: {
          youtube: "https://www.youtube.com/@Lightningfast"
        }
      },

      {
        rank: 3,
        name: "Rawfiul",
        realName: "Sabyasachi Bose",
        game: "Valorant",
        region: "India",
        team: "Revenant XSpark",
        score: 920,
        matches: 63,
        wins: 40,
        kd: 1.26,
        winRate: "63.4%",
        achievements: "MVP",
        gameId: "RAW#001",
        socials: {
          youtube: "https://www.youtube.com/@Rawfiul"
        }
      },

      {
        rank: 1,
        name: "Total Gaming",
        realName: "Ajay",
        game: "Free Fire",
        region: "India",
        team: "Total Gaming",
        score: 5100,
        matches: 560,
        wins: 285,
        kd: 5.8,
        winRate: "50.8%",
        achievements: "India FF Icon",
        gameId: "451012596",
        socials: {
          youtube: "https://www.youtube.com/@TotalGaming093"
        }
      },

      {
        rank: 2,
        name: "Desi Gamers",
        realName: "Amit Sharma",
        game: "Free Fire",
        region: "India",
        team: "Desi Gamers",
        score: 4850,
        matches: 530,
        wins: 260,
        kd: 5.5,
        winRate: "49.0%",
        achievements: "Top FF Creator",
        gameId: "206715551",
        socials: {
          youtube: "https://www.youtube.com/@DesiGamers"
        }
      },

      {
        rank: 3,
        name: "Pahadi Gaming",
        realName: "Lokesh Karakoti",
        game: "Free Fire",
        region: "India",
        team: "Orangutan",
        score: 4520,
        matches: 500,
        wins: 235,
        kd: 5.1,
        winRate: "47.0%",
        achievements: "FFIC Winner",
        gameId: "147098320",
        socials: {
          youtube: "https://www.youtube.com/@PahadiGaming"
        }
      },

      {
        rank: 4,
        name: "Raistar",
        realName: "Raistar",
        game: "Free Fire",
        region: "India",
        team: "Creator",
        score: 4380,
        matches: 470,
        wins: 220,
        kd: 5.0,
        winRate: "46.8%",
        achievements: "Movement King",
        gameId: "12022250",
        socials: {
          youtube: "https://www.youtube.com/@Raistar"
        }
      },

      {
        rank: 1,
        name: "Faker",
        realName: "Lee Sang-hyeok",
        game: "League of Legends",
        region: "Global",
        team: "T1",
        score: 9999,
        matches: 980,
        wins: 780,
        kd: 6.4,
        winRate: "79.5%",
        achievements: "5x World Champion",
        gameId: "T1 Faker",
        socials: {
          youtube: "https://www.youtube.com/@T1"
        }
      },

      {
        rank: 2,
        name: "s1mple",
        realName: "Oleksandr Kostyliev",
        game: "CS2",
        region: "Global",
        team: "NAVI",
        score: 9600,
        matches: 950,
        wins: 670,
        kd: 1.34,
        winRate: "70.5%",
        achievements: "CS Legend",
        gameId: "76561198034796890",
        socials: {
          youtube: "https://www.youtube.com/@s1mple"
        }
      },

      {
        rank: 3,
        name: "TenZ",
        realName: "Tyson Ngo",
        game: "Valorant",
        region: "Global",
        team: "Sentinels",
        score: 9400,
        matches: 310,
        wins: 220,
        kd: 1.42,
        winRate: "70.9%",
        achievements: "Masters Winner",
        gameId: "TenZ#uwu",
        socials: {
          youtube: "https://www.youtube.com/@TenZ"
        }
      },

      {
        rank: 4,
        name: "Shroud",
        realName: "Michael Grzesiek",
        game: "FPS General",
        region: "Global",
        team: "Creator",
        score: 9000,
        matches: 2200,
        wins: 1210,
        kd: 2.2,
        winRate: "55.0%",
        achievements: "Streaming Icon",
        gameId: "N/A",
        socials: {
          youtube: "https://www.youtube.com/@Shroud"
        }
      },

      {
        rank: 5,
        name: "ZywOo",
        realName: "Mathieu Herbaut",
        game: "CS2",
        region: "Global",
        team: "Vitality",
        score: 9200,
        matches: 880,
        wins: 640,
        kd: 1.36,
        winRate: "72.7%",
        achievements: "HLTV #1",
        gameId: "ZywOo",
        socials: {
          youtube: "https://www.youtube.com/@TeamVitality"
        }
      },

      {
        rank: 6,
        name: "Aspas",
        realName: "Erick Santos",
        game: "Valorant",
        region: "Global",
        team: "Leviatan",
        score: 9050,
        matches: 280,
        wins: 198,
        kd: 1.39,
        winRate: "70.7%",
        achievements: "Duelist King",
        gameId: "Aspas#777",
        socials: {
          youtube: "https://www.youtube.com/@aspas"
        }
      }

    ];

    await Player.insertMany(players);

    console.log('Players seeded!');

    // 3. SEED QUIZ (10 LEVELS)
    console.log('Seeding Quiz...');
    const createQuizLevel = (levelNum, title, diff, questions) => {
      return {
        level: levelNum, title: title, difficulty: diff,
        questions: questions.map(q => ({ question: q.q, options: q.opts, correct: q.ans }))
      };
    };
    const quizLevels = [
      createQuizLevel(1, "Gaming Basics", "Easy", [
        { q: "What does CPU stand for?", opts: ["Central Processing Unit", "Central Program Unit", "Computer Personal Unit", "Central Processor Unit"], ans: 0 },
        { q: "Which company developed the PlayStation?", opts: ["Nintendo", "Microsoft", "Sony", "Sega"], ans: 2 },
        { q: "Which game features Mario?", opts: ["Sonic", "Super Mario Bros", "Zelda", "Metroid"], ans: 1 }
      ]),
      createQuizLevel(2, "Console Wars", "Easy", [
        { q: "Which company makes the Xbox?", opts: ["Sony", "Nintendo", "Microsoft", "Sega"], ans: 2 },
        { q: "What is the name of Sonic's sidekick?", opts: ["Knuckles", "Tails", "Shadow", "Amy"], ans: 1 },
        { q: "What year was the first PlayStation released?", opts: ["1994", "1998", "2000", "1991"], ans: 0 }
      ]),
      createQuizLevel(3, "PC Master Race", "Medium", [
        { q: "What does GPU stand for?", opts: ["General Processing Unit", "Graphics Processing Unit", "Gaming Power Unit", "Grand Program Unit"], ans: 1 },
        { q: "Which platform is known for 'Steam'?", opts: ["PlayStation", "Xbox", "PC", "Switch"], ans: 2 },
        { q: "What is the most popular PC game engine?", opts: ["Unity", "Unreal", "Godot", "Frostbite"], ans: 0 }
      ]),
      createQuizLevel(4, "Mobile Gaming", "Medium", [
        { q: "Which game popularized Battle Royale on mobile in India?", opts: ["PUBG", "Free Fire", "Fortnite", "COD Mobile"], ans: 0 },
        { q: "What does 'AFK' stand for?", opts: ["A Fast Killer", "Away From Keyboard", "Always Fighting Kings", "At First Kill"], ans: 1 },
        { q: "Which company owns Clash of Clans?", opts: ["Garena", "Krafton", "Supercell", "Riot"], ans: 2 }
      ]),
      createQuizLevel(5, "Esports Legends", "Medium", [
        { q: "Which game has the tournament 'The International'?", opts: ["LoL", "CS:GO", "Dota 2", "Valorant"], ans: 2 },
        { q: "Who is known as the 'God of War' in Indian BGMI?", opts: ["Mortal", "Scout", "Jony", "Omega"], ans: 0 },
        { q: "What does 'OP' mean?", opts: ["Over Powered", "One Player", "Original Post", "Old Patch"], ans: 0 }
      ]),
      createQuizLevel(6, "Retro Gaming", "Hard", [
        { q: "What was the first commercially successful video game?", opts: ["Space Invaders", "Pong", "Pac-Man", "Tetris"], ans: 1 },
        { q: "What year was the Nintendo 64 released?", opts: ["1994", "1996", "1998", "2000"], ans: 1 },
        { q: "What is the best selling game of all time?", opts: ["Tetris", "Minecraft", "GTA V", "Wii Sports"], ans: 1 }
      ]),
      createQuizLevel(7, "Battle Royale", "Hard", [
        { q: "In PUBG, what level is the M416 most effective?", opts: ["Level 1", "Level 2", "Level 3", "It depends on attachments"], ans: 3 },
        { q: "What is the zone called in Free Fire?", opts: ["Circle", "Zone", "Shrinking Playzone", "Bermuda"], ans: 2 },
        { q: "How many players land in a classic PUBG match?", opts: ["50", "75", "100", "120"], ans: 2 }
      ]),
      createQuizLevel(8, "Game Lore", "Hard", [
        { q: "What is the main character's name in GTA V?", opts: ["Michael, Trevor, Franklin", "CJ, Claude, Tommy", "Niko, Luis, Johnny", "Arthur, John, Dutch"], ans: 0 },
        { q: "In Valorant, which agent is from India?", opts: ["Jett", "Raze", "Harbor", "Phoenix"], ans: 2 },
        { q: "What is the name of the planet in God of War (2018)?", opts: ["Midgard", "Earth", "Asgard", "Helheim"], ans: 0 }
      ]),
      createQuizLevel(9, "Tech Trivia", "Expert", [
        { q: "What does RAM stand for?", opts: ["Read Access Memory", "Random Access Memory", "Run Active Memory", "Rapid Action Module"], ans: 1 },
        { q: "What is Ray Tracing?", opts: ["A lighting technique", "A pathfinding algorithm", "A physics engine", "A network protocol"], ans: 0 },
        { q: "What is the refresh rate of the human eye approx?", opts: ["30Hz", "60Hz", "120Hz", "It varies"], ans: 3 }
      ]),
      createQuizLevel(10, "Final Boss", "Expert", [
        { q: "Who created the first video game?", opts: ["Shigeru Miyamoto", "Nolan Bushnell", "William Higinbotham", "Ralph Baer"], ans: 2 },
        { q: "What is the code for Konami's famous cheat?", opts: ["Up Up Down Down...", "Down Down Up Up...", "Left Right Left Right...", "A B A B Start"], ans: 0 },
        { q: "What is the name of the demon in Doom?", opts: ["Cyberdemon", "Imp", "Cacodemon", "Spider Mastermind"], ans: 0 }
      ])
    ];
    await Quiz.insertMany(quizLevels);
    console.log('Quiz seeded with 10 levels!');

    // 4. SEED GAMES
    console.log('Seeding Games...');

    const gamesData = [
      {
        name: "BGMI",
        fullName: "Battlegrounds Mobile India",
        genre: "Battle Royale",
        imageKey: "bgmi",
        rating: 4.8,
        releaseYear: 2021,
        platforms: ["Android", "iOS"],
        developer: "Krafton",
        publisher: "Krafton",
        description: "India's top battle royale game.",
        esports: "BGIS",
        playerBase: "50M+",
        officialSite: "https://www.battlegroundsmobileindia.com",
        popularity: 98
      },

      {
        name: "Valorant",
        fullName: "Valorant",
        genre: "FPS",
        imageKey: "valorant",
        rating: 4.9,
        releaseYear: 2020,
        platforms: ["PC"],
        developer: "Riot Games",
        publisher: "Riot Games",
        description: "5v5 tactical shooter.",
        esports: "VCT",
        playerBase: "15M+",
        officialSite: "https://playvalorant.com",
        popularity: 95
      },

      {
        name: "Free Fire MAX",
        fullName: "Garena Free Fire MAX",
        genre: "Battle Royale",
        imageKey: "freefire",
        rating: 4.5,
        releaseYear: 2021,
        platforms: ["Android", "iOS"],
        developer: "Garena",
        publisher: "Garena",
        description: "Popular survival shooter.",
        esports: "FFIC",
        playerBase: "80M+",
        officialSite: "https://ff.garena.com",
        popularity: 92
      },

      {
        name: "Call of Duty Mobile",
        fullName: "Call of Duty Mobile",
        genre: "FPS",
        imageKey: "cod",
        rating: 4.6,
        releaseYear: 2019,
        platforms: ["Android", "iOS"],
        developer: "TiMi Studios",
        publisher: "Activision",
        description: "Mobile COD experience.",
        esports: "CODM Championship",
        playerBase: "100M+",
        officialSite: "https://www.callofduty.com/mobile",
        popularity: 90
      },

      {
        name: "Clash of Clans",
        fullName: "Clash of Clans",
        genre: "Strategy",
        imageKey: "coc",
        rating: 4.7,
        releaseYear: 2012,
        platforms: ["Android", "iOS"],
        developer: "Supercell",
        publisher: "Supercell",
        description: "Legendary village strategy game.",
        esports: "World Championship",
        playerBase: "70M+",
        officialSite: "https://supercell.com",
        popularity: 88
      },

      {
        name: "League of Legends",
        fullName: "League of Legends",
        genre: "MOBA",
        imageKey: "lol",
        rating: 4.8,
        releaseYear: 2009,
        platforms: ["PC"],
        developer: "Riot Games",
        publisher: "Riot Games",
        description: "World's biggest MOBA.",
        esports: "Worlds",
        playerBase: "8M+",
        officialSite: "https://leagueoflegends.com",
        popularity: 85
      },

      {
        name: "Minecraft",
        fullName: "Minecraft",
        genre: "Sandbox",
        imageKey: "minecraft",
        rating: 4.9,
        releaseYear: 2011,
        platforms: ["PC", "Console", "Mobile"],
        developer: "Mojang",
        publisher: "Microsoft",
        description: "Ultimate sandbox building game.",
        esports: "MCC",
        playerBase: "25M+",
        officialSite: "https://minecraft.net",
        popularity: 94
      },

      {
        name: "GTA V",
        fullName: "Grand Theft Auto V",
        genre: "Action Adventure",
        imageKey: "gta",
        rating: 4.8,
        releaseYear: 2013,
        platforms: ["PC", "Console"],
        developer: "Rockstar North",
        publisher: "Rockstar Games",
        description: "Open world crime action game.",
        esports: "Community Events",
        playerBase: "12M+",
        officialSite: "https://rockstargames.com",
        popularity: 87
      },

      {
        name: "Apex Legends",
        fullName: "Apex Legends",
        genre: "Battle Royale",
        imageKey: "apex",
        rating: 4.7,
        releaseYear: 2019,
        platforms: ["PC", "Console", "Mobile"],
        developer: "Respawn Entertainment",
        publisher: "EA",
        description: "Hero-based battle royale shooter.",
        esports: "ALGS",
        playerBase: "30M+",
        officialSite: "https://www.ea.com/games/apex-legends",
        popularity: 89
      },

      {
        name: "eFootball",
        fullName: "eFootball 2026",
        genre: "Sports",
        imageKey: "efootball",
        rating: 4.3,
        releaseYear: 2021,
        platforms: ["PC", "Console", "Mobile"],
        developer: "Konami",
        publisher: "Konami",
        description: "Football simulation game.",
        esports: "eFootball Championship",
        playerBase: "20M+",
        officialSite: "https://www.konami.com/efootball",
        popularity: 84
      },

      {
        name: "Clash Royale",
        fullName: "Clash Royale",
        genre: "Strategy",
        imageKey: "clashroyale",
        rating: 4.6,
        releaseYear: 2016,
        platforms: ["Android", "iOS"],
        developer: "Supercell",
        publisher: "Supercell",
        description: "Real-time card battle game.",
        esports: "CRL",
        playerBase: "35M+",
        officialSite: "https://supercell.com",
        popularity: 86
      },

      {
        name: "FIFA",
        fullName: "EA Sports FC 26",
        genre: "Sports",
        imageKey: "fifa",
        rating: 4.7,
        releaseYear: 2025,
        platforms: ["PC", "Console"],
        developer: "EA Vancouver",
        publisher: "EA Sports",
        description: "World's biggest football game.",
        esports: "FC Pro",
        playerBase: "40M+",
        officialSite: "https://ea.com",
        popularity: 91
      },

      {
        name: "Elden Ring",
        fullName: "Elden Ring",
        genre: "Action RPG",
        imageKey: "Ring",
        rating: 4.9,
        releaseYear: 2022,
        platforms: ["PC", "Console"],
        developer: "FromSoftware",
        publisher: "Bandai Namco",
        description: "Open world souls RPG.",
        esports: "Community",
        playerBase: "20M+",
        officialSite: "https://bandainamcoent.eu",
        popularity: 96
      },

      {
        name: "Baldur's Gate 3",
        fullName: "Baldur's Gate 3",
        genre: "RPG",
        imageKey: "baldurs",
        rating: 4.9,
        releaseYear: 2023,
        platforms: ["PC", "Console"],
        developer: "Larian Studios",
        publisher: "Larian Studios",
        description: "Story-driven fantasy RPG.",
        esports: "None",
        playerBase: "10M+",
        officialSite: "https://baldursgate3.game",
        popularity: 94
      },

      {
        name: "Cyberpunk 2077",
        fullName: "Cyberpunk 2077",
        genre: "RPG",
        imageKey: "cyberpunk",
        rating: 4.7,
        releaseYear: 2020,
        platforms: ["PC", "Console"],
        developer: "CD Projekt Red",
        publisher: "CD Projekt",
        description: "Sci-fi open world RPG.",
        esports: "None",
        playerBase: "18M+",
        officialSite: "https://cyberpunk.net",
        popularity: 91
      },

      {
        name: "Starfield",
        fullName: "Starfield",
        genre: "Sci-Fi RPG",
        imageKey: "starfield",
        rating: 4.5,
        releaseYear: 2023,
        platforms: ["PC", "Console"],
        developer: "Bethesda",
        publisher: "Bethesda",
        description: "Massive space RPG.",
        esports: "None",
        playerBase: "9M+",
        officialSite: "https://bethesda.net",
        popularity: 88
      },

      {
        name: "Diablo IV",
        fullName: "Diablo IV",
        genre: "Action RPG",
        imageKey: "diablo",
        rating: 4.6,
        releaseYear: 2023,
        platforms: ["PC", "Console"],
        developer: "Blizzard",
        publisher: "Blizzard",
        description: "Dark dungeon crawler.",
        esports: "Seasonal",
        playerBase: "12M+",
        officialSite: "https://diablo4.blizzard.com",
        popularity: 87
      },

      {
        name: "Counter-Strike 2",
        fullName: "Counter-Strike 2",
        genre: "FPS",
        imageKey: "Counter",
        rating: 4.8,
        releaseYear: 2023,
        platforms: ["PC"],
        developer: "Valve",
        publisher: "Valve",
        description: "Competitive tactical shooter.",
        esports: "Majors",
        playerBase: "30M+",
        officialSite: "https://counter-strike.net",
        popularity: 95
      },

      {
        name: "Overwatch 2",
        fullName: "Overwatch 2",
        genre: "Hero Shooter",
        imageKey: "Overwatch",
        rating: 4.4,
        releaseYear: 2022,
        platforms: ["PC", "Console"],
        developer: "Blizzard",
        publisher: "Blizzard",
        description: "Fast team hero shooter.",
        esports: "OWL",
        playerBase: "14M+",
        officialSite: "https://overwatch.blizzard.com",
        popularity: 84
      },

      {
        name: "Warzone",
        fullName: "Call of Duty Warzone",
        genre: "Battle Royale",
        imageKey: "cod2",
        rating: 4.7,
        releaseYear: 2020,
        platforms: ["PC", "Console"],
        developer: "Infinity Ward",
        publisher: "Activision",
        description: "Large-scale COD battle royale.",
        esports: "Warzone Events",
        playerBase: "50M+",
        officialSite: "https://callofduty.com/warzone",
        popularity: 93
      },

      {
        name: "Fortnite",
        fullName: "Fortnite",
        genre: "Battle Royale",
        imageKey: "fortnite",
        rating: 4.8,
        releaseYear: 2017,
        platforms: ["PC", "Console", "Mobile"],
        developer: "Epic Games",
        publisher: "Epic Games",
        description: "World-famous BR with building.",
        esports: "FNCS",
        playerBase: "100M+",
        officialSite: "https://fortnite.com",
        popularity: 97
      },
      {
        name: "Red Dead Redemption 2",
        fullName: "Red Dead Redemption 2",
        genre: "Action Adventure",
        imageKey: "rdr2",
        rating: 4.9,
        releaseYear: 2018,
        platforms: ["PC", "Console"],
        developer: "Rockstar Games",
        publisher: "Rockstar Games",
        description: "Epic open world western adventure game.",
        esports: "Community Events",
        playerBase: "20M+",
        officialSite: "https://www.rockstargames.com/reddeadredemption2",
        popularity: 94
      },

      {
        name: "Rocket League",
        fullName: "Rocket League",
        genre: "Sports / Racing",
        imageKey: "rocketleague",
        rating: 4.7,
        releaseYear: 2015,
        platforms: ["PC", "Console"],
        developer: "Psyonix",
        publisher: "Epic Games",
        description: "Cars playing football in competitive multiplayer.",
        esports: "RLCS",
        playerBase: "25M+",
        officialSite: "https://www.rocketleague.com",
        popularity: 88
      },

      {
        name: "Dota 2",
        fullName: "Dota 2",
        genre: "MOBA",
        imageKey: "dota2",
        rating: 4.8,
        releaseYear: 2013,
        platforms: ["PC"],
        developer: "Valve",
        publisher: "Valve",
        description: "Legendary competitive MOBA strategy game.",
        esports: "The International",
        playerBase: "12M+",
        officialSite: "https://www.dota2.com",
        popularity: 90
      },

      {
        name: "PUBG PC",
        fullName: "PUBG: Battlegrounds",
        genre: "Battle Royale",
        imageKey: "pubgpc",
        rating: 4.6,
        releaseYear: 2017,
        platforms: ["PC", "Console"],
        developer: "Krafton",
        publisher: "Krafton",
        description: "Original battle royale survival shooter.",
        esports: "PGS",
        playerBase: "18M+",
        officialSite: "https://pubg.com",
        popularity: 89
      },

      {
        name: "Rainbow Six Siege",
        fullName: "Tom Clancy's Rainbow Six Siege",
        genre: "Tactical FPS",
        imageKey: "r6",
        rating: 4.7,
        releaseYear: 2015,
        platforms: ["PC", "Console"],
        developer: "Ubisoft Montreal",
        publisher: "Ubisoft",
        description: "Competitive tactical destruction shooter.",
        esports: "Six Invitational",
        playerBase: "15M+",
        officialSite: "https://www.ubisoft.com/rainbow-six/siege",
        popularity: 87
      },

      {
        name: "Genshin Impact",
        fullName: "Genshin Impact",
        genre: "Action RPG",
        imageKey: "genshin",
        rating: 4.8,
        releaseYear: 2020,
        platforms: ["PC", "Mobile", "Console"],
        developer: "miHoYo",
        publisher: "HoYoverse",
        description: "Anime open-world RPG with elemental combat.",
        esports: "Community Events",
        playerBase: "65M+",
        officialSite: "https://genshin.hoyoverse.com",
        popularity: 93
      },

      {
        name: "The Witcher 3",
        fullName: "The Witcher 3: Wild Hunt",
        genre: "Open World RPG",
        imageKey: "witcher3",
        rating: 4.9,
        releaseYear: 2015,
        platforms: ["PC", "Console"],
        developer: "CD Projekt Red",
        publisher: "CD Projekt",
        description: "Award-winning fantasy open world RPG.",
        esports: "None",
        playerBase: "18M+",
        officialSite: "https://www.thewitcher.com",
        popularity: 92
      }
    ];

    await Game.insertMany(gamesData);
    console.log('Games seeded!');

    // 5. SEED TOURNAMENTS
    console.log('Seeding Tournaments...');
    const tournamentsData = [

      {
        name: "ESL Pro League Season 22",
        game: "Counter-Strike 2",
        status: "Upcoming",
        startDate: new Date('2026-05-05'),
        endDate: new Date('2026-05-25'),
        location: "Malta",
        format: "Group Stage + Playoffs",
        prizePool: "$1,000,000",
        region: "International",
        banner: "cardEsl",
        description: "Elite Counter-Strike teams compete in ESL Pro League.",
        officialWebsite: "https://pro.eslgaming.com",
        streamLink: "https://twitch.tv/eslcs",
        teams: ["FaZe Clan", "Vitality", "G2 Esports", "NAVI"]
      },

      {
        name: "VCT Masters 2026",
        game: "Valorant",
        status: "Upcoming",
        startDate: new Date('2026-06-10'),
        endDate: new Date('2026-06-25'),
        location: "Tokyo, Japan",
        format: "Double Elimination",
        prizePool: "$1,000,000",
        region: "International",
        banner: "cardVctMasters",
        description: "Top Valorant teams battle for Masters trophy.",
        officialWebsite: "https://valorantesports.com",
        streamLink: "https://twitch.tv/valorant",
        teams: ["Sentinels", "Paper Rex", "Fnatic", "Gen.G"]
      },

      {
        name: "VCT Pacific League",
        game: "Valorant",
        status: "Live",
        startDate: new Date('2026-04-10'),
        endDate: new Date('2026-05-15'),
        location: "Seoul, South Korea",
        format: "League Stage",
        prizePool: "$500,000",
        region: "Asia",
        banner: "cardVct",
        description: "Asia Pacific Valorant regional championship.",
        officialWebsite: "https://valorantesports.com",
        streamLink: "https://twitch.tv/valorant",
        teams: ["DRX", "Paper Rex", "T1", "Gen.G"]
      },

      {
        name: "BGIS 2026",
        game: "BGMI",
        status: "Live",
        startDate: new Date('2026-04-01'),
        endDate: new Date('2026-06-20'),
        location: "India",
        format: "Online + LAN Finals",
        prizePool: "₹2,00,00,000",
        region: "India",
        banner: "cardBgmi",
        description: "India's biggest BGMI esports tournament.",
        officialWebsite: "https://battlegroundsmobileindia.com",
        streamLink: "https://youtube.com/BGMI",
        teams: ["Soul", "GodLike", "XSpark", "Orangutan"]
      },

      {
        name: "IEM Katowice 2026",
        game: "Counter-Strike 2",
        status: "Completed",
        startDate: new Date('2026-02-08'),
        endDate: new Date('2026-02-22'),
        location: "Katowice, Poland",
        format: "Arena Playoffs",
        prizePool: "$1,250,000",
        region: "International",
        banner: "cardIem",
        description: "Historic Counter-Strike arena event.",
        officialWebsite: "https://iem.gg",
        streamLink: "https://twitch.tv/eslcs",
        teams: ["Vitality", "FaZe", "Spirit", "G2"]
      },

      {
        name: "Free Fire World Series 2026",
        game: "Free Fire MAX",
        status: "Upcoming",
        startDate: new Date('2026-07-05'),
        endDate: new Date('2026-07-20'),
        location: "Bangkok, Thailand",
        format: "League + Grand Finals",
        prizePool: "$2,000,000",
        region: "International",
        banner: "cardFreefire",
        description: "Global Free Fire championship.",
        officialWebsite: "https://ff.garena.com",
        streamLink: "https://youtube.com/freefire",
        teams: ["LOUD", "EVOS", "RRQ", "Phoenix"]
      },

      {
        name: "LoL Worlds 2026",
        game: "League of Legends",
        status: "Upcoming",
        startDate: new Date('2026-09-20'),
        endDate: new Date('2026-11-01'),
        location: "Shanghai, China",
        format: "Swiss + Knockouts",
        prizePool: "$3,000,000",
        region: "International",
        banner: "cardLol",
        description: "The biggest League of Legends tournament.",
        officialWebsite: "https://lolesports.com",
        streamLink: "https://twitch.tv/riotgames",
        teams: ["T1", "Gen.G", "G2", "BLG"]
      },

      {
        name: "The International 2026",
        game: "Dota 2",
        status: "Upcoming",
        startDate: new Date('2026-08-12'),
        endDate: new Date('2026-08-30'),
        location: "Seattle, USA",
        format: "Group Stage + Main Event",
        prizePool: "$18,000,000+",
        region: "International",
        banner: "cardDota",
        description: "The most prestigious Dota 2 event.",
        officialWebsite: "https://www.dota2.com",
        streamLink: "https://twitch.tv/dota2ti",
        teams: ["Team Spirit", "Liquid", "Falcons", "GG"]
      },

      {
        name: "RLCS World Championship 2026",
        game: "Rocket League",
        status: "Upcoming",
        startDate: new Date('2026-07-28'),
        endDate: new Date('2026-08-05'),
        location: "Dallas, USA",
        format: "Swiss + Playoffs",
        prizePool: "$1,500,000",
        region: "International",
        banner: "cardRl",
        description: "Top Rocket League teams fight for world title.",
        officialWebsite: "https://rocketleagueesports.com",
        streamLink: "https://twitch.tv/rocketleague",
        teams: ["Vitality", "BDS", "G2", "KCorp"]
      },

      {
        name: "Pokemon UNITE WCS 2026",
        game: "Pokemon UNITE",
        status: "Upcoming",
        startDate: new Date('2026-08-18'),
        endDate: new Date('2026-08-24'),
        location: "Honolulu, Hawaii",
        format: "Double Elimination",
        prizePool: "$500,000",
        region: "International",
        banner: "cardPokemon",
        description: "World Championship for Pokemon Unite.",
        officialWebsite: "https://pokemon.com",
        streamLink: "https://twitch.tv/pokemon",
        teams: ["Luminosity", "Talon", "Nouns"]
      },

      {
        name: "eFootball Championship 2026",
        game: "eFootball",
        status: "Upcoming",
        startDate: new Date('2026-06-15'),
        endDate: new Date('2026-06-18'),
        location: "Barcelona, Spain",
        format: "1v1 Knockout",
        prizePool: "$300,000",
        region: "International",
        banner: "cardEfootball",
        description: "Best eFootball players compete globally.",
        officialWebsite: "https://efootball.konami.com",
        streamLink: "https://youtube.com/efootball",
        teams: []
      },

      {
        name: "BLAST Premier World Final",
        game: "Counter-Strike 2",
        status: "Completed",
        startDate: new Date('2026-01-15'),
        endDate: new Date('2026-01-20'),
        location: "Copenhagen, Denmark",
        format: "Single Elimination",
        prizePool: "$1,000,000",
        region: "International",
        banner: "cardBlast",
        description: "Premier CS2 world final event.",
        officialWebsite: "https://blast.tv",
        streamLink: null,
        teams: ["Vitality (Winner)", "FaZe", "NAVI", "Spirit"]
      },

      // EXTRA 10 TOURNAMENTS

      {
        name: "Fortnite Global Championship",
        game: "Fortnite",
        status: "Upcoming",
        startDate: new Date('2026-10-05'),
        endDate: new Date('2026-10-10'),
        location: "Los Angeles, USA",
        format: "Battle Royale Finals",
        prizePool: "$4,000,000",
        region: "International",
        banner: "cardFortnite",
        description: "Top Fortnite players fight for global title.",
        officialWebsite: "https://fortnite.com",
        streamLink: "https://twitch.tv/fortnite",
        teams: []
      },

      {
        name: "COD Mobile World Championship",
        game: "Call of Duty Mobile",
        status: "Upcoming",
        startDate: new Date('2026-08-05'),
        endDate: new Date('2026-08-15'),
        location: "Las Vegas, USA",
        format: "Group + Finals",
        prizePool: "$2,000,000",
        region: "International",
        banner: "cardCod",
        description: "Top COD Mobile teams compete globally.",
        officialWebsite: "https://callofduty.com/mobile",
        streamLink: "https://youtube.com/codmobile",
        teams: ["Tribe", "GodLike", "Nova"]
      },

      {
        name: "Apex Legends Global Series",
        game: "Apex Legends",
        status: "Upcoming",
        startDate: new Date('2026-09-01'),
        endDate: new Date('2026-09-10'),
        location: "London, UK",
        format: "Match Point Finals",
        prizePool: "$1,500,000",
        region: "International",
        banner: "cardApex",
        description: "World championship for Apex Legends.",
        officialWebsite: "https://ea.com/apex-legends",
        streamLink: "https://twitch.tv/playapex",
        teams: ["TSM", "DarkZero", "Alliance"]
      },

      {
        name: "PUBG Global Championship",
        game: "PUBG PC",
        status: "Upcoming",
        startDate: new Date('2026-11-10'),
        endDate: new Date('2026-11-25'),
        location: "Dubai, UAE",
        format: "League + Finals",
        prizePool: "$2,500,000",
        region: "International",
        banner: "cardPubg",
        description: "Major PUBG global tournament.",
        officialWebsite: "https://pubg.com",
        streamLink: "https://youtube.com/pubg",
        teams: ["Gen.G", "SQ", "NAVI"]
      },

      {
        name: "Minecraft Championship",
        game: "Minecraft",
        status: "Live",
        startDate: new Date('2026-04-15'),
        endDate: new Date('2026-04-18'),
        location: "Online",
        format: "Mini Games",
        prizePool: "$100,000",
        region: "International",
        banner: "cardMinecraft",
        description: "Creators battle in Minecraft events.",
        officialWebsite: "https://minecraft.net",
        streamLink: "https://youtube.com",
        teams: []
      },

      {
        name: "GTA Online Racing Cup",
        game: "GTA V",
        status: "Upcoming",
        startDate: new Date('2026-07-01'),
        endDate: new Date('2026-07-03'),
        location: "Online",
        format: "Racing Finals",
        prizePool: "$75,000",
        region: "International",
        banner: "cardGta",
        description: "Fastest racers compete in GTA Online.",
        officialWebsite: "https://rockstargames.com",
        streamLink: "https://youtube.com",
        teams: []
      },

      {
        name: "EA FC Pro Finals",
        game: "FIFA",
        status: "Upcoming",
        startDate: new Date('2026-06-25'),
        endDate: new Date('2026-06-30'),
        location: "Madrid, Spain",
        format: "1v1 Knockout",
        prizePool: "$500,000",
        region: "International",
        banner: "cardFifa",
        description: "Top football esports players compete.",
        officialWebsite: "https://ea.com",
        streamLink: "https://youtube.com/easportsfc",
        teams: []
      },

      {
        name: "Overwatch Champions Series",
        game: "Overwatch 2",
        status: "Upcoming",
        startDate: new Date('2026-09-12'),
        endDate: new Date('2026-09-18'),
        location: "Toronto, Canada",
        format: "Bracket Finals",
        prizePool: "$1,000,000",
        region: "International",
        banner: "cardOverwatch",
        description: "Top Overwatch teams clash globally.",
        officialWebsite: "https://playoverwatch.com",
        streamLink: "https://youtube.com/overwatch",
        teams: ["Falcons", "Shock", "Fuel"]
      },

      {
        name: "Six Invitational",
        game: "Rainbow Six Siege",
        status: "Completed",
        startDate: new Date('2026-02-01'),
        endDate: new Date('2026-02-10'),
        location: "Montreal, Canada",
        format: "Double Elimination",
        prizePool: "$3,000,000",
        region: "International",
        banner: "cardR6",
        description: "Prestigious Rainbow Six world championship.",
        officialWebsite: "https://ubisoft.com",
        streamLink: "https://twitch.tv/rainbow6",
        teams: ["G2", "W7M", "FaZe"]
      },

      {
        name: "Genshin Impact Arena Cup",
        game: "Genshin Impact",
        status: "Upcoming",
        startDate: new Date('2026-08-28'),
        endDate: new Date('2026-08-30'),
        location: "Shanghai, China",
        format: "PvP Event",
        prizePool: "$250,000",
        region: "Asia",
        banner: "cardGenshin",
        description: "Competitive Genshin showcase event.",
        officialWebsite: "https://genshin.hoyoverse.com",
        streamLink: "https://youtube.com/genshinimpact",
        teams: []
      }

    ];
    await Tournament.insertMany(tournamentsData);
    console.log('Tournaments seeded!');

    // 6. SEED ALL 10 ARTICLES
    console.log('Seeding 10 Articles...');
    const articlesData = [

      {
        title: "Valorant Champions Tour India",
        category: "Esports",
        imageKey: "newsValorant",
        snippet: "The Indian Valorant scene is exploding.",
        content: "The Valorant Champions Tour (VCT) ecosystem continues to expand in India with stronger regional participation and rising talent. Teams like Global Esports and Revenant XSpark are gaining international recognition through consistent performances. Riot Games has increased investment in Asia-Pacific leagues, giving Indian players better exposure. The introduction of franchised leagues has improved stability for organizations and players alike. Viewership numbers have also surged, especially among Indian audiences on streaming platforms. Grassroots tournaments are feeding new talent into the competitive pipeline. With improved infrastructure and sponsorships, India is becoming a serious contender in the global Valorant scene. Analysts expect at least one Indian team to break into top-tier international events soon. The future of Valorant esports in India looks highly promising.",
        author: "Rohan Sharma",
        readTime: "5 min",
        date: new Date('2025-02-28')
      },

      {
        title: "BGMI 3.0 Update",
        category: "Updates",
        imageKey: "newsbgmi",
        snippet: "Krafton drops the massive 3.0 update.",
        content: "Krafton has rolled out the BGMI 3.0 update, bringing major gameplay improvements and new content. The update introduces enhancements to the Nusa map along with new weapons and optimized mechanics. Players can experience smoother graphics, reduced lag, and improved matchmaking systems. New themed modes and limited-time events have also been added to keep gameplay fresh. The update focuses heavily on competitive balance, ensuring fair gameplay in ranked matches. Anti-cheat systems have been further strengthened to maintain integrity in esports tournaments. Community feedback has been largely positive, especially regarding performance optimization on mid-range devices. This update is expected to boost player engagement significantly in India.",
        author: "Ananya Iyer",
        readTime: "4 min",
        date: new Date('2025-02-25')
      },

      {
        title: "GTA 6 Release Confirmed",
        category: "News",
        imageKey: "newsgta",
        snippet: "Rockstar confirms release window.",
        content: "Rockstar Games has officially confirmed that Grand Theft Auto VI is in development with a planned release window around 2025–2026. The game is expected to return to Vice City with a modern open-world environment. Leaks suggest improved AI systems, more interactive NPCs, and a dynamic weather system. The storyline will reportedly feature dual protagonists, adding depth to gameplay. Rockstar is focusing heavily on realism and immersive storytelling. The game will likely launch first on next-gen consoles followed by a PC release. Fans are eagerly awaiting the official gameplay trailer. GTA 6 is expected to set new benchmarks for open-world gaming.",
        author: "Vikram Singh",
        readTime: "6 min",
        date: new Date('2025-02-20')
      },

      {
        title: "Rise of Mobile Gaming",
        category: "Esports",
        imageKey: "newsmobile",
        snippet: "Tier-2 cities dominating leaderboards.",
        content: "Mobile gaming in India has seen massive growth, especially in Tier-2 and Tier-3 cities. Affordable smartphones and better internet connectivity have contributed to this surge. Games like BGMI, Free Fire MAX, and Call of Duty Mobile are driving the ecosystem. Many esports players are emerging from smaller towns and gaining national recognition. Streaming platforms have also helped creators build large audiences. Brands are investing more in mobile esports tournaments and sponsorships. The accessibility of mobile gaming makes it a dominant force in India’s gaming industry. Experts predict continued exponential growth over the next few years.",
        author: "Priya Deshmukh",
        readTime: "7 min",
        date: new Date('2025-02-15')
      },

      {
        title: "NVIDIA RTX 5090 Leaked",
        category: "Hardware",
        imageKey: "newsrtx",
        snippet: "Next-gen GPU benchmarks leaked.",
        content: "Early leaks of NVIDIA's RTX 5090 suggest a major leap in GPU performance. The card is rumored to be based on the next-generation architecture with significantly higher CUDA core counts. Benchmarks indicate up to 70% better performance compared to the RTX 4090. Improved ray tracing and AI-driven DLSS technology are expected to enhance gaming visuals. Power efficiency has also reportedly improved despite higher performance output. The GPU is targeted at high-end gamers and content creators. Pricing is expected to be premium, reflecting its flagship status. Official announcements are expected later this year.",
        author: "Tech Desk",
        readTime: "5 min",
        date: new Date('2025-02-12')
      },

      {
        title: "Free Fire MAX OB45 Update",
        category: "Updates",
        imageKey: "newsff",
        snippet: "Garena introduces new abilities.",
        content: "Garena has launched the OB45 update for Free Fire MAX, introducing new characters and gameplay mechanics. Players can now explore enhanced abilities and improved weapon balancing. The update also includes visual improvements and smoother animations. New events and rewards have been added to boost player engagement. Developers have focused on improving ranked matchmaking and reducing latency issues. The update aims to keep the gameplay competitive and fresh. Community response has been positive, especially among casual players. Free Fire MAX continues to dominate the mobile battle royale segment.",
        author: "Sonia Gupta",
        readTime: "3 min",
        date: new Date('2025-02-10')
      },

      {
        title: "CS2 Major Prize Pool",
        category: "Esports",
        imageKey: "newscs2",
        snippet: "Valve increases stakes for CS2.",
        content: "Valve has announced an increased prize pool for upcoming Counter-Strike 2 Major tournaments. The move reflects the growing popularity of CS2 in the competitive scene. Teams from around the world are preparing for intense competition. The updated format ensures more opportunities for emerging teams. Viewership for CS2 events has steadily increased since its release. Valve is focusing on maintaining a balanced competitive environment. The new prize pool is expected to attract more organizations to invest in CS2 esports. This marks a significant step for the future of the franchise.",
        author: "Alex Turner",
        readTime: "4 min",
        date: new Date('2025-02-08')
      },

      {
        title: "Pokemon TCG Pocket Launch",
        category: "Mobile",
        imageKey: "newspokemon",
        snippet: "Digital card game is finally here.",
        content: "Pokemon TCG Pocket has officially launched, bringing the classic card game experience to mobile devices. The game offers simplified mechanics tailored for quick matches. Players can collect cards, build decks, and compete globally. The interface is designed to be beginner-friendly while maintaining strategic depth. Daily rewards and events encourage regular gameplay. The game has already gained popularity among casual and competitive players. Developers plan frequent updates to expand content. Pokemon TCG Pocket is expected to grow rapidly in the mobile gaming market.",
        author: "Jasmine Kaur",
        readTime: "5 min",
        date: new Date('2025-02-05')
      },

      {
        title: "Nintendo Switch 2 Backwards Compatible",
        category: "News",
        imageKey: "newsnintendo",
        snippet: "Switch successor plays your library.",
        content: "Nintendo has confirmed that its upcoming Switch successor will support backward compatibility. This allows players to carry forward their existing game library. The new console is expected to feature upgraded hardware and improved performance. Enhanced graphics and faster load times are also anticipated. Nintendo aims to retain its existing user base while attracting new players. Developers will be able to optimize games for better performance on the new system. The announcement has been well received by the gaming community. More details are expected in upcoming official reveals.",
        author: "Mike Haines",
        readTime: "4 min",
        date: new Date('2025-02-01')
      },

      {
        title: "Apex Legends Global Series",
        category: "Esports",
        imageKey: "newsapex",
        snippet: "ALGS season roadmap revealed.",
        content: "Respawn Entertainment has revealed the roadmap for the Apex Legends Global Series (ALGS). The new season introduces a revised format with multiple splits and international LAN events. Teams will compete for qualification points throughout the year. Prize pools have been increased to attract more competitive participation. The ALGS continues to grow as one of the top battle royale esports events. Viewer engagement has also improved with better broadcast quality. The roadmap provides a clear structure for teams and fans. Apex Legends remains a strong contender in the esports ecosystem.",
        author: "David Miller",
        readTime: "6 min",
        date: new Date('2025-01-28')
      }

    ];

    await Article.insertMany(articlesData);
    console.log('Articles seeded!');

    // 7. SEED COMMUNITY DATA
    console.log('Seeding Community Data...');

    const highlightsData = [
      { username: "Mortal_Infinity", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop", games: ["BGMI", "COD Mobile"], post: "Just finished a 20 kill chicken dinner in the scrims! The squad is ready for finals. 💪", likes: 2450, comments: 342, role: "Pro Player / Streamer", achievements: ["BGIS Winner", "10M+ Subs"], socialLinks: { youtube: "#", instagram: "#" } },
      { username: "Scout_Op", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop", games: ["BGMI", "Valorant"], post: "Transitioning to Valorant has been a journey. Grinding ranked tonight, join the stream!", likes: 1890, comments: 210, role: "Esports Athlete", achievements: ["PMCO Winner", "Top IGL"], socialLinks: { youtube: "#", instagram: "#" } },
      { username: "RakaZ_Gaming", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop", games: ["Free Fire MAX"], post: "Free Fire India Championship prep is intense. Here's a clip from today's practice lobby. 🔥", likes: 3200, comments: 540, role: "Content Creator", achievements: ["FFIC Finalist", "5M+ Subs"], socialLinks: { youtube: "#" } },
      { username: "SnaxGaming", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop", games: ["BGMI"], post: "Budget gaming PC build guide for 2025 is live! Check it out on the channel.", likes: 1500, comments: 120, role: "Tech & Gaming Creator", achievements: ["PC Build Expert", "1M+ Subs"], socialLinks: { youtube: "#" } },
      { username: "Lightning_Fast", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop", games: ["Valorant", "CS2"], post: "Radiant lobby highlights. Sometimes you just need to trust your aim. Watch the clutch!", likes: 980, comments: 85, role: "PC Gamer", achievements: ["Radiant Rank"], socialLinks: { twitch: "#" } }
    ];
    await Highlight.insertMany(highlightsData);

    const discussionsData = [
      { title: "Is BGMI 2.9 update meta changing?", game: "BGMI", author: "GamerX", comments: 234, likes: 89 },
      { title: "Best budget phones for COD Mobile 120fps?", game: "COD Mobile", author: "TechNoob", comments: 156, likes: 45 },
      { title: "Valorant: Crosshair placement guide", game: "Valorant", author: "ProAimer", comments: 450, likes: 210 },
      { title: "Finding a duo partner in India server", game: "General", author: "LonelyGamer", comments: 89, likes: 12 }
    ];
    await Discussion.insertMany(discussionsData);

    const communityEventsData = [
      {
        name: "Weekly BGMI Scrims",
        game: "BGMI",
        date: "Every Saturday",
        imageKey: "bgmi",
        link: "/tournaments"
      },
      {
        name: "Valorant 5-Stack Friday",
        game: "Valorant",
        date: "Fridays, 8 PM IST",
        imageKey: "valorant",
        link: "/tournaments"
      }
    ];
    await CommunityEvent.deleteMany({});
    await CommunityEvent.insertMany(communityEventsData);

    console.log('Community data seeded!');

    console.log('----------------------------------');
    console.log('✅ Database seeding complete!');
    console.log('----------------------------------');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();