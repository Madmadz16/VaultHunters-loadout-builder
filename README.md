# Vault Hunters Loadout Builder

A web-based tool for building and managing gear loadouts for the [Vault Hunters Minecraft](https://www.curseforge.com/minecraft/modpacks/vault-hunters-1-18-2) mod. Design and tinker with equipment configuration by selecting gear, customizing attributes, and applying modifiers.

## Features

- **Gear Selection** - Choose from a library of armor, weapons, and accessories
- **Attribute Customization** - Customize gear attributes including base stats and additional attributes
- **Modifier System** - Apply abilities, talents, expertises, researches, and other modifiers to your gear
- **Gear Storage** - Save and load your gear configurations locally
- **Share Loadouts** - Compress and share your loadout configurations with others
- **Visual Feedback** - Real-time display of selected gear with preview images
- **Responsive Design** - Clean, intuitive Bootstrap-based interface

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Bootstrap 5
- **Additional**: Brotli compression for gear sharing

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd VaultHunters-loadout-builder
```

2. Install dependencies:
```bash
npm install
```

## Available Scripts

- `npm run dev` - Start the development server with HMR
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build

## Usage

1. **Start the dev server**:
```bash
npm run dev
```

2. **Create a Loadout**:
   - Select your gear type from available options
   - Choose your base gear item
   - Customize attributes and add modifiers
   - Apply additional effects like idols and abilities

3. **Manage Your Loadout**:
   - Save your configurations locally
   - Load previously saved loadouts
   - Share compressed loadout data with other players

## Project Structure

```
src/
├── components/          # React components for gear building UI
├── Services/           # Business logic for gear, storage, and attributes
├── gear_modifiers/     # Gear data definitions and modifier configurations
├── data/              # Core data structures and interfaces
└── utils/             # Utility functions

public/
├── gear_images/       # Visual assets for gear items
└── unique_images/     # Unique gear item artwork

texture_json/          # Minecraft texture data for gear visualization
```

## Key Components

- **GearMaker** - Main component for creating and editing gear items
- **GearDisplay** - Displays selected gear with visual feedback
- **GearSelector** - Interface for choosing gear types and items
- **Attributes** - Component for managing gear attributes and modifiers
- **Stats** - Displays calculated gear statistics


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The MIT License is a permissive open source license that allows:
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use

With the only requirement that the original license and copyright notice be included.