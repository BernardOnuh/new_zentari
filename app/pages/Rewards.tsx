"use client"
import { Box, Flex, Grid, GridItem, Text, VStack, Center, IconButton } from '@chakra-ui/react';
// import { BiArrowBack } from '@chakra-ui/icons';
import { BiArrowBack } from 'react-icons/bi';
// import { useNavigate } from 'react-router-dom'; // Change to useNavigate

function ComingSoon() {
  // const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const rewards = [
    { day: 'Day 1', coins: 100 },
    { day: 'Day 2', coins: 200 },
    { day: 'Day 3', coins: 300 },
    { day: 'Day 4', coins: 500 },
    { day: 'Day 5', coins: 700 },
    { day: 'Day 6', coins: 1000 },
    { day: 'Day 7', coins: 1500 },
    { day: 'Day 8', coins: 2000 },
    { day: 'Day 9', coins: 3000 },
    { day: 'Day 10', coins: 5000 },
    { day: 'Day 11', coins: 7000 },
    { day: 'Day 12', coins: 10000 },
    { day: 'Day 13', coins: 15000 },
    { day: 'Day 14', coins: 20000 },
    { day: 'Day 15', coins: 30000 },
    { day: 'Day 16', coins: 50000 },
    { day: 'Day 17', coins: 70000 },
    { day: 'Day 18', coins: 100000 },
    { day: 'Day 19', coins: 150000 },
    { day: 'Day 20', coins: 200000 },
    { day: 'Day 21', coins: '300K' },
  ];

  return (
    <Box h={"100%"}>
      <Flex
        h={"100%"}
        bg={"black"}
        color={"#fff"}
        justify={"center"}
        align={"center"}
        position="relative"
      >
        {/* Back Arrow Button */}
        {/* <IconButton
          icon={<BiArrowBack />}
          aria-label="Back to homepage"
          onClick={() => navigate('/')} // Use navigate instead of history.push
          position="absolute"
          top={4}
          left={4}
          colorScheme="orange"
        /> */}

        <VStack p={2} spacing={4} width="100vw" height="100vh" justifyContent="space-between">
          <Center>
            <Text fontSize="2xl" fontWeight="bold">Streak Rewards</Text>
          </Center>

          {/* Grid for rewards */}
          <Grid templateColumns="repeat(4, 1fr)" gap={2}> {/* Adjusted for smaller boxes */}
            {rewards.map((reward, index) => (
              <GridItem key={index}>
                <Box
                  bg="white"
                  borderRadius="md"
                  boxShadow="md"
                  p={2}  // Adjust padding for smaller boxes
                  textAlign="center"
                  border="2px solid"
                  borderColor="gray.200"
                >
                  <Text fontSize="sm" color="yellow.500" fontWeight="bold">{reward.day}</Text>
                  <Text fontSize="md" color="yellow.500" fontWeight="bold">{reward.coins}</Text>
                </Box>
              </GridItem>
            ))}
          </Grid>

          {/* Claim Button */}
          <Flex
        align={"center"}
        justify={"center"}
        gap={2}
        w={"100%"}
        p={4}
        borderRadius={"50px"}
        background={"rgba(41, 41, 41, 0.1)"}
        boxShadow={"0 4px 20px rgba(0, 0, 0, 0.1), inset 0 0 10px rgba(255, 242, 231, 0.381)"}
        backdropFilter={"blur(10px)"}
        border={"2px solid rgba(255, 255, 255, 0.3)"}
        position={"relative"}
        maxW={"100%"}
        mt={4}
      >
         
        <Text color={"white"} fontSize={"25px"} fontWeight={"bold"}>
          CLAIM
        </Text>

        {/* Highlight effect */}
        <Box
          position={"absolute"}
          top={"-10px"}
          right={"-10px"}
          w={"30px"}
          h={"30px"}
          borderRadius={"50%"}
          background={"rgba(255, 255, 255, 0.5)"}
          boxShadow={"0 0 10px rgba(255, 255, 255, 0.5)"}
          filter={"blur(5px)"}
        />
      </Flex>
        </VStack>
      </Flex>
    </Box>
  );
}

export default ComingSoon;