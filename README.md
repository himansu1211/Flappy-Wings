# Flappy Wings using Phaser.js

A **fast-paced 2D side-scrolling arcade game** developed using **Phaser 3**, **JavaScript (ES6)**, and **HTML5 Canvas**, where the player controls a **physics-based bird character** to navigate through obstacles and reach the finish point.
This project demonstrates key **game development concepts** such as **Arcade Physics**, **collision detection**, **game state management**, and **responsive design**, making it ideal for **college projects**, **mini-projects**, and **learning Phaser.js**.

## 🎮 Game Overview
In this game:
- The player controls a **bird sprite** using **keyboard inputs**
- The bird must avoid hitting **columns (obstacles)** and the **ground**
- A continuously scrolling **background and road** create a sense of motion
- The game ends when the player **wins by reaching the goal** or **loses by crashing**

## ✨ Features
- Built using **Phaser 3 Arcade Physics**
- Smooth background & road scrolling
- Responsive design (auto-resizes on screen size)
- Collision detection with obstacles and ground
- Win & lose conditions
- **Play Again** and **Exit** buttons
- Buttons appear **2 seconds after winning**
- Clean and commented code (beginner friendly)

## 🧠 Game Logic Highlights
- `hasLanded` → Detects ground collision  
- `hasBumped` → Detects column collision  
- `isGameStarted` → Prevents movement before starting  
- `hasWon` → Detects winning condition  
- `endButtonsShown` → Prevents duplicate buttons  


## 🕹️ Game Controls
| Key | Action |
|-----|--------|
| `Space` | Start the game |
| `↑ (Up Arrow)` | Make the bird fly upward |

## 🚀 How to Run the Game
1. Open the project folder in **Visual Studio Code**
2. Install the **Live Server** extension
3. Right-click on `index.html`
4. Select **Open with Live Server**

## 🛠️ Technologies Used

- **JavaScript (ES6)** – game logic and interactions  
- **Phaser 3** – 2D game framework  
- **HTML5 Canvas** – rendering graphics  
- **Arcade Physics Engine** – physics simulation and collision detection  

## 📚 Learning Outcomes

By working on this project, I learned about:

- The **Phaser game lifecycle** (`preload`, `create`, `update`)
- How to implement **Arcade Physics**
- Handling **collision detection** with obstacles and terrain
- Managing **game states** (start, play, win, lose, restart)
- Designing **responsive games** for different screen sizes
- Creating **interactive UI elements** using text and graphics

This project is ideal for students and beginners looking to strengthen their understanding of **game development concepts**, **JavaScript programming**, and **Phaser framework fundamentals**.

## Created by Himansu Kumar Sahu
