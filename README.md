<br />
<div align="center">
  <a href="https://github.com/teyweikiet/rock-paper-scissors-aptos">
    <img src="/frontend/public/rock-paper-scissors.png" alt="Logo" width="50" height="50">
  </a>

  <h1 align="center" style="border-bottom: 0;">Rock Paper Scissors</h1>

  <p align="center">
    A rock paper scissors game powered by Aptos.
    <br />
    <a href="https://rock-paper-scissors-aptos-stackup-bounty.vercel.app/"><strong>Visit Website</strong></a> | 
    <a href="#video-demo">Video Demo</a> | 
    <a href="https://explorer.aptoslabs.com/account/0xfaa259effc96ae64494fa4ed9184202034f23ccb772882432a86f2060f2da768/modules/code/RockPaperScissors/start_game?network=testnet"><strong>View Contract</strong></a>
    <br />
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#instructions-to-use">Instructions to Use</a>
      <ul>
        <li><a href="#video-demo">Video Demo</a></li>
      </ul>
    </li>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#development-instructions">Development Instructions</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#running-locally">Running locally</a></li>
      </ul>
    </li>
  </ol>
</details>

## About The Project

This is a submission for [StackUp Bounty - Level Up Your Rock Paper Scissors Game](https://earn.stackup.dev/campaigns/move-on-aptos-iii/quests/bounty-level-up-your-rock-paper-scissors-game-7a02).

### Features

- **Intuitive, User Friendly Frontend** - users can play the game via an intuitive user interface rather than having to rely on the block explorer

- **Endless gameplay** - users can play the game for as many times as they want

- **Keeping score** - users can keep track of their score

## Instructions to Use

- Make sure you have [Petra](https://petra.app/) wallet installed before proceeding.

- Visit the website at [https://rock-paper-scissors-aptos-stackup-bounty.vercel.app/](https://rock-paper-scissors-aptos-stackup-bounty.vercel.app/).

- Click on 'Connect Wallet' button to connect with your Petra wallet.

- Then click on 'Start Game' button.

- Approve the transaction.

- Pick your move.

- Approve the transaction.

- Then game result will be shown afterward. Click 'Start Game' button to play again.

### Video Demo  

https://github.com/user-attachments/assets/11bd988a-1c45-4476-ad3e-bd5bcaf21faa

## Built With

- [Aptos](https://aptos.dev/en/build/smart-contracts) - Next generation language for secure, sandboxed and formally verified programming which is used for multiple chains

- [Next.js](https://nextjs.org/) - Frontend Framework

- [Mantine](https://mantine.dev/) - For building functional, responsive & accesible UI

- [Vercel](https://vercel.com/) for hosting [frontend site](https://affinidi-powered-product-stackup-bounty.vercel.app/)

## Development Instructions

### Installation

1. Clone the repo
```sh
git clone https://github.com/teyweikiet/rock-paper-scissors-aptos
```

2. Initialize aptos
```sh
cd contract
aptos init
```

3. Update address [here](/contract/sources/RockPaperScissors.move#1) with the address printed in the console from previous step

4. Deploy smart contract
```sh
aptos move publish
```

5. Go to frontend folder
```sh
cd frontend
```

6. Install dependencies
```sh
npm install
```

### Running locally

1. Copy and modify .env accordingly. (Refer comments on top of environment variables for appropriate values.)
```sh
cd frontend
cp .env.example .env
```

2. Start server locally
```sh
npm run dev
```

