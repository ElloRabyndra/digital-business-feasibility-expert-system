# Digital Business Feasibility Expert System

A web-based expert system for evaluating the feasibility of digital business ideas at the pre-implementation stage. The system uses **Forward Chaining (data-driven reasoning)** with IF-THEN rules derived from domain experts. Built with React and Tailwind CSS, featuring a modern **conversational chatbot-style interface**.

---

## Overview

This system is designed to help **students** and **aspiring technopreneurs** evaluate whether their digital business ideas are feasible for development. Instead of a traditional form, the system guides users through a **guided conversational flow** — asking one question at a time, simulating an interactive assistant experience.

### Approach

- **Rule-Based Expert System**: All decisions are made based on IF-THEN rules defined by domain experts — no machine learning or statistical computation is involved.
- **Forward Chaining (Data-Driven)**: All facts (user inputs) are collected through a conversational UI, then processed in a bottom-up manner (attributes → aspects → final decision).
- The system **does not use** backward chaining, certainty factor, or machine learning.

### Decision Targets

The system produces a feasibility verdict in one of three categories:

| Category | Description |
|---|---|
| **Layak** (Feasible) | The business idea is ready to proceed to the next stage |
| **Cukup Layak** (Moderately Feasible) | There is potential, but certain aspects need improvement |
| **Tidak Layak** (Not Feasible) | Not ready for development; requires thorough re-evaluation |

---

## Key Features

### Forward Chaining Engine
- Two-phase evaluation: attributes → aspects (intermediate), then aspects → final decision
- 26 IF-THEN rules encoded as declarative data (not hardcoded logic)
- Working memory to store facts and inference results
- Inference trace (reasoning log) showing full transparency of which rules fired

### Conversational UI
- **One question at a time** — no form dump, guided step by step
- **Typing indicator** (animated bouncing dots) before each question appears, simulating a real assistant
- **Chat history** — answered questions scroll up as context, new question appears below
- **Selectable option buttons** — no text input, all answers are predefined choices
- **Auto-scroll** — page automatically scrolls to follow the latest question
- **Floating Home button** — fixed bottom-right circle button to return to the landing page at any time

### 3D Mascot Assistant
- A 3D robot mascot (`/public/mascot.png`) appears throughout the conversation
- Mascot is displayed next to each question bubble, sized to be a prominent UI element — not an icon
- Mascot fades slightly for past (answered) questions, full opacity for the active question
- Floating animation on the hero page

### Progress Indicator
- Step pills showing 4 evaluation aspects (Ide & Masalah, Pasar & Kompetitor, Tim & Sumber Daya, Model Bisnis)
- Current question counter (e.g., "Pertanyaan 3 dari 10")
- Hidden on mobile for a cleaner layout

### Result Display
- Compact horizontal verdict card: icon on the left, verdict text on the right, color-coded background
- Per-aspect breakdown: 4 cards showing Good / Poor status with contextual description
- Collapsible inference log (hidden on mobile)
- "Evaluasi Ulang" button to restart

### User Interface
- Clean, modern, light theme (white / light gray background)
- Lucide React icons throughout
- Fully responsive — mobile, tablet, and desktop
- Smooth animations: fade-in, mascot-enter, float

---

## System Architecture

### Architecture Diagram

```
+---------------------+     +---------------------+     +---------------------+
|                     |     |                     |     |                     |
|   Rule Definitions  |     |  Question Metadata  |     |   UI Components     |
|   (rules.js)        |     |  (questions.js)     |     |   (React/JSX)       |
|                     |     |                     |     |                     |
+---------+-----------+     +---------+-----------+     +---------+-----------+
          |                           |                           |
          v                           v                           v
+---------+-----------+     +---------+-----------+     +---------+-----------+
|                     |     |                     |     |                     |
|  ForwardChaining    |     |  ConversationFlow   |     |  App.jsx            |
|  Engine (Class)     |     |  (React Component)  |     |  (View Manager)     |
|                     |     |                     |     |                     |
+---------+-----------+     +---------------------+     +---------+-----------+
          |                                                       |
          +---------------------------+---------------------------+
                                      |
                                      v
                          +-----------+-----------+
                          |                       |
                          |   ResultDisplay       |
                          |   + InferenceLog      |
                          |   (React Components)  |
                          |                       |
                          +-----------------------+
```

### Inference Flow (Forward Chaining)

```
User Input (10 Attributes, collected via conversational UI)
        |
        v
+-------+--------+
|                 |
|  Working Memory |  <-- Initial facts loaded
|                 |
+-------+--------+
        |
        v
  PHASE 1: Aspect Evaluation
        |
        +---> Rule Set 2 (R13-R16) ---> Aspect: Idea & Problem       = good/poor
        +---> Rule Set 3 (R17-R19) ---> Aspect: Market & Competition  = good/poor
        +---> Rule Set 4 (R20-R23) ---> Aspect: Team & Resources      = good/poor
        +---> Rule Set 5 (R24-R26) ---> Aspect: Business Model        = good/poor
        |
        v
  PHASE 2: Final Decision Evaluation
        |
        +---> Rule Set 1 (R1-R12)  ---> Feasibility: Layak / Cukup Layak / Tidak Layak
        |
        v
  Output: { aspek: {...}, kelayakan_ide: "...", log: [...] }
```

### Dependency Diagram

The relationships between attributes, aspects, and the final decision follow this dependency structure:

```
                       Digital Business Idea Feasibility
                    (Layak / Cukup Layak / Tidak Layak)
                                    |
              +----------+----------+----------+
              |          |          |          |
         Idea &      Market &    Team &     Business
        Problem     Competition Resources    Model
       (good/poor)  (good/poor) (good/poor) (good/poor)
          |          |          |          |
     +----+----+   +-+--+   +--+--+--+   +-+------+
     |    |    |   |    |   |  |     |   |        |
    PC   SS   UV  TM   CL  TS TE   IC  CM       SU
```

Attribute abbreviations:

| Abbr | Attribute | Possible Values |
|---|---|---|
| PC | Problem Clarity (`kejelasan_masalah`) | clear / unclear |
| SS | Solution Suitability (`kesesuaian_solusi`) | suitable / unsuitable |
| UV | Unique Value (`nilai_unik`) | exists / none |
| TM | Target Market (`target_pasar`) | clear / unclear |
| CL | Competition Level (`tingkat_kompetitor`) | low / high |
| TS | Team Skills (`skill_tim`) | sufficient / insufficient |
| TE | Team Experience (`pengalaman_tim`) | exists / none |
| IC | Initial Capital (`modal_awal`) | sufficient / insufficient |
| CM | Clarity of Monetization (`kejelasan_monetisasi`) | clear / unclear |
| SU | Sustainability (`keberlanjutan`) | clear / unclear |

---

## Directory Structure

```
digital-business-feasibility-expert-system/
|
|-- index.html                   # HTML entry point (Vite)
|-- package.json                 # Dependencies and scripts
|-- vite.config.js               # Vite + Tailwind plugin configuration
|-- eslint.config.js             # ESLint configuration
|-- README.md                    # Project documentation (this file)
|
|-- public/                      # Static assets
|   |-- mascot.png               # 3D robot mascot image used in the conversational UI
|
|-- src/
|   |-- main.jsx                 # React entry point
|   |-- App.jsx                  # Root component (view manager: hero / conversation / result)
|   |-- index.css                # Tailwind CSS directives + custom animations (float, fade-in, mascot-enter)
|   |
|   |-- engine/                  # Logic layer — completely decoupled from UI
|   |   |-- rules.js             # 26 IF-THEN rules as declarative data objects
|   |   |-- forwardChaining.js   # ForwardChainingEngine class (setFacts, evaluate, log)
|   |
|   |-- data/                    # Content/metadata
|   |   |-- questions.js         # 10 questions, option labels, and 4 step definitions
|   |
|   |-- components/              # React UI components
|       |-- HeroSection.jsx      # Landing page (mascot, title, stats, CTA button)
|       |-- ConversationFlow.jsx # Conversational Q&A flow (history, typing indicator, auto-scroll)
|       |-- QuestionCard.jsx     # Single active question with mascot + option buttons
|       |-- ProgressIndicator.jsx# Step pills + question counter
|       |-- ResultDisplay.jsx    # Verdict card + aspect breakdown + retry button
|       |-- InferenceLog.jsx     # Collapsible rule-by-rule inference trace (desktop only)
|       |-- FormWizard.jsx       # Legacy multi-step form (kept but not used in main flow)
|       |-- QuestionGroup.jsx    # Legacy reusable question component (kept but not used in main flow)
```

---

## Prerequisites

- **Node.js** version 18 or later
- **npm** (Node package manager, typically bundled with Node.js)

---

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd digital-business-feasibility-expert-system
```

2. Install dependencies:

```bash
npm install
```

---

## Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

For production build:

```bash
npm run build
npm run preview
```

---

## User Guide

### 1. Home / Landing Page

The landing page displays:
- A large 3D mascot on the left with the system title and description on the right
- Quick stats (10 questions, 26 rules, instant results)
- "Mulai Evaluasi" (Start Evaluation) button to begin

### 2. Conversational Evaluation (10 Questions)

| Step | Aspect | Questions |
|---|---|---|
| 1 | Ide & Masalah | 1–3 |
| 2 | Pasar & Kompetitor | 4–5 |
| 3 | Tim & Sumber Daya | 6–8 |
| 4 | Model Bisnis | 9–10 |

- The mascot appears next to each question bubble
- A typing indicator (bouncing dots) is shown for ~750ms before each question appears
- Click one of the option buttons to answer — no text input required
- Past Q&A pairs stay visible above as conversation history
- Page auto-scrolls to the latest question after each answer
- A **floating Home button** (bottom-right) is available to return to the landing page at any time

### 3. Evaluation Results

After answering all 10 questions, the result page displays:
- **Verdict card**: icon + verdict title side-by-side on a color-coded background
  - Green: Layak (Feasible)
  - Yellow/Amber: Cukup Layak (Moderately Feasible)
  - Red: Tidak Layak (Not Feasible)
- **Recommendation description** based on the decision category
- **Per-aspect breakdown** — 4 cards showing Good / Poor for each aspect
- **Inference Process Log** — collapsible section showing the rule-by-rule trace (desktop only)
- "Evaluasi Ulang" button to restart from the beginning

---

## Forward Chaining Method

### Definition

Forward chaining is a data-driven reasoning method that works from facts toward conclusions. All facts are collected first, then rules are evaluated one by one to produce conclusions.

### How It Works in This System

Evaluation is performed in **2 sequential phases**:

**Phase 1 — Aspect Evaluation (Attributes → Aspects)**

The engine evaluates Rule Sets 2 through 5 sequentially. For each rule, it checks whether all conditions match the current working memory. If they match, the rule fires and its result is merged into working memory as a new fact.

After this phase, working memory contains 4 aspect values:
- `ide_masalah` (idea & problem): good / poor
- `pasar_kompetitor` (market & competition): good / poor
- `tim_sumber_daya` (team & resources): good / poor
- `model_bisnis` (business model): good / poor

**Phase 2 — Final Decision Evaluation (Aspects → Decision)**

The engine evaluates Rule Set 1. Rules are evaluated in order (R1 → R12), stopping at the first match. Rules with fewer conditions (R10, R12) function as wildcards — they only check a subset of aspects.

### Working Memory

Working memory is a key-value data structure that stores:
1. Initial facts (user input — 10 attributes)
2. Derived facts (4 aspect values, produced in Phase 1)
3. Final decision (1 feasibility value, produced in Phase 2)

```
Working Memory (after full evaluation):
{
  // Initial facts (user input)
  kejelasan_masalah: "jelas",
  kesesuaian_solusi: "sesuai",
  nilai_unik: "ada",
  target_pasar: "jelas",
  tingkat_kompetitor: "rendah",
  skill_tim: "cukup",
  pengalaman_tim: "ada",
  modal_awal: "cukup",
  kejelasan_monetisasi: "jelas",
  keberlanjutan: "jelas",

  // Derived facts (Phase 1)
  ide_masalah: "baik",
  pasar_kompetitor: "baik",
  tim_sumber_daya: "baik",
  model_bisnis: "baik",

  // Final decision (Phase 2)
  kelayakan_ide: "Layak"
}
```

### Inference Log

Every fired rule is recorded in the inference log with the following information:
- Rule ID (e.g., R13)
- Rule set / group
- Human-readable rule description
- Matched conditions (key-value pairs)
- Result merged into working memory

---

## Knowledge Base

### Input Attributes (10 attributes)

| # | Attribute | Description | Possible Values |
|---|---|---|---|
| 1 | `kejelasan_masalah` | Is the problem clearly defined? | `jelas` (clear), `tidak_jelas` (unclear) |
| 2 | `kesesuaian_solusi` | Is the digital solution suitable for the problem? | `sesuai` (suitable), `tidak_sesuai` (unsuitable) |
| 3 | `nilai_unik` | Does the idea have a unique value proposition? | `ada` (exists), `tidak_ada` (none) |
| 4 | `target_pasar` | Is the target market clearly defined? | `jelas` (clear), `tidak_jelas` (unclear) |
| 5 | `tingkat_kompetitor` | What is the competition level? | `rendah` (low), `tinggi` (high) |
| 6 | `skill_tim` | Does the team have sufficient technical skills? | `cukup` (sufficient), `kurang` (insufficient) |
| 7 | `pengalaman_tim` | Does the team have relevant experience? | `ada` (exists), `tidak_ada` (none) |
| 8 | `modal_awal` | Is the initial capital sufficient? | `cukup` (sufficient), `tidak_cukup` (insufficient) |
| 9 | `kejelasan_monetisasi` | Is the monetization model clear? | `jelas` (clear), `tidak_jelas` (unclear) |
| 10 | `keberlanjutan` | Is the business model sustainable? | `jelas` (clear), `tidak_jelas` (unclear) |

### Aspects (Intermediate Results — 4 aspects)

| # | Aspect | Description | Possible Values |
|---|---|---|---|
| 1 | `ide_masalah` | Idea & problem evaluation | `baik` (good), `kurang` (poor) |
| 2 | `pasar_kompetitor` | Market & competition evaluation | `baik` (good), `kurang` (poor) |
| 3 | `tim_sumber_daya` | Team & resources evaluation | `baik` (good), `kurang` (poor) |
| 4 | `model_bisnis` | Business model evaluation | `baik` (good), `kurang` (poor) |

### Final Decision (Target)

| # | Decision | Description |
|---|---|---|
| 1 | `Layak` (Feasible) | All aspects indicate readiness |
| 2 | `Cukup Layak` (Moderately Feasible) | Potential exists, but certain aspects need improvement |
| 3 | `Tidak Layak` (Not Feasible) | Not ready; requires thorough re-evaluation |

---

## Rule Definitions

### Set 2 — Idea & Problem Aspect (R13–R16)

| Rule | Conditions | Result |
|---|---|---|
| R13 | kejelasan_masalah = jelas AND kesesuaian_solusi = sesuai AND nilai_unik = ada | ide_masalah = **baik** |
| R14 | kejelasan_masalah = jelas AND kesesuaian_solusi = sesuai AND nilai_unik = tidak_ada | ide_masalah = **kurang** |
| R15 | kejelasan_masalah = jelas AND kesesuaian_solusi = tidak_sesuai | ide_masalah = **kurang** |
| R16 | kejelasan_masalah = tidak_jelas | ide_masalah = **kurang** |

> Only R13 (clear problem + suitable solution + unique value exists) produces `ide_masalah = baik`.

### Set 3 — Market & Competition Aspect (R17–R19)

| Rule | Conditions | Result |
|---|---|---|
| R17 | target_pasar = jelas AND tingkat_kompetitor = tinggi | pasar_kompetitor = **kurang** |
| R18 | target_pasar = jelas AND tingkat_kompetitor = rendah | pasar_kompetitor = **baik** |
| R19 | target_pasar = tidak_jelas | pasar_kompetitor = **kurang** |

> Market is considered good only if the target is clear AND competition is low (R18).

### Set 4 — Team & Resources Aspect (R20–R23)

| Rule | Conditions | Result |
|---|---|---|
| R20 | skill_tim = cukup AND pengalaman_tim = ada | tim_sumber_daya = **baik** |
| R21 | skill_tim = cukup AND pengalaman_tim = tidak_ada AND modal_awal = cukup | tim_sumber_daya = **baik** |
| R22 | skill_tim = cukup AND pengalaman_tim = tidak_ada AND modal_awal = tidak_cukup | tim_sumber_daya = **kurang** |
| R23 | skill_tim = kurang | tim_sumber_daya = **kurang** |

> Team is rated good if skills are sufficient AND (experience exists OR initial capital is sufficient).

### Set 5 — Business Model Aspect (R24–R26)

| Rule | Conditions | Result |
|---|---|---|
| R24 | kejelasan_monetisasi = jelas AND keberlanjutan = jelas | model_bisnis = **baik** |
| R25 | kejelasan_monetisasi = jelas AND keberlanjutan = tidak_jelas | model_bisnis = **kurang** |
| R26 | kejelasan_monetisasi = tidak_jelas | model_bisnis = **kurang** |

> Business model is good only if monetization is clear AND the model is sustainable (R24).

### Set 1 — Final Decision (R1–R12)

| Rule | Conditions | Decision |
|---|---|---|
| R1 | idea = good AND market = good AND team = good AND model = good | **Layak** |
| R2 | idea = good AND market = good AND team = good AND model = poor | **Cukup Layak** |
| R3 | idea = good AND market = good AND team = poor AND model = good | **Cukup Layak** |
| R4 | idea = good AND market = poor AND team = good AND model = good | **Cukup Layak** |
| R5 | idea = poor AND market = good AND team = good AND model = good | **Cukup Layak** |
| R6 | idea = good AND market = poor AND team = poor AND model = poor | **Cukup Layak** |
| R7 | idea = good AND market = poor AND team = good AND model = poor | **Tidak Layak** |
| R8 | idea = good AND market = good AND team = poor AND model = poor | **Tidak Layak** |
| R9 | idea = good AND market = poor AND team = poor AND model = good | **Tidak Layak** |
| R10 | idea = poor AND market = good AND model = poor | **Tidak Layak** |
| R11 | idea = poor AND market = good AND team = poor AND model = good | **Tidak Layak** |
| R12 | idea = poor AND market = poor | **Tidak Layak** |

> R10 and R12 are wildcard rules with fewer conditions. R12 immediately returns "Tidak Layak" if both idea and market are poor, regardless of team or business model.

**Decision distribution summary:**
- **Layak**: 1 rule (all aspects must be good)
- **Cukup Layak**: 5 rules (at most 1 poor aspect, or only idea is good)
- **Tidak Layak**: 6 rules (2 or more poor aspects, except R6)

---

## Rule Data Representation

All rules are stored as **declarative data** in JavaScript (not hardcoded if-else logic). Each rule is an object with the following structure:

```javascript
{
  id: "R13",                            // Unique identifier
  set: "Ide & Masalah",                 // Rule group (used for logging)
  description: "Masalah jelas, solusi sesuai, dan memiliki nilai unik → Ide & Masalah Baik",
  conditions: {                          // All conditions must match (AND logic)
    kejelasan_masalah: "jelas",
    kesesuaian_solusi: "sesuai",
    nilai_unik: "ada",
  },
  result: { ide_masalah: "baik" },       // Merged into working memory when rule fires
}
```

Rules are organized into 2 arrays:
- `aspectRules` — Rule Sets 2–5 (14 rules, evaluated in Phase 1)
- `decisionRules` — Rule Set 1 (12 rules, evaluated in Phase 2)

### Adding New Rules

To add a new rule, simply append a new object to the appropriate array in `src/engine/rules.js`. No engine code modifications are required.

---

## Calculation Examples

### Case 1: All Positive → Layak (Feasible)

**Input:**

| Attribute | Value |
|---|---|
| kejelasan_masalah | jelas (clear) |
| kesesuaian_solusi | sesuai (suitable) |
| nilai_unik | ada (exists) |
| target_pasar | jelas (clear) |
| tingkat_kompetitor | rendah (low) |
| skill_tim | cukup (sufficient) |
| pengalaman_tim | ada (exists) |
| modal_awal | cukup (sufficient) |
| kejelasan_monetisasi | jelas (clear) |
| keberlanjutan | jelas (clear) |

**Phase 1 (Aspects):**

| Rule Fired | Result |
|---|---|
| R13 | ide_masalah = baik (good) |
| R18 | pasar_kompetitor = baik (good) |
| R20 | tim_sumber_daya = baik (good) |
| R24 | model_bisnis = baik (good) |

**Phase 2 (Decision):**

| Rule Fired | Result |
|---|---|
| R1 (all good) | kelayakan_ide = **Layak** |

---

### Case 2: Clear Problem but High Competition → Cukup Layak

**Input:**

| Attribute | Value |
|---|---|
| kejelasan_masalah | jelas (clear) |
| kesesuaian_solusi | sesuai (suitable) |
| nilai_unik | ada (exists) |
| target_pasar | jelas (clear) |
| tingkat_kompetitor | **tinggi (high)** |
| skill_tim | cukup (sufficient) |
| pengalaman_tim | tidak_ada (none) |
| modal_awal | **tidak_cukup (insufficient)** |
| kejelasan_monetisasi | jelas (clear) |
| keberlanjutan | **tidak_jelas (unclear)** |

**Phase 1 (Aspects):**

| Rule Fired | Result |
|---|---|
| R13 | ide_masalah = baik (good) |
| R17 | pasar_kompetitor = **kurang** (high competition) |
| R22 | tim_sumber_daya = **kurang** (no experience + insufficient capital) |
| R25 | model_bisnis = **kurang** (not sustainable) |

**Phase 2 (Decision):**

| Rule Fired | Result |
|---|---|
| R6 (idea good, rest poor) | kelayakan_ide = **Cukup Layak** |

---

### Case 3: Unclear Problem → Tidak Layak

**Input:**

| Attribute | Value |
|---|---|
| kejelasan_masalah | **tidak_jelas (unclear)** |
| ... (other attributes vary) | |
| target_pasar | **tidak_jelas (unclear)** |

**Phase 1 (Aspects):**

| Rule Fired | Result |
|---|---|
| R16 | ide_masalah = **kurang** (problem unclear) |
| R19 | pasar_kompetitor = **kurang** (target unclear) |
| ... | (depends on remaining inputs) |

**Phase 2 (Decision):**

| Rule Fired | Result |
|---|---|
| R12 (idea poor + market poor) | kelayakan_ide = **Tidak Layak** |

> R12 is a wildcard rule: if idea and market are both poor, the decision is immediately "Tidak Layak" without checking team or business model.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 19.x | UI library (functional components + hooks) |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Utility-first CSS framework |
| [Vite](https://vite.dev/) | 8.x | Build tool and dev server |
| [Lucide React](https://lucide.dev/) | 1.x | Icon library |
| JavaScript (ES Modules) | — | Logic layer (engine + rules) |

---

## References

### Books and Theory

1. Turban, E., Aronson, J.E., & Liang, T.P. (2005). *Decision Support Systems and Intelligent Systems* (7th ed.). Pearson Prentice Hall.
   - Primary reference for expert system concepts and forward chaining.

2. Giarratano, J.C., & Riley, G.D. (2005). *Expert Systems: Principles and Programming* (4th ed.). Thomson Course Technology.
   - Reference for rule-based expert system implementation.

### Technologies

- React — https://react.dev/
- Tailwind CSS — https://tailwindcss.com/
- Vite — https://vite.dev/
- Lucide Icons — https://lucide.dev/

---

## License

This project was created for academic and educational purposes.
