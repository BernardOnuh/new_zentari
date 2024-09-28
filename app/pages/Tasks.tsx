"use client"
import { useEffect, useState } from 'react';
import { Box, Flex, Text, Spinner, Icon, useToast, Card, CardHeader, CardBody, Progress } from "@chakra-ui/react";
import { Button } from '@chakra-ui/react';
import { IoIosCheckmarkCircle } from "react-icons/io";
// import { getTaskQuerySnapshot, updateTaskVerifiedUsers } from "../helper-functions/getTasks";
import { DocumentData, increment } from "firebase/firestore";
import { updateUserData } from "../helper-functions/getUser";
import Navbar from '../components/Navbar';
import backgroundGif from "../../public/giphy_mew.webp"


// Define your tasks manually as an array of objects
const tasks = [
    {
      id: "task1",
      title: "Follow Zentari X account",
      description: "This is the first task",
      users: [1, 2], // Example user IDs who have verified this task
      link: "https://twitter.com/ZentariHQ",
      reward: 1500
    },
    {
      id: "task2",
      title: "Join the chanel",
      description: "This is the second task",
      users: [2, 3],
      link: "https://t.me/ZentariHQ",
      reward: 1000
    },
    {
      id: "task3",
      title: "Subscribe to the channel",
      description: "This is the third task",
      users: [1, 3],
      link: "https://www.youtube.com/@ZentariStudio",
      reward: 1500
    },
    {
        id: "task4",
        title: "Follow Zentari on instagram",
        description: "This is the fourth task",
        users: [2, 3],
        link: "https://www.instagram.com/zentarihq/",
        reward: 1500
      },
      // {
      //   id: "task5",
      //   title: "Follow Zentari Facebook",
      //   description: "This is the sixth task",
      //   users: [2, 3],
      //   link: "https://www.facebook.com/profile.php?id=61565895998019",
      //   reward: 1500
      // },
      // {
      //   id: "task6",
      //   title: "Follow Memechan twitter",
      //   description: "This is the sxth task",
      //   users: [2, 3],
      //   link: "https://twitter.com/memechan_gg",
      //   reward: 1500
      // },
      // {
      //   id: "task7",
      //   title: "Follow Zentari Instagram",
      //   description: "This is the seventh task",
      //   users: [2, 3],
      //   link: "https://twitter.com/memechan_gg",
      //   reward: 1500
      // }
    // Add more tasks as needed
  ]


  
  // Function to simulate getting tasks
  async function getTaskQuerySnapshot() {
    try {
      // Simulate the structure of a Firestore QuerySnapshot
      const qs = {
        docs: tasks.map(task => ({
          id: task.id,
          data: () => task,
        })),
      }
      return qs
    } catch (err) {
      console.log("Error from getTaskQuerySnapshot", err)
      return null
    }
  }
  
  // Export the getTaskQuerySnapshot function
  export { getTaskQuerySnapshot }

export default function Tasks({ userId }: { userId: number | undefined }) {
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [allTasks, setAllTasks] = useState<DocumentData[]>([]);
  const completedTasks = allTasks.filter(task => task.users?.includes(userId)).length;

  useEffect(() => {
    const fetchTasks = async () => {
      if (!userId) return;
      try {
        const allTasksSnapshot = await getTaskQuerySnapshot();
        if (!allTasksSnapshot) return;

        // const tasks = allTasksSnapshot.docs.map(doc => ({
        //   id: doc.id,
        //   ...doc.data()
        // }));

        setAllTasks(tasks);
        setLoadingTasks(false);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    }

    fetchTasks();
  }, [userId]);

  if (loadingTasks) {
    return (
      <Flex justify="center" align="center">
        <Spinner color="yellow.500" />
      </Flex>
    );
  }

  return (
    <Flex height="100%" justify="center" overflow={"hidden"} align="center">
    {/* <Box width={["100%", "360px"]} height="100%"> */}
    <Box width={["100%", "360px"]} height="100%" bg="black" overflow="hidden"
                
                backgroundImage={`url(${backgroundGif})`}
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat">
      <Box p={4} minH="100vh" color="white">
        <Card color={"white"} bg={"black"}>
          <CardHeader>
            {/* "Tasks" heading on its own line */}
            <Box mb={4} textAlign="center">
              <Text fontSize="4xl" fontWeight="bold">Tasks</Text>
            </Box>
  
            {/* "Complete Every 3 Tasks..." message centered and on a new line */}
            <Box textAlign="center">
              <Text fontSize="sm">Complete Tasks To Get A Reward!</Text>
              <Progress value={completedTasks} max={3} size="sm" colorScheme="yellow" mt={2} />
            </Box>
          </CardHeader>
          
          <CardBody>
            {allTasks.map((task) => (
              <Task key={task.id} userId={userId} task={task} />
            ))}
          </CardBody>
        </Card>
      </Box>
    </Box>
  </Flex>
  );
}

function Task({ userId, task }: { userId: number | undefined, task: DocumentData }) {
  const [isCompleted, setIsCompleted] = useState(task.users?.includes(userId));
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const name = "SKALEZ"
//   const userId = 121

  const handleComplete = async () => {
    if (isCompleted || !userId) return;
    setIsLoading(true);

    try {
    //   await updateTaskVerifiedUsers(userId, task.id);
      await updateUserData(userId, { coinsEarned: increment(task.reward) });
      setIsCompleted(true);
      toast({
        title: `Completed task: ${task.title}`,
        description: `Earned ${task.reward} 🪙`,
        status: 'success',
      })
    } catch (err) {
      console.error('Error completing task:', err);
    }

    setIsLoading(false);
  }

  return (
    <>
      <Flex
        key={task.id}
        p={2}
        mb={1}
        align="center"
        justify="space-between"
        cursor="pointer"
        transition="all 0.2s"
        _hover={{ bg: 'gray.900' }}
        onClick={handleComplete}
      >
        <Box
          width="100%"
          height="80px"
          background="linear-gradient(180deg, #112033, #141a22)"
          borderRadius="10px"
          boxShadow="0 8px 0 rgba(0, 0, 0, 0.6)"  
          border="1px solid #0077BE"
          display="flex"
          alignItems="center"
          justifyContent="space-between"  
          overflow="hidden"
          px={4} 
          _hover={{
            background: "linear-gradient(180deg, #112033, #141a22)",
            boxShadow: "0 8px 0 rgba(0, 0, 0, 0.8)", 
          }}
          _active={{
            boxShadow: "none",
            transform: "translateY(8px)",
          }}
        >
          <Box flexGrow={1}>
            {/* Task Title */}
            <Text
              fontSize="sm"
              fontWeight="bold"
              color="white"
              textShadow="1px 1px 0 #000"
              style={{ letterSpacing: "1px" }}
              textAlign="start"
            >
              {task.title}
            </Text>
  
            {/* Task Reward Below Title */}
            <Text
              fontSize="md"
              color="yellow.500"
              mt={1}  // Added margin to create space between title and reward
            >
              +{task.reward} 🪙
            </Text>
          </Box>
  
          {/* "GO" Button */}
          <Button
            ml={4}
            colorScheme="teal"
            size="sm"
            onClick={handleComplete}
          >
            GO
          </Button>
        </Box>
  
        {isLoading ? (
          <Spinner size="sm" />
        ) : isCompleted ? (
          <Icon as={IoIosCheckmarkCircle} color="green.500" />
        ) : null}
      </Flex>
  
      <Navbar userId={userId} name={name} />
    </>
  );
}