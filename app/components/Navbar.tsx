"use client"
import { Flex, Box, Icon, Text } from "@chakra-ui/react"
import { FaWallet } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6"
import { FaHome } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa"
import Link from "next/link";
import { BiCoinStack } from "react-icons/bi"
import { useEffect, useState } from "react"
import { IconType } from "react-icons";

// Define the props interface for NavItem
interface NavItemProps {
  href: string;
  icon: IconType;
  label: string;
  isActive: boolean;
}

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
    if (path.includes("referral")) setActiveTab("friends")
    if (path.includes("boost")) setActiveTab("wallet") 
    if (path.includes("tasks")) setActiveTab("earn")
    if (path.includes("games")) setActiveTab("games")
  }, [])

  const NavItem: React.FC<NavItemProps> = ({ href, icon, label, isActive }) => (
    <Link href={href} onClick={() => setActiveTab(label.toLowerCase())}>
  <Box 
    textAlign="center" 
    bg={isActive ? "rgba(57, 121, 214, 0.19)" : "transparent"}
    borderRadius="10px"
    p={2}
    transition="all 0.3s"
    borderWidth={isActive ? "1px" : "0"}
    borderColor={isActive ? "gray.400" : "transparent"}
  >
    <Icon 
      as={icon} 
      color={isActive ? "white" : "gray.300"} 
      boxSize={6} 
    />
    <Text 
      fontSize="xs" 
      fontWeight="medium" 
      color={isActive ? "white" : "gray.300"}
      mt={1}
    >
      {label}
    </Text>
  </Box>
</Link>
  )

  return (
    <Flex justify="center">
      <Box 
        pos="fixed"
        display="flex"
        justifyContent="center" 
        backdropFilter="blur(10px)"
        // backgroundColor="rgba(255, 255, 255, 0.8)"
        bottom={0}
        left={0}
        right={0}
        h="70px"
        w="100%"
      >
        <Flex
          w={["100%", "350px"]}
          maxW="500px"
          h="100%" 
          justify="space-between"
          backgroundColor="rgba(35, 35, 35, 1)" 
          align="center"
          px={4}
          pt={5}
           borderTopRadius="20px"
        >
          <NavItem 
            href={`/referral?userId=${userId}&name=${name}`}
            icon={FaUserGroup}
            label="Friends"
            isActive={activeTab === "friends"}
          />
          <NavItem 
            href={`/tasks`}
            icon={BiCoinStack}
            label="Earn"
            isActive={activeTab === "earn"}
          />
          <NavItem 
            href={`/`}
            icon={FaHome}
            label="Home"
            isActive={activeTab === "home"}
          />
          <NavItem 
            href="#"
            icon={FaGamepad}
            label="Games"
            isActive={activeTab === "games"}
          />
          <NavItem 
            href={`/boost?userId=${userId}&name=${name}`}
            icon={FaWallet}
            label="Wallet"
            isActive={activeTab === "wallet"}
          />
        </Flex>
      </Box>
    </Flex>
  )
}

export default Navbar