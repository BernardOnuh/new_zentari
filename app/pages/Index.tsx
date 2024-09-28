"use client";
import { useEffect, useState } from "react";
import { Flex, Box, Image, Text, Icon, Spinner } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { LuBaggageClaim } from "react-icons/lu";
import { BsRocket } from "react-icons/bs";
import backgroundGif from "../images/giphy_mew.webp";
import Navbar from "../components/Navbar";
import { useUserData } from "../hooks/useUserData";
import { updateUserData } from "../helper-functions/getUser";
import { FaUser } from "react-icons/fa6";
import Link from "next/link"; // Use next/link for navigation
import { IoIosArrowForward } from "react-icons/io";
import { TfiCup } from "react-icons/tfi";
import { useSearchParams } from "next/navigation"; // Use next/navigation for search params

const floatUpAndFadeOut = keyframes`
  0% {
    transform: translateY(0px);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px);
    opacity: 0;
  }
`

const rotateCoinLeft = keyframes`
  0% {
    transform: rotateY(0deg)
  }
  100% {
    transform: rotateY(20deg)
  }
`

const rotateCoinRight = keyframes`
  0% {
    transform: rotateY(0deg)
  }
  100% {
    transform: rotateY(-20deg)
  }
`

interface ScreenAxis {
  x: number;
  y: number;
  id: number;
}

function Index({ userId, name }: { userId: number | undefined; name: string | null }) {
  const [floatingEnergy, setFloatingEnergy] = useState(0)
  const [coinsEarned, setCoinsEarned] = useState(0)
  const [tappingPower, setTappingPower] = useState(0)
  const searchParams = useSearchParams() // Correct hook from next/navigation
  const [rotateAnim, setRotateAnim] = useState("")
  const firstName = "John Doe" // Mock user 

  const referralId = Number(searchParams.get("referralId"))

  const { userData } = useUserData(userId, name, referralId)

  const [screenAxis, setScreenAxis] = useState<ScreenAxis[]>([])

  const handleTap = async (clientX: number, clientY: number) => {
    if (!userId) return
    if (floatingEnergy - tappingPower <= 0) return

    setFloatingEnergy((curr) => curr - tappingPower)
    setCoinsEarned((coins) => coins + tappingPower)
    setScreenAxis((prv) => [...prv, { x: clientX, y: clientY, id: Date.now() }])
    if (clientX < 170) {
      setRotateAnim(() => rotateCoinLeft)
    } else if (clientX > 230) {
      setRotateAnim(() => rotateCoinRight)
    }

    await updateUserData(userId, {
      coinsEarned: coinsEarned + tappingPower,
      floatingTapEnergy: floatingEnergy - tappingPower,
    })
  }

  const removeScreen = (id: number) => {
    setScreenAxis(screenAxis.filter((screen) => screen.id !== id))
  }

  useEffect(() => {
    if (!userData) return
    const timeLost = calculateLostTime()
    setCoinsEarned(() => userData.coinsEarned)
    
    const energyPerSec = userData.refillEnergy / userData.refillTime
    const energyLost: number =
      userData.floatingTapEnergy + energyPerSec * timeLost
    if (timeLost >= 3) {
      if (Number(energyLost.toFixed(0)) >= userData.tapEnergy) {
        setFloatingEnergy(() => userData.tapEnergy)
      } else {
        setFloatingEnergy(() => Number(energyLost.toFixed(0)))
      }
    } else {
      setFloatingEnergy(() => userData.floatingTapEnergy)
    }
    setTappingPower(() => userData.tapPower)
    return () => {}
  }, [userData])

  useEffect(() => {
    if (!userData) return
    const interval = setInterval(() => {
      setFloatingEnergy((curr) => {
        if (curr + userData.refillEnergy >= userData.tapEnergy)
          return userData.tapEnergy
        return curr + userData.refillEnergy
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [userData])

  useEffect(() => {
    if (!userId) return
    ;(async () => {
      await updateUserData(userId, {
        floatingTapEnergy: floatingEnergy,
        lastUpdatedTime: Date.now() / 1000,
      })
    })()
    return () => {}
  }, [floatingEnergy, userId])

  const calculateLostTime = (): number => {
    const lastUpdate = userData?.lastUpdatedTime
    const timeNowInSeconds = Date.now() / 1000
    return timeNowInSeconds - lastUpdate
  }

  return (
    <Flex height="100%" justify="center" overflow="hidden" align="center">
      <Box
        width={["100%", "360px"]}
        height="100%"
        bg="black"
        overflow="hidden"
        backgroundImage={`url(${backgroundGif})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <Box p={5} fontWeight="bold" color="white">
          <Icon as={FaUser} /> {name ? name : ""}
        </Box>

        <Box h="100%" roundedTop="30px" px={5} py={8} pos="relative">
          <Flex align="center" justify="center" gap={2}>
            <Image alt="coin" src="/coin.png" w="40px" h="40px" />
            <Text color="white" fontSize="25px">
              {coinsEarned.toLocaleString()}
            </Text>
          </Flex>

          <Flex justify="center" align="center">
            <Link href="/status">
              <Flex color="#fff" justify="center" align="center" mt={3}>
                <Icon as={TfiCup} mr={2} />
                <Text fontSize="20px" color="gray.400">
                  Silver
                </Text>
                <Icon as={IoIosArrowForward} />
              </Flex>
            </Link>
          </Flex>

          <Flex align="center" justify="center" mt="30px" px={5}>
            <Box
              bgGradient="linear(to-t, gray.900, gray.600)"
              h="280px"
              w="280px"
              rounded="full"
              display="flex"
              justifyContent="center"
              alignItems="center"
              position="relative"
              onTouchStart={async (e) =>
                await handleTap(e.touches[0].clientX, e.touches[0].clientY)
              }
              animation={`${rotateAnim} 0.1s ease `}
              onAnimationEnd={() => setRotateAnim("")}
            >
              <Box
                bg="rgba(0,0,0,0)"
                rounded="full"
                h="100%"
                w="100%"
                pos="absolute"
                zIndex="10"
              ></Box>
              <Box
                bgGradient="radial(gray.600, gray.800, gray.900)"
                h="90%"
                w="90%"
                rounded="full"
              >
                <Image alt="" src="/disk.png" />
              </Box>
            </Box>
          </Flex>
        </Box>

        {screenAxis.map((screen) => (
          <Text
            key={screen.id}
            position="absolute"
            left={`${screen.x - 10}px`}
            top={`${screen.y}px`}
            color="white"
            as="p"
            animation={`${floatUpAndFadeOut} 1s ease forwards`}
            onAnimationEnd={() => removeScreen(screen.id)}
            zIndex="5"
            fontSize="30px"
          >
            +{tappingPower}
          </Text>
        ))}

        <Box
          px={5}
          py={2}
          pos="fixed"
          bottom="120px"
          w={["100%", "360px"]}
          zIndex={10}
        >
          <Flex justify="space-between" align="center">
            <Link href="/boost">
              <Flex align="center">
                <Box textAlign="center">
                  <Icon as={BsRocket} color={"gray.400"} boxSize="12" />
                  <Text fontSize="xs" color={"white"}>
                    BOOST
                  </Text>
                </Box>
              </Flex>
            </Link>
            <Link href="/rewards">
              <Flex align="center">
                <Box textAlign="center">
                  <Icon as={LuBaggageClaim} color={"gray.400"} boxSize="12" />
                  <Text fontSize="xs" color={"white"}>
                    CLAIM
                  </Text>
                </Box>
              </Flex>
            </Link>
          </Flex>
        </Box>

        <Navbar userId={userId} name={name ? name : ""} />
      </Box>
    </Flex>
  )
}

export default Index
      