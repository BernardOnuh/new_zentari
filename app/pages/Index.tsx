"use client";
import { useEffect, useState } from "react";
import { Flex, Box, Text, Icon, Spinner } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FaFire } from "react-icons/fa";
import { BsLightning } from "react-icons/bs";
import backgroundGif from "../images/giphy_mew.webp";
import Navbar from "../components/Navbar";
import { useUserData } from "../hooks/useUserData";
import { updateUserData } from "../helper-functions/getUser";
import { FaUser } from "react-icons/fa6";
import Link from "next/link"; // Use next/link for navigation
import { IoIosArrowForward } from "react-icons/io";
import { TfiCup } from "react-icons/tfi";
import { useSearchParams } from "next/navigation"; // Use next/navigation for search params
import coin from "@/app/images/coin.png";
import Image from "next/image";

const floatUpAndFadeOut = keyframes`
  0% {
    transform: translateY(0px);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px);
    opacity: 0;
  }
`;

const rotateCoinLeft = keyframes`
  0% {
    transform: rotateY(0deg)
  }
  100% {
    transform: rotateY(20deg)
  }
`;

const rotateCoinRight = keyframes`
  0% {
    transform: rotateY(0deg)
  }
  100% {
    transform: rotateY(-20deg)
  }
`;

interface ScreenAxis {
  x: number;
  y: number;
  id: number;
}

function Index({
  userId,
  name,
}: {
  userId: number | undefined;
  name: string | null;
}) {
  const [floatingEnergy, setFloatingEnergy] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [tappingPower, setTappingPower] = useState(0);
  //const searchParams = useSearchParams(); // Correct hook from next/navigation
  const [rotateAnim, setRotateAnim] = useState("");
  const firstName = "John Doe"; // Mock user

  //const referralId = Number(searchParams.get("referralId"));

  const { userData } = useUserData(userId, name);

  const [screenAxis, setScreenAxis] = useState<ScreenAxis[]>([]);

  const handleTap = async (clientX: number, clientY: number) => {
    if (!userId) return;
    if (floatingEnergy - tappingPower <= 0) return;

    setFloatingEnergy((curr) => curr - tappingPower);
    setCoinsEarned((coins) => coins + tappingPower);
    setScreenAxis((prv) => [
      ...prv,
      { x: clientX, y: clientY, id: Date.now() },
    ]);
    if (clientX < 170) {
      setRotateAnim(() => rotateCoinLeft);
    } else if (clientX > 230) {
      setRotateAnim(() => rotateCoinRight);
    }

    await updateUserData(userId, {
      coinsEarned: coinsEarned + tappingPower,
      floatingTapEnergy: floatingEnergy - tappingPower,
    });
  };

  const removeScreen = (id: number) => {
    setScreenAxis(screenAxis.filter((screen) => screen.id !== id));
  };

  useEffect(() => {
    if (!userData) return;
    const timeLost = calculateLostTime();
    setCoinsEarned(() => userData.coinsEarned);

    const energyPerSec = userData.refillEnergy / userData.refillTime;
    const energyLost: number =
      userData.floatingTapEnergy + energyPerSec * timeLost;
    if (timeLost >= 3) {
      if (Number(energyLost.toFixed(0)) >= userData.tapEnergy) {
        setFloatingEnergy(() => userData.tapEnergy);
      } else {
        setFloatingEnergy(() => Number(energyLost.toFixed(0)));
      }
    } else {
      setFloatingEnergy(() => userData.floatingTapEnergy);
    }
    setTappingPower(() => userData.tapPower);
    return () => {};
  }, [userData]);

  useEffect(() => {
    if (!userData) return;
    const interval = setInterval(() => {
      setFloatingEnergy((curr) => {
        if (curr + userData.refillEnergy >= userData.tapEnergy)
          return userData.tapEnergy;
        return curr + userData.refillEnergy;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [userData]);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      await updateUserData(userId, {
        floatingTapEnergy: floatingEnergy,
        lastUpdatedTime: Date.now() / 1000,
      });
    })();
    return () => {};
  }, [floatingEnergy, userId]);

  const calculateLostTime = (): number => {
    const lastUpdate = userData?.lastUpdatedTime;
    const timeNowInSeconds = Date.now() / 1000;
    return timeNowInSeconds - lastUpdate;
  };

  return (
    <Flex justify="center" overflow="hidden" align="center">
      <Box
        width={["100%", "360px"]}
        // height="100%"
        // bg="black"
        overflow="hidden"
        backgroundImage={`url(${backgroundGif})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        
        <Box px={4} m={3} left={0} right={0} zIndex={10} bg="rgba(51, 70, 95, 0.5)" height="100%" borderRadius="15px">
          <Flex
            justify="space-between"
            align="center"
            // bg="navy"
            borderRadius="full"
            px={4}
            // pb={4}
            maxW="360px"
            mx="auto"
          >
            <Flex align="center">
              <Icon as={FaUser} color="yellow.400" boxSize={5} mr={2} />
              <Text fontSize="lg" fontWeight="bold" color="white">
                MOCKUSER
              </Text>
            </Flex>
            <Flex align="center">
            <Button
              // leftIcon={<Icon as={FaFire} />}
              bg="rgba(149, 198, 251, 0.32)"
              color="white"
              size="lg"
              borderRadius="10px"
              px={3}
              m={3}
              _hover={{ bg: "blue.400" }}
            >
                             <Icon as={TfiCup} mr={2} /> 
              <Text fontSize="md" fontWeight="bold">
                Brave
              </Text>
              <Icon as={IoIosArrowForward} />
            </Button>
            </Flex>
          </Flex>
        </Box>

{/* COIN SECTION */}
        <Box roundedTop="30px" px={5} py={8} pos="relative">
          <Flex justify="center" align="center">
            <Link href="/status">
              <Flex color="#fff" justify="center" align="center" mt={3}>
                <Image alt="coin" src={coin.src} width={30} height={30} />
                <Text
                  fontSize={["28px", "32px", "36px"]}
                  fontWeight="extrabold"
                  color="white"
                  p={3}
                  textShadow="0 0 5px rgba(0,0,0,0.3)"
                >
                  1300
                </Text>
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

              <Image
                alt="coin"
                src={coin.src}
                width={coin.width}
                height={coin.height}
              />
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

        <Box px={4} pos="fixed" bottom="80px" left={0} right={0} zIndex={10}>
          <Flex
            justify="space-between"
            align="center"
            // bg="navy"
            borderRadius="full"
            px={4}
            pb={4}
            maxW="360px"
            mx="auto"
          >
            <Flex align="center">
              <Icon as={BsLightning} color="yellow.400" boxSize={5} mr={2} />
              <Text fontSize="lg" fontWeight="bold" color="white">
                500/500
              </Text>
            </Flex>
            <Button
              // leftIcon={<Icon as={FaFire} />}
              bg="rgba(149, 198, 251, 0.32)"
              color="white"
              size="lg"
              borderRadius="10px"
              px={4}
              m={5}
              _hover={{ bg: "blue.400" }}
            >
              <Text fontSize="30px" fontWeight="bold" p={1}>
                🔥
              </Text>
              <Text fontSize="md" fontWeight="bold">
                Boost
              </Text>
            </Button>
          </Flex>
        </Box>
        <Navbar userId={userId} name={name ? name : ""} />
      </Box>
    </Flex>
  );
}

export default Index;
