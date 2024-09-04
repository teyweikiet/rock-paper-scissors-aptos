'use client'

import { useState, useEffect } from 'react'
import { ActionIcon, Box, Button, Group, Paper, Stack, Text, Title } from '@mantine/core'
import { FaHandRock, FaHandPaper, FaHandScissors } from 'react-icons/fa'
import { ScoreCard } from '@/components/ScoreCard'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { fetchScore, fetchComputerMove, fetchGameResult } from '@/utils/aptos'
import Image from 'next/image'

const MOVE = {
  // ROCK
  1: {
    value: 1,
    icon: <FaHandRock size={24} />
  },
  // PAPER
  2: {
    value: 2,
    icon: <FaHandPaper size={24} />
  },
  // SCISSORS
  3: {
    value: 3,
    icon: <FaHandScissors size={24} />
  }
}

const GAME_STATE = {
  gameOver: 0,
  startingGame: 1,
  awaitingPlayerMove: 2,
  submittingPlayerMove: 3
}

export default function Home () {
  const { account, connect, signAndSubmitTransaction, wallet } = useWallet()
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState(GAME_STATE.gameOver)
  const [gameResult, setGameResult] = useState(0)
  const [playerMove, setPlayerMove] = useState(0)
  const [computerMove, setComputerMove] = useState(0)

  useEffect(() => {
    fetchScore(account?.address)
      .then(setScore)
  }, [account])

  const startGame = async () => {
    try {
      await signAndSubmitTransaction({
        sender: account.address,
        data: {
          function: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::RockPaperScissors::start_game`,
          typeArguments: [],
          functionArguments: []
        }
      })
      setGameState(GAME_STATE.awaitingPlayerMove)
      setPlayerMove(0)
      setGameResult(0)
      setComputerMove(0)
    } catch (err) {
      console.error(err)
      setGameState(GAME_STATE.gameOver)
    }
  }

  const savePlayerMove = async (playerMove) => {
    try {
      setGameState(GAME_STATE.submittingPlayerMove)
      await signAndSubmitTransaction({
        sender: account.address,
        data: {
          function: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}::RockPaperScissors::set_player_move`,
          typeArguments: [],
          functionArguments: [playerMove]
        }
      })
      setPlayerMove(playerMove)
      await Promise.all([
        fetchComputerMove(account.address).then(setComputerMove),
        fetchGameResult(account.address).then(setGameResult),
        fetchScore(account.address).then(setScore)
      ])
      setGameState(GAME_STATE.gameOver)
    } catch (err) {
      console.error(err)
      setGameState(GAME_STATE.awaitingPlayerMove)
    }
  }

  return (
    <Stack
      h='100%'
    >
      {/* Score */}
      <Paper
        shadow="xs"
        p="lg"
        radius="md"
      >
        <Group justify='space-between'>
          <Group>
            <Box>
              <Text fw={900}>Rock</Text>
              <Text fw={900}>Paper</Text>
              <Text fw={900}>Scissors</Text>
            </Box>
            <Image
              src='/rock-paper-scissors.png'
              width={65}
              height={65}
              alt='Rock Paper Scissors'
              priority={true}
            />
          </Group>
          <ScoreCard score={score} />
        </Group>
      </Paper>

      <Stack
        h='100%'
        align="center"
        justify="center"
      >
          {/* Game Result */}
          {
            gameResult && computerMove && playerMove
              ? (
              <Stack>
                <Group>
                  <Stack
                    align='center'
                    w='12rem'
                    py='xl'
                  >
                    <Title
                      ta='center'
                      order={3}
                    >
                      Player
                    </Title>
                    <ActionIcon
                      size='xl'
                      radius='xl'
                    >
                      {MOVE[playerMove].icon}
                    </ActionIcon>
                  </Stack>
                  <Stack
                    align='center'
                    w='12rem'
                    py='xl'
                  >
                    <Title
                      ta='center'
                      order={3}
                    >
                      Computer
                    </Title>
                    <ActionIcon
                      size='xl'
                      radius='xl'
                    >
                      {MOVE[computerMove].icon}
                    </ActionIcon>
                  </Stack>
                </Group>
                <Title
                  ta='center'
                  order={2}
                >
                  {
                    gameResult === 2
                      ? 'You won!'
                      : gameResult === 3
                        ? 'Computer won!'
                        : 'Draw'}
                </Title>
              </Stack>
                )
              : null
          }
          {/* Connect Wallet / Start Game Button */}
          {
            gameState <= GAME_STATE.startingGame
              ? (<Button
                  onClick={async () => {
                    setGameState(GAME_STATE.startingGame)
                    if (!account?.address) {
                      await connect(wallet?.name ?? 'Petra')
                    }
                    await startGame()
                  }}
                  disabled={gameState === GAME_STATE.startingGame}
                  mb='xl'
                >
                  {account?.address ? 'Start Game' : 'Connect Wallet'}
                </Button>)
              : null
          }

        {/* Pick Move */}
        {
          gameState >= GAME_STATE.awaitingPlayerMove
            ? (<Group
                align="center"
                justify="center"
              >
                {[MOVE['1'], MOVE['2'], MOVE['3']].map(({ value, icon }) => (
                  <ActionIcon
                    size='xl'
                    radius='xl'
                    key={value}
                    disabled={gameState === GAME_STATE.submittingPlayerMove}
                    onClick={() => savePlayerMove(value)}
                  >
                    {icon}
                  </ActionIcon>
                ))}
              </Group>)
            : null
        }
      </Stack>
    </Stack>
  )
}
