"use client"
import { Flex, Box, Icon, Text } from "@chakra-ui/react"
import { FaUserGroup } from "react-icons/fa6"
import { FaHome } from "react-icons/fa";
import { FaFire } from "react-icons/fa" 
import { FaGamepad } from "react-icons/fa"
// import { Link } from "react-router-dom"
import Link from "next/link";
import { BiCoinStack } from "react-icons/bi"
import { useEffect, useState } from "react"

function Navbar({
    userId,
    name,
  }: {
    userId: number | undefined
    name: string | null
  }) {
  const [activeTab, setActiveTab] = useState("")

  useEffect(() => {
    const path = location.pathname
    if (path == "/") setActiveTab("home")
    if (path.includes("referral")) setActiveTab("ref")
    if (path.includes("boost")) setActiveTab("boost") 
    if (path.includes("tasks")) setActiveTab("tasks")
    if (path.includes("games")) setActiveTab("games")
  }, [])

  return (
    <Flex justify="center">
     <Box 
  pos="fixed"
  display="flex"
  justifyContent="center" 
  backdropFilter="blur(2px)"
  backgroundColor="rgba(11, 11, 11, 0.064)"
  bottom="0"
  h="90px"
  w="100%"
>
        <Flex
          w={["90%", "360px"]}
          h="70px" 
          rounded="20px"
          // bg="gray.900"
          justify="space-between"
          align="center"
          px="2" 
        >
          <Link to={`/boost?userId=${userId}&name=${name}`} onClick={() => setActiveTab("boost")}>
            <Box textAlign="center">
            <Box
                bg={activeTab == "ref" ? "blue.600" : "blue.700"}
                p="2" 
                rounded="lg"
                
              >
                
              <Icon as={FaFire} color={activeTab == "boost" ? "orange.400" : "gray.400"} boxSize="6" />
              </Box>
              <Text fontSize="xs" color={activeTab == "boost" ? "white" : "gray.400"}>Boost</Text>
            </Box>
          </Link>

          <Link to={`/tasks?userId=${userId}&name=${name}`} onClick={() => setActiveTab("earn")}>
            <Box textAlign="center">
            <Box
                bg={activeTab == "ref" ? "gray.600" : "gray.700"}
                p="2" 
                rounded="lg"
                
              >
              <Icon as={BiCoinStack} color={activeTab == "earn" ? "yellow.400" : "gray.400"} boxSize="6" /> 
              </Box>
              <Text fontSize="xs" color={activeTab == "earn" ? "white" : "gray.400"}>Earn</Text>
            </Box>
          </Link>

          <Link to={`/?userId=${userId}&name=${name}`} onClick={() => setActiveTab("home")}>
            <Box textAlign="center">
              <Box 
                bg={activeTab == "home" ? "gray.600" : "gray.900"}
                p="2"
                rounded="lg" 
                
                transform="scale(1.2)"
              >
                {/* <Image alt="Coin" src="/coin.png" w="40px" h="40px" /> */}
              <Icon as={FaHome} color={activeTab == "home" ? "purple.400" : "gray.400"} boxSize="10" /> 
              <Text fontSize="xs" color="white" fontWeight="bold" mt="1">Home</Text>
              </Box>
            </Box>
          </Link>

          <Link to={`#`} onClick={() => setActiveTab("games")}>
            <Box textAlign="center">
            <Box
                bg={activeTab == "ref" ? "gray.600" : "gray.700"}
                p="2" 
                rounded="lg"
                
              >                
              <Icon as={FaGamepad} color={activeTab == "games" ? "purple.400" : "gray.400"} boxSize="6" /> 
              </Box>
              <Text fontSize="xs" color={activeTab == "games" ? "white" : "gray.400"}>Games</Text>
            </Box>  
          </Link>

          <Link to={`/referral?userId=${userId}&name=${name}`} onClick={() => setActiveTab("ref")}>
            <Box textAlign="center">
            <Box
                bg={activeTab == "ref" ? "gray.600" : "gray.700"}
                p="2" 
                rounded="lg"
                
              >
                {/* <Icon as={FaUserGroup} color="teal.400" boxSize="6" /> */}
              <Icon as={FaUserGroup} color={activeTab == "ref" ? "teal.400" : "gray.400"} boxSize="6" />
              </Box>
              <Text fontSize="xs" color={activeTab == "ref" ? "white" : "gray.400"}>Refer</Text>
            </Box>
          </Link>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Navbar