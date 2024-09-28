"use client"
import { Box, Flex, HStack, Icon, Image, Text, Spinner, Button } from "@chakra-ui/react"
import Navbar from "../components/Navbar"
import { getQuerySnapshot } from "../helper-functions/getUser"
import { useEffect, useState } from "react"
import { DocumentData } from "firebase/firestore"
import { FaRegCopy } from "react-icons/fa6"
import { useUserData } from "../hooks/useUserData"

async function getRef(userId: number | undefined) {
  if (!userId) return
  const qs = await getQuerySnapshot(userId)
  if (qs.empty) {
    console.log("User does not exist")
    return
  }
  const data = qs.docs[0].data()
  return data
}

function Referral({
  userId,
  name,
}: {
  userId: number | undefined
  name: string | null
}) {
  const { isLoading, userData } = useUserData(userId, name)
  const [referredUsers, setReferredUsers] = useState<DocumentData[]>()

  useEffect(() => {
    async function getReferredUsers() {
      setReferredUsers(() => [])
      if (!userData) return
      const qs = await getQuerySnapshot(Number(userData.userId))
      if (qs.empty) {
        console.log("User does not exist")
        return
      }
      const data = qs.docs[0].data()
      const referrals = data.referrals

      referrals.forEach(async (refId: number) => {
        const data = await getRef(refId)
        if (data) {
          setReferredUsers((ref) => {
            if (ref) {
              return [...ref, data]
            }
            return [data]
          })
        }
      })
    }

    getReferredUsers()

    return () => {}
  }, [userData])

  function handleCopy() {
    try {
      navigator.clipboard.writeText(
        `https://t.me/BarnicoinBot/?start=${userId}`
      )
    } catch (err) {
      console.log(err)
    }
  }

  return (
    userData && (
      <Flex minH={"100vh"} justify="center" align="center">
        <Box
          maxWidth={["100%", "360px"]}
          width="100%"
          minH={"100vh"}
          bg={"black"}
          position={"relative"}
          px={5}
          py={8}
          color={"white"}
          mx="auto"
        >
          <Box color={"white"}>
            <Box textAlign={"center"}>
              <Text as="h2" fontSize={"30px"} fontWeight={"bold"}>
                Invite Friends and you both earn coins
              </Text>
              {/* <Text as="p" fontSize={"small"} fontStyle={"italic"}>
                You and your friend will receive bonuses
              </Text> */}
            </Box>
          </Box>
          <Box mt={8}>
            <HStack bg="rgba(255, 255, 255, 0.1)" rounded={"20px"} p={3}>
              <Image alt="" w={"60px"} h={"60px"} src="/giftbox.png" />
              <Box>
                <Text fontWeight={"bold"}>Invite a friend </Text>
                <HStack color={"yellow.400"} fontSize={"small"}>
                  <Image alt="" src="/coin.png" w={"20px"} h={"20px"} />
                  <Text ml={"-2px"}>
                    +3000{" "}
                    <Text as={"span"} color={"white"}>
                      for you and your friend
                    </Text>
                  </Text>
                </HStack>
              </Box>
            </HStack>
          </Box>

          <Box mt={"65px"} pb={"120px"}>
            <Box>
              <Text as={"h3"} fontWeight={"bold"} fontSize={"17px"}>
                Friend List ({referredUsers?.length})
              </Text>
            </Box>
            <Box mt={4}>
              {isLoading || !referredUsers ? (
                <Flex justify={"center"}>
                  <Spinner color="gray.500" />
                </Flex>
              ) : (
                referredUsers.map((data) => (
                  <Flex
                    justify={"space-between"}
                    align={"center"}
                    bg="rgba(255, 255, 255, 0.1)"
                    rounded={"20px"}
                    p={3}
                    mb={2}
                    key={data.name}
                  >
                    <HStack>
                      <Image
                        alt=""
                        w={"35px"}
                        h={"35px"}
                        src="/TEDDY 1.0.png"
                      />
                      <Box>
                        <Text fontWeight={"bold"}>{data.name}</Text>
                        <HStack align={"center"} fontSize={"small"} mt={"-2px"}>
                          <Image alt="" src="/coin.png" w={"20px"} h={"20px"} />
                          <Text color={"yellow.400"} ml={"-5px"}>
                            {Math.round(data.coinsEarned)}
                          </Text>
                        </HStack>
                      </Box>
                    </HStack>
                    <Text color={"yellow.400"}>+{3}k</Text>
                  </Flex>
                ))
              )}
            </Box>
          </Box>

    {/* Fixed buttons at the bottom */}
<Flex 
  position="fixed"
  bottom={20}
  left={0}
  right={0}
  px={5}
  py={10}
  justify={"space-between"}
  align={"center"}
  maxWidth={["100%", "360px"]}
  width="100%"
  mx="auto"
>
  <Button
    colorScheme="yellow"
    size="lg"
    fontSize={"xl"}
    fontWeight={"bold"}
    rounded={"full"}
    py={6}
    px={10}
    mr={2}
    boxShadow="0px 4px 8px rgba(0, 0, 0, 0.25)"
    bgGradient="linear(to-b, #FFDD33, #FFA500)"
    _hover={{
      bgGradient: "linear(to-b, #FFDD33, #FF8800)",
      transform: "scale(1.05)",
    }}
    _active={{ transform: "scale(0.95)" }}
    textTransform="uppercase"
    fontFamily="'Comic Sans MS', cursive, sans-serif" // Fun meme-like font
  >
    Invite a Friend
  </Button>
  
  <Button
    colorScheme="yellow"
    size="lg"  
    fontSize={"xl"}
    fontWeight={"bold"}
    rounded={"full"}
    py={6}
    px={10}
    onClick={handleCopy}
    leftIcon={<Icon as={FaRegCopy} w={6} h={6} />}
    boxShadow="0px 4px 8px rgba(0, 0, 0, 0.25)"
    bgGradient="linear(to-b, #FFDD33, #FFA500)"
    _hover={{
      bgGradient: "linear(to-b, #FFDD33, #FF8800)",
      transform: "scale(1.05)",
    }}
    _active={{ transform: "scale(0.95)" }}
    fontFamily="'Comic Sans MS', cursive, sans-serif" // Fun meme-like font
  >
  </Button>
</Flex>

          <Navbar userId={userData.userId} name={name ? name : ""} /> 
        </Box>
      </Flex>
    )
  )
}

export default Referral