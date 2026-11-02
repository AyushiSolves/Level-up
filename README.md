# LEVEL UP

### AI-Powered Personal Growth & Gamified Life Management System

LEVEL UP is a web-based personal growth application that uses RPG-inspired elements to make everyday goals more engaging.

The idea is simple: instead of treating personal development as a list of tasks, users can approach it as a progression journey. Completing real-life activities earns experience points (XP), improves character attributes, advances skills and unlocks achievements.

## About the Project

LEVEL UP brings together task management and role-playing game mechanics in one application.

Users can create quests around different areas of their lives, such as studying, coding, fitness and creativity. As they complete these quests, their in-game character progresses alongside their real-world efforts.

The application also includes an interactive virtual environment and a companion character called Nova.

## Features

* **Quest Management:** Create, view and complete personal quests.
* **XP & Level System:** Earn experience points and progress through levels.
* **Character Attributes:** Develop Intelligence, Discipline, Strength, Creativity and Communication.
* **Skill Trees:** Track progress across different areas of personal development.
* **Energy Modes:** Choose between Low, Balanced and High Sprint modes depending on your available energy.
* **Personal Sanctuary:** Explore a virtual environment with different growth-oriented locations.
* **Nova Companion:** Get guidance, task suggestions and progress-related feedback.
* **Inventory:** View and equip unlocked items.
* **Achievements:** Track milestones and completed challenges.
* **Analytics:** Review personal progress and activity.

## Technology Stack

| Technology    | Purpose                           |
| ------------- | --------------------------------- |
| React         | Frontend development              |
| Vite          | Development server and build tool |
| JavaScript    | Application logic                 |
| Tailwind CSS  | Styling and responsive layouts    |
| Framer Motion | Animations and transitions        |
| Lucide React  | Icons                             |
| Web Audio API | Sound effects                     |

## Project Structure

```text
level-up/
│
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── pages/
│   ├── styles/
│   └── utils/
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Getting Started

Follow these steps to run the project on your local machine.

### Prerequisites

* Node.js
* npm
* Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/AyushiSolves/Level-up.git
```

**2. Navigate to the project directory**

```bash
cd Level-up
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## Current Development Status

The current version focuses on the frontend experience and core game progression mechanics.

The application uses client-side state and initial sample data. Progress is not yet connected to a persistent database, so it may reset when the page is refreshed.

Nova currently uses predefined, rule-based responses rather than a connected external AI model.

Backend integration, database storage and live AI capabilities are planned for future development.

## Future Improvements

* Backend development using Python and FastAPI.
* MySQL database integration for persistent user data.
* User authentication and individual profiles.
* Integration of an external AI model for more adaptive assistance.
* Improved progress tracking and personalised recommendations.
* Cloud deployment.

## Project Philosophy

The purpose of LEVEL UP is to make personal growth feel like a journey rather than a checklist.

**You are not playing a character who levels up. You are the character who levels up.**

---

**Developed by:** Ayushi Solves
**Project:** LEVEL UP
**Category:** Personal Development / Gamification / Web Application
