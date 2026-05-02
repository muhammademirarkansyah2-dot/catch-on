// LinguaPath Mock Data
const COURSES = [
  { id: 1, title: "IELTS Academic", category: "IELTS", level: "Intermediate", price: 299000, rating: 4.8, students: 1240, modules: 24, duration: "12 weeks", image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=250&fit=crop", description: "Complete IELTS Academic preparation with practice tests, strategies, and score-boosting techniques.", instructor: "Dr. Sarah Mitchell" },
  { id: 2, title: "TOEFL iBT Mastery", category: "TOEFL", level: "Advanced", price: 349000, rating: 4.9, students: 980, modules: 30, duration: "16 weeks", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop", description: "Master all four TOEFL iBT sections with AI-powered feedback and full-length practice tests.", instructor: "Prof. James Chen" },
  { id: 3, title: "TOEFL ITP Prep", category: "TOEFL", level: "Beginner", price: 199000, rating: 4.7, students: 756, modules: 18, duration: "8 weeks", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop", description: "Focused TOEFL ITP preparation covering Listening, Structure, and Reading Comprehension.", instructor: "Ms. Linda Park" },
  { id: 4, title: "TOEP Intensive", category: "TOEP", level: "Intermediate", price: 249000, rating: 4.6, students: 542, modules: 20, duration: "10 weeks", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop", description: "Intensive TOEP preparation with grammar drills, reading exercises, and listening practice.", instructor: "Mr. Andi Wijaya" },
  { id: 5, title: "IELTS General Training", category: "IELTS", level: "Beginner", price: 279000, rating: 4.8, students: 890, modules: 22, duration: "10 weeks", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop", description: "Prepare for IELTS General Training with real-world English skills for work and migration.", instructor: "Dr. Emily Watson" },
  { id: 6, title: "English Grammar Pro", category: "General", level: "All Levels", price: 149000, rating: 4.5, students: 2100, modules: 15, duration: "6 weeks", image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=250&fit=crop", description: "Build a solid grammar foundation from basics to advanced structures.", instructor: "Ms. Rachel Kim" }
];

const PACKAGES = [
  { name: "Starter", price: 149000, duration: "1 Month", features: ["1 Course Access", "Basic Quiz Bank", "Progress Tracking", "Email Support"], popular: false },
  { name: "Professional", price: 399000, duration: "3 Months", features: ["All Courses Access", "Full Quiz Engine", "XP & Gamification", "Certificate", "Priority Support", "Daily Challenges"], popular: true },
  { name: "Premium", price: 699000, duration: "6 Months", features: ["Everything in Pro", "1-on-1 Mentoring", "AI Writing Feedback", "Exam Simulation", "Streak Freeze (4x)", "Lifetime Badge"], popular: false }
];

const QUESTIONS = [
  { id: 1, type: "mc", quiz: "IELTS Reading", text: "According to the passage, what is the primary cause of urban heat islands?", options: ["Deforestation", "Concrete and asphalt surfaces", "Industrial emissions", "Vehicle exhaust"], correct: 1, explanation: "Urban heat islands are primarily caused by concrete and asphalt surfaces that absorb and retain heat." },
  { id: 2, type: "mc", quiz: "IELTS Reading", text: "The word 'ubiquitous' in paragraph 3 is closest in meaning to:", options: ["Rare", "Expensive", "Everywhere", "Dangerous"], correct: 2, explanation: "'Ubiquitous' means present, appearing, or found everywhere." },
  { id: 3, type: "tf", quiz: "IELTS Reading", text: "The researcher concluded that renewable energy alone can solve climate change.", options: ["True", "False", "Not Given"], correct: 2, explanation: "The passage states renewable energy is 'one part of a larger solution,' not a sole solution." },
  { id: 4, type: "mc", quiz: "TOEFL Structure", text: "_____ the rain, the outdoor event was cancelled.", options: ["Because", "Due to", "Since", "Although"], correct: 1, explanation: "'Due to' is followed by a noun phrase. 'Because' and 'Since' require a clause." },
  { id: 5, type: "fill", quiz: "TOEFL Structure", text: "She has been studying English _____ three years.", answer: "for", explanation: "'For' is used with a duration of time (three years). 'Since' is used with a point in time." },
  { id: 6, type: "mc", quiz: "TOEFL Reading", text: "What does the author imply about early human migration?", options: ["It was driven by climate change", "It occurred randomly", "It followed trade routes", "It was limited to coastal areas"], correct: 0, explanation: "The passage implies climate change as the primary driver of early migration patterns." },
  { id: 7, type: "tf", quiz: "IELTS Listening", text: "The speaker mentions that the library is open on weekends.", options: ["True", "False", "Not Given"], correct: 0, explanation: "The speaker clearly states 'We are also open on Saturdays and Sundays.'" },
  { id: 8, type: "mc", quiz: "TOEP Grammar", text: "If I _____ enough money, I would travel the world.", options: ["have", "had", "having", "has"], correct: 1, explanation: "Second conditional uses 'if + past simple' for hypothetical present situations." },
  { id: 9, type: "fill", quiz: "TOEP Grammar", text: "The book _____ by millions of people worldwide.", answer: "is read", explanation: "Passive voice: 'is + past participle' for present simple passive." },
  { id: 10, type: "mc", quiz: "TOEFL Listening", text: "What is the professor's main point about photosynthesis?", options: ["It only occurs in sunlight", "It is a two-stage process", "It requires carbon dioxide only", "It produces oxygen as waste"], correct: 1, explanation: "The professor emphasizes that photosynthesis involves two stages: light reactions and the Calvin cycle." }
];

const BADGES = [
  { id: 1, name: "First Steps", icon: "🎯", description: "Complete your first quiz", condition: "quiz_count >= 1", earned: true },
  { id: 2, name: "Week Warrior", icon: "🔥", description: "Maintain a 7-day streak", condition: "streak >= 7", earned: true },
  { id: 3, name: "Perfect Score", icon: "💯", description: "Score 100% on any quiz", condition: "perfect_quiz >= 1", earned: true },
  { id: 4, name: "Knowledge Seeker", icon: "📚", description: "Complete 10 quizzes", condition: "quiz_count >= 10", earned: false },
  { id: 5, name: "IELTS Explorer", icon: "🌍", description: "Complete all IELTS modules", condition: "ielts_complete", earned: false },
  { id: 6, name: "Speed Demon", icon: "⚡", description: "Finish a quiz in under 2 minutes", condition: "fast_quiz", earned: true },
  { id: 7, name: "Streak Master", icon: "🏆", description: "Maintain a 30-day streak", condition: "streak >= 30", earned: false },
  { id: 8, name: "Vocabulary King", icon: "👑", description: "Learn 500 new words", condition: "words >= 500", earned: false },
  { id: 9, name: "Night Owl", icon: "🦉", description: "Study after midnight", condition: "night_study", earned: true },
  { id: 10, name: "Social Learner", icon: "🤝", description: "Join a study group", condition: "group_joined", earned: false },
  { id: 11, name: "Rising Star", icon: "⭐", description: "Reach Level 10", condition: "level >= 10", earned: false },
  { id: 12, name: "TOEFL Titan", icon: "🎓", description: "Score 90+ on TOEFL simulation", condition: "toefl_score >= 90", earned: false }
];

const LEADERBOARD = [
  { rank: 1, name: "Alex Johnson", avatar: "AJ", xp: 12450, level: 23, program: "IELTS", streak: 45 },
  { rank: 2, name: "Maria Santos", avatar: "MS", xp: 11200, level: 21, program: "TOEFL iBT", streak: 38 },
  { rank: 3, name: "Yuki Tanaka", avatar: "YT", xp: 10800, level: 20, program: "IELTS", streak: 42 },
  { rank: 4, name: "Ravi Patel", avatar: "RP", xp: 9650, level: 18, program: "TOEP", streak: 25 },
  { rank: 5, name: "Sophie Chen", avatar: "SC", xp: 8900, level: 17, program: "TOEFL iBT", streak: 30 },
  { rank: 6, name: "Omar Hassan", avatar: "OH", xp: 8200, level: 16, program: "TOEFL ITP", streak: 22 },
  { rank: 7, name: "Emma Wilson", avatar: "EW", xp: 7500, level: 15, program: "IELTS", streak: 19 },
  { rank: 8, name: "Lucas Silva", avatar: "LS", xp: 6800, level: 14, program: "TOEP", streak: 15 },
  { rank: 9, name: "Aisha Khan", avatar: "AK", xp: 6100, level: 13, program: "TOEFL iBT", streak: 28 },
  { rank: 10, name: "Daniel Park", avatar: "DP", xp: 5400, level: 12, program: "IELTS", streak: 12 }
];

const TESTIMONIALS = [
  { name: "Rina Susanti", score: "IELTS 7.5", text: "LinguaPath's gamification kept me motivated every single day. The streak system and XP rewards made studying addictive!", avatar: "RS" },
  { name: "Kevin Hartono", score: "TOEFL 105", text: "The quiz engine is incredibly realistic. The timer and full simulation mode prepared me perfectly for test day.", avatar: "KH" },
  { name: "Priya Sharma", score: "IELTS 8.0", text: "Best platform for IELTS prep. The daily challenges and leaderboard pushed me to study consistently.", avatar: "PS" }
];

const USER_PROFILE = {
  name: "Student User", email: "student@linguapath.com", level: 8, xp: 2450, xpToNext: 800,
  streak: 12, longestStreak: 18, quizzesCompleted: 34, coursesEnrolled: 2,
  avgScore: 78, totalStudyHours: 45,
  skills: { reading: 82, listening: 68, writing: 55, grammar: 75, vocabulary: 70 },
  weeklyXP: [120, 200, 180, 250, 300, 150, 280],
  recentActivity: [
    { action: "Completed Quiz", detail: "IELTS Reading Practice #5", xp: 80, time: "2 hours ago" },
    { action: "Earned Badge", detail: "Speed Demon ⚡", xp: 50, time: "3 hours ago" },
    { action: "Streak Extended", detail: "12-day streak! 🔥", xp: 20, time: "Today" },
    { action: "Level Up!", detail: "Reached Level 8", xp: 100, time: "Yesterday" },
    { action: "Completed Quiz", detail: "TOEFL Structure #3", xp: 65, time: "Yesterday" }
  ]
};
