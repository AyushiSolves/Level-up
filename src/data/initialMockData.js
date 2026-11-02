export const INITIAL_PLAYER = {
  level: 24,
  currentXP: 2450,
  maxXP: 2600,
  title: "Dreamer",
  streak: 14,
  weeklyXP: 1250,
  totalQuestsCompleted: 68,
  // 5 Major Core RPG Character Attributes
  attributes: {
    intelligence: {
      name: "Intelligence",
      level: 9,
      current: 450,
      max: 500,
      icon: "Brain",
      color: "cyan",
      description: "Improves from studying, coding, and continuous learning."
    },
    discipline: {
      name: "Discipline",
      level: 8,
      current: 410,
      max: 500,
      icon: "ShieldCheck",
      color: "amber",
      description: "Improves from consistency and completing difficult quests."
    },
    strength: {
      name: "Strength",
      level: 6,
      current: 290,
      max: 500,
      icon: "Dumbbell",
      color: "emerald",
      description: "Improves from exercise, workouts, and physical activities."
    },
    creativity: {
      name: "Creativity",
      level: 5,
      current: 240,
      max: 500,
      icon: "Palette",
      color: "purple",
      description: "Improves from designing, creating, and experimenting."
    },
    communication: {
      name: "Communication",
      level: 5,
      current: 220,
      max: 500,
      icon: "MessageSquare",
      color: "rose",
      description: "Improves from presentations, networking, and articulation."
    }
  },
  equipped: {
    outfit: "outfit-casual",
    accessory: "acc-backpack",
    pet: "pet-cybercat",
    background: "bg-loft",
    title: "Focused Learner"
  }
};

// Energy-Adaptive Quests (dynamically modifies based on energy mode)
export const INITIAL_QUESTS = [
  {
    id: "q-1",
    name: "Complete 2 Python problems",
    category: "Coding",
    icon: "Code2",
    progress: "0/2",
    variants: {
      low: {
        title: "Complete 1 Python problem (Micro)",
        description: "Revise 1 core Python concept or solve 1 micro-problem (5m)",
        xp: 40,
        attributes: { intelligence: 6, discipline: 3 },
        skillBonus: "Python Basics +3%",
        requiresProof: false
      },
      balanced: {
        title: "Complete 2 Python problems",
        description: "Practice Python syntax and solve 2 array/string problems",
        xp: 100,
        attributes: { intelligence: 15, discipline: 8 },
        skillBonus: "Data Structures +5%",
        requiresProof: true
      },
      high: {
        title: "Solve 4 Python Problems (Sprint)",
        description: "Solve 4 intermediate problems + write a modular utility script (45m)",
        xp: 140,
        attributes: { intelligence: 25, discipline: 14 },
        skillBonus: "Algorithms +8%",
        requiresProof: true
      }
    },
    completed: false
  },
  {
    id: "q-2",
    name: "Work out for 15 mins",
    category: "Fitness",
    icon: "Dumbbell",
    progress: "0/15",
    variants: {
      low: {
        title: "Gentle Mobility & Stretching (5m)",
        description: "Perform 5 minutes of mindful posture alignment and joint mobility",
        xp: 30,
        attributes: { strength: 6, discipline: 4 },
        skillBonus: "Flexibility +3%",
        requiresProof: false
      },
      balanced: {
        title: "Work out for 15 mins",
        description: "Execute a focused 15-minute bodyweight or weight training session",
        xp: 80,
        attributes: { strength: 16, discipline: 8 },
        skillBonus: "Strength +5%",
        requiresProof: false
      },
      high: {
        title: "High-Intensity Power Circuit (30m)",
        description: "Complete a 30-minute intense strength circuit or 5km tempo run",
        xp: 120,
        attributes: { strength: 24, discipline: 15 },
        skillBonus: "Endurance +8%",
        requiresProof: false
      }
    },
    completed: false
  },
  {
    id: "q-3",
    name: "Read 1 tech article",
    category: "Knowledge",
    icon: "BookOpen",
    progress: "0/1",
    variants: {
      low: {
        title: "Read 1 tech snippet (5m)",
        description: "Read 1 short tech summary or documentation snippet",
        xp: 25,
        attributes: { intelligence: 6, discipline: 3 },
        skillBonus: "Speed Reading +2%",
        requiresProof: false
      },
      balanced: {
        title: "Read 1 tech article",
        description: "Read 1 deep-dive technical article or architecture paper",
        xp: 60,
        attributes: { intelligence: 12, discipline: 6 },
        skillBonus: "Critical Note-Taking +5%",
        requiresProof: true
      },
      high: {
        title: "Syntopical Research Sprint (40m)",
        description: "Read 40 pages across 2 references and write a condensed summary memo",
        xp: 95,
        attributes: { intelligence: 20, discipline: 10 },
        skillBonus: "Mental Models +8%",
        requiresProof: true
      }
    },
    completed: false
  },
  {
    id: "q-4",
    name: "Mindful Meditation",
    category: "Discipline",
    icon: "Sparkles",
    variants: {
      low: {
        title: "3-Minute Resonant Breath",
        description: "Practice box-breathing to reset autonomic nervous system (3m)",
        xp: 15,
        attributes: { discipline: 5, creativity: 3 },
        skillBonus: "Mindfulness +2%",
        requiresProof: false
      },
      balanced: {
        title: "10-Minute Zen Meditation",
        description: "Execute 10 minutes of stillness and focused awareness meditation",
        xp: 25,
        attributes: { discipline: 8, creativity: 5 },
        skillBonus: "Momentum Spark +4%",
        requiresProof: false
      },
      high: {
        title: "20-Minute Deep Vipassana",
        description: "Complete 20 minutes of silent sensory awareness & mental reset",
        xp: 45,
        attributes: { discipline: 15, creativity: 8 },
        skillBonus: "Stoic Will +7%",
        requiresProof: false
      }
    },
    completed: false
  },
  {
    id: "q-5",
    name: "Deep Focus Mastery",
    category: "Discipline",
    icon: "Target",
    variants: {
      low: {
        title: "15-Minute Micro-Focus",
        description: "Clear all tabs and execute 15 minutes on a single priority task",
        xp: 25,
        attributes: { discipline: 7, intelligence: 3 },
        skillBonus: "Flow States +3%",
        requiresProof: false
      },
      balanced: {
        title: "45-Minute Focus Block",
        description: "Execute 45 minutes of uninterrupted, distraction-free deep work",
        xp: 55,
        attributes: { discipline: 14, intelligence: 6 },
        skillBonus: "Flow States +6%",
        requiresProof: false
      },
      high: {
        title: "90-Minute Apex Flow Session",
        description: "Execute a full ultradian 90-minute immersion on your highest-leverage goal",
        xp: 85,
        attributes: { discipline: 24, intelligence: 10 },
        skillBonus: "Flow States +10%",
        requiresProof: false
      }
    },
    completed: false
  }
];

// Hierarchical Skill Trees
export const HIERARCHICAL_SKILL_TREES = [
  {
    id: "tree-programming",
    name: "Programming & Systems",
    icon: "Code2",
    category: "Coding",
    color: "cyan",
    attributeAffinity: "Intelligence",
    description: "Mastery of software architecture, algorithmic logic, and artificial intelligence.",
    nodes: [
      {
        id: "prog-node-1",
        title: "Python Syntax & Basics",
        level: "Mastered",
        percentage: 100,
        description: "Variables, control flow, functions, and standard libraries.",
        status: "mastered",
        bonus: "+15 Max Intelligence",
        tier: 1
      },
      {
        id: "prog-node-2",
        title: "Data Structures & Complexity",
        level: "In Progress",
        percentage: 65,
        description: "Arrays, hash tables, linked lists, and Big-O runtime analysis.",
        status: "active",
        bonus: "+20 Max Intelligence",
        tier: 2
      },
      {
        id: "prog-node-3",
        title: "Algorithms & Problem Solving",
        level: "Unlocked",
        percentage: 20,
        description: "Recursion, dynamic programming, and graph traversal.",
        status: "unlocked",
        bonus: "+25 Max Intelligence",
        tier: 3
      },
      {
        id: "prog-node-4",
        title: "Applied AI & Machine Learning",
        level: "Locked (Requires Tier 3 Mastery)",
        percentage: 0,
        description: "Neural architectures, embeddings, and prompt orchestration.",
        status: "locked",
        bonus: "+35 Max Intelligence & Title 'Cyber Wizard'",
        tier: 4
      }
    ]
  },
  {
    id: "tree-fitness",
    name: "Physical Vitality & Power",
    icon: "Dumbbell",
    category: "Fitness",
    color: "emerald",
    attributeAffinity: "Strength",
    description: "Physical stamina, muscular strength, and endurance conditioning.",
    nodes: [
      {
        id: "fit-node-1",
        title: "Daily Habit Consistency",
        level: "Mastered",
        percentage: 100,
        description: "Daily movement protocol and circadian rhythm synchronization.",
        status: "mastered",
        bonus: "+10 Max Strength, +10 Discipline",
        tier: 1
      },
      {
        id: "fit-node-2",
        title: "Progressive Overload Strength",
        level: "In Progress",
        percentage: 55,
        description: "Compound lifts, calisthenics progressions, and core bracing.",
        status: "active",
        bonus: "+20 Max Strength",
        tier: 2
      },
      {
        id: "fit-node-3",
        title: "Aerobic Engine & Endurance",
        level: "Unlocked",
        percentage: 30,
        description: "Zone-2 cardio baselines and VO2 max conditioning intervals.",
        status: "unlocked",
        bonus: "+25 Max Strength",
        tier: 3
      },
      {
        id: "fit-node-4",
        title: "Apex Mobility & Joint Armor",
        level: "Locked (Requires Tier 3 Mastery)",
        percentage: 0,
        description: "Full-range connective tissue resilience and athletic flexibility.",
        status: "locked",
        bonus: "+30 Max Strength & Title 'Titan'",
        tier: 4
      }
    ]
  },
  {
    id: "tree-knowledge",
    name: "Knowledge & Cognitive Synthesis",
    icon: "BookOpen",
    category: "Knowledge",
    color: "purple",
    attributeAffinity: "Intelligence",
    description: "Deep reading, mental models, memory retention, and information architecture.",
    nodes: [
      {
        id: "know-node-1",
        title: "Active Reading & Note-Taking",
        level: "Mastered",
        percentage: 100,
        description: "Marginalia, Zettelkasten concepts, and key takeaway distillation.",
        status: "mastered",
        bonus: "+15 Max Intelligence",
        tier: 1
      },
      {
        id: "know-node-2",
        title: "Speed Reading & Information Flow",
        level: "In Progress",
        percentage: 70,
        description: "Chunking, vocalization suppression, and analytical skimming.",
        status: "active",
        bonus: "+20 Max Intelligence",
        tier: 2
      },
      {
        id: "know-node-3",
        title: "Mental Models & Systems Thinking",
        level: "Unlocked",
        percentage: 25,
        description: "First-principles deduction, feedback loops, and probabilistic thinking.",
        status: "unlocked",
        bonus: "+25 Max Intelligence",
        tier: 3
      },
      {
        id: "know-node-4",
        title: "Original Synthesis & Research",
        level: "Locked (Requires Tier 3 Mastery)",
        percentage: 0,
        description: "Cross-disciplinary integration and long-form thesis formulation.",
        status: "locked",
        bonus: "+35 Max Intelligence & Title 'Polymath'",
        tier: 4
      }
    ]
  },
  {
    id: "tree-discipline",
    name: "Discipline & Willpower Fortitude",
    icon: "ShieldCheck",
    category: "Discipline",
    color: "amber",
    attributeAffinity: "Discipline",
    description: "Impulse resistance, deep focus immersion, and stoic habit mastery.",
    nodes: [
      {
        id: "disc-node-1",
        title: "Morning Routine Architecture",
        level: "Mastered",
        percentage: 100,
        description: "Frictionless morning setup with zero early digital dopamine distraction.",
        status: "mastered",
        bonus: "+15 Max Discipline",
        tier: 1
      },
      {
        id: "disc-node-2",
        title: "2-Minute Friction Crusher",
        level: "In Progress",
        percentage: 85,
        description: "Immediate activation protocol to crush task-initiation procrastination.",
        status: "active",
        bonus: "+20 Max Discipline",
        tier: 2
      },
      {
        id: "disc-node-3",
        title: "Deep Work Flow Immersion",
        level: "Unlocked",
        percentage: 40,
        description: "Sustained 60+ minute uninterrupted cognitive immersion blocks.",
        status: "unlocked",
        bonus: "+25 Max Discipline",
        tier: 3
      },
      {
        id: "disc-node-4",
        title: "Dopamine Fasting & Stoic Will",
        level: "Locked (Requires Tier 3 Mastery)",
        percentage: 0,
        description: "Complete autonomy over impulses and hyper-stimulating distractions.",
        status: "locked",
        bonus: "+35 Max Discipline & Title 'Unshakable'",
        tier: 4
      }
    ]
  }
];

// World Room Evolution Stations & Multi-Tier Data
export const WORLD_STATIONS = [
  {
    id: "station-dev",
    name: "Cyber Dev Station",
    category: "Coding",
    currentTier: 2,
    tiers: [
      {
        tier: 1,
        title: "Basic Laptop Console",
        description: "A single laptop on a minimalist desk. Functional, but basic.",
        unlockCriteria: "Level 1 Starter",
        unlocked: true,
        aesthetic: "Compact grey laptop with subtle blue display."
      },
      {
        tier: 2,
        title: "Dual Neon Ultrawide Monitors",
        description: "Curved 4K displays with glowing cyan backlighting and high-speed terminal compiler.",
        unlockCriteria: "Intelligence Level 8 & 60% Programming Tree",
        unlocked: true,
        aesthetic: "Dual glowing neon screens with active scrolling code lines."
      },
      {
        tier: 3,
        title: "Quantum Neural Battlestation",
        description: "Floating holographic heads-up displays, liquid nitrogen cooling loop, and AI neural link.",
        unlockCriteria: "Reach Level 25 & 80% Programming Tree",
        unlocked: false,
        aesthetic: "Floating holographic arrays with reactive energy filaments."
      }
    ]
  },
  {
    id: "station-study",
    name: "Study Archives",
    category: "Knowledge",
    currentTier: 2,
    tiers: [
      {
        tier: 1,
        title: "Wooden Study Shelf",
        description: "A small stack of textbooks and paper notebooks.",
        unlockCriteria: "Level 1 Starter",
        unlocked: true,
        aesthetic: "Classic book stack with warm ambient study lamp."
      },
      {
        tier: 2,
        title: "Digital Library Archives",
        description: "Organized glass shelves with digital tablet codexes and illuminated indexing.",
        unlockCriteria: "Intelligence Level 7 & 60% Knowledge Tree",
        unlocked: true,
        aesthetic: "Glowing purple shelves with categorized digital manuscripts."
      },
      {
        tier: 3,
        title: "Holographic Hyper-Codex Library",
        description: "Infinite holographic archive projecting floating knowledge nodes and research trees.",
        unlockCriteria: "Reach Level 25 & 80% Knowledge Tree",
        unlocked: false,
        aesthetic: "Geometric holographic star charts of synthesized concepts."
      }
    ]
  },
  {
    id: "station-plant",
    name: "Bioluminescent Flora",
    category: "Discipline",
    currentTier: 2,
    tiers: [
      {
        tier: 1,
        title: "Green Seedling Sprout",
        description: "A small potted sprout needing regular attention and daily streak care.",
        unlockCriteria: "Streak < 7 Days",
        unlocked: true,
        aesthetic: "Delicate green leaves emerging from dark soil."
      },
      {
        tier: 2,
        title: "Pulsing Cyan Bush",
        description: "Thriving digital flora radiating soft bioluminescent cyan light tied to your 14-day streak.",
        unlockCriteria: "Discipline Level 7 & 10+ Day Streak",
        unlocked: true,
        aesthetic: "Bioluminescent foliage with glowing breathing rhythm."
      },
      {
        tier: 3,
        title: "Ancient Astral Tree of Will",
        description: "A majestic crystalline tree shedding luminous spores into the room, reflecting unshakeable focus.",
        unlockCriteria: "Discipline Level 9 & 30-Day Streak",
        unlocked: false,
        aesthetic: "Towering crystal branches emitting shimmering floating motes."
      }
    ]
  },
  {
    id: "station-fitness",
    name: "Training Rig Station",
    category: "Fitness",
    currentTier: 2,
    tiers: [
      {
        tier: 1,
        title: "Iron Dumbbell Rack",
        description: "Basic free weights and yoga mat for essential movement.",
        unlockCriteria: "Level 1 Starter",
        unlocked: true,
        aesthetic: "Cast iron weights on black rubber mat."
      },
      {
        tier: 2,
        title: "Smart Resistance Rig",
        description: "Biometric resistance cables with kinetic velocity counters and amber feedback lights.",
        unlockCriteria: "Strength Level 6 & 50% Fitness Tree",
        unlocked: true,
        aesthetic: "Sleek magnetic resistance pulley with glowing metric HUD."
      },
      {
        tier: 3,
        title: "Apex Kinetic Gravity Capsule",
        description: "Zero-gravity training chamber for peak neuromuscular conditioning and recovery.",
        unlockCriteria: "Strength Level 8 & 80% Fitness Tree",
        unlocked: false,
        aesthetic: "Floating kinetic ring with energy force-field."
      }
    ]
  }
];

export const INITIAL_INVENTORY = [
  {
    id: "outfit-explorer",
    name: "Explorer Jacket",
    category: "Outfits",
    levelRequired: 25,
    unlocked: false,
    equipped: false,
    rarity: "Epic",
    imageStyle: "from-cyan-500/20 to-blue-600/30 border-cyan-500/50",
    description: "Futuristic weather-proof jacket designed for digital pioneers. Unlocked upon reaching Level 25."
  },
  {
    id: "outfit-casual",
    name: "Student Futuristic Hoodie",
    category: "Outfits",
    levelRequired: 1,
    unlocked: true,
    equipped: true,
    rarity: "Common",
    imageStyle: "from-slate-700/30 to-slate-800/40 border-slate-600/50",
    description: "Sleek dark hoodie with integrated glowing LED trim."
  },
  {
    id: "outfit-cyberhoodie",
    name: "Cyber Alchemist Hoodie",
    category: "Outfits",
    levelRequired: 30,
    unlocked: false,
    equipped: false,
    rarity: "Legendary",
    imageStyle: "from-purple-600/20 to-pink-600/30 border-purple-500/50",
    description: "Infused with reactive light filaments that respond to focus."
  },
  {
    id: "acc-backpack",
    name: "Tactical Tech Backpack",
    category: "Accessories",
    levelRequired: 1,
    unlocked: true,
    equipped: true,
    rarity: "Common",
    imageStyle: "from-blue-600/20 to-slate-800/40 border-blue-500/40",
    description: "Holds all essential portable dev equipment."
  },
  {
    id: "acc-glasses",
    name: "AR HUD Visor",
    category: "Accessories",
    levelRequired: 20,
    unlocked: true,
    equipped: false,
    rarity: "Rare",
    imageStyle: "from-cyan-400/20 to-cyan-600/30 border-cyan-400/50",
    description: "Displays real-time ambient stats and quest markers."
  },
  {
    id: "acc-vr",
    name: "Neural Sync Goggles",
    category: "Accessories",
    levelRequired: 28,
    unlocked: false,
    equipped: false,
    rarity: "Epic",
    imageStyle: "from-amber-500/20 to-red-600/30 border-amber-500/50",
    description: "Direct brain-computer interface for deep work flow."
  },
  {
    id: "pet-cybercat",
    name: "Neon Companion Cat",
    category: "Pets",
    levelRequired: 1,
    unlocked: true,
    equipped: true,
    rarity: "Rare",
    imageStyle: "from-violet-500/20 to-indigo-600/30 border-violet-400/50",
    description: "Loyal synthetic feline companion that purrs when quests finish."
  },
  {
    id: "pet-drone",
    name: "Aero Scout Drone",
    category: "Pets",
    levelRequired: 35,
    unlocked: false,
    equipped: false,
    rarity: "Legendary",
    imageStyle: "from-cyan-500/20 to-emerald-600/30 border-cyan-400/50",
    description: "Hovers silently overhead, scanning for upcoming quest opportunities."
  },
  {
    id: "bg-loft",
    name: "Cyber Study Loft",
    category: "Backgrounds",
    levelRequired: 1,
    unlocked: true,
    equipped: true,
    rarity: "Common",
    imageStyle: "from-slate-900 to-slate-950 border-slate-700",
    description: "Cozy modern apartment overlooking a glowing futuristic city."
  },
  {
    id: "bg-sanctuary",
    name: "Neon Zen Garden",
    category: "Backgrounds",
    levelRequired: 30,
    unlocked: false,
    equipped: false,
    rarity: "Epic",
    imageStyle: "from-emerald-950 to-teal-950 border-emerald-500/50",
    description: "Peaceful digital sanctuary featuring bioluminescent flora."
  }
];

export const INITIAL_ACHIEVEMENTS = [
  {
    id: "ach-1",
    name: "First Steps",
    description: "Complete your first real-world quest in LEVEL UP",
    icon: "Trophy",
    rewardXP: 100,
    unlocked: true,
    progress: "1/1",
    category: "Beginner",
    criteria: "Complete 1 quest"
  },
  {
    id: "ach-2",
    name: "Code Apprentice",
    description: "Complete 10 programming and computer science quests",
    icon: "Code2",
    rewardXP: 300,
    unlocked: true,
    progress: "10/10",
    category: "Coding",
    criteria: "10 Coding quests verified"
  },
  {
    id: "ach-3",
    name: "Iron Discipline",
    description: "Maintain a 7-day consistency streak without skipping",
    icon: "Flame",
    rewardXP: 250,
    unlocked: true,
    progress: "14/7",
    category: "Discipline",
    criteria: "7-day active streak"
  },
  {
    id: "ach-4",
    name: "Knowledge Seeker",
    description: "Develop 3 different skill trees beyond Tier 2",
    icon: "Brain",
    rewardXP: 450,
    unlocked: true,
    progress: "3/3 Trees",
    category: "Knowledge",
    criteria: "3 Skill Trees advanced"
  },
  {
    id: "ach-5",
    name: "Ascendant Builder (Level 25)",
    description: "Reach Level 25 and unlock the Focused Builder title + Explorer Jacket",
    icon: "Zap",
    rewardXP: 500,
    unlocked: false,
    progress: "Level 24/25",
    category: "Milestone",
    criteria: "Reach Player Level 25"
  }
];

// Context-Aware Stage 1 & 2 Prompts
export const AI_COACH_PROMPTS = [
  {
    id: "prompt-focus",
    question: "What should I focus on today?",
    category: "recommendation"
  },
  {
    id: "prompt-balance",
    question: "Analyze my 5 Character Attributes",
    category: "analysis"
  },
  {
    id: "prompt-breakdown",
    question: "Break down a big goal into 3 micro-steps",
    category: "friction"
  },
  {
    id: "prompt-energy",
    question: "Explain my current Energy Mode impact",
    category: "energy"
  }
];
