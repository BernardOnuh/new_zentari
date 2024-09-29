"use client"
import React from 'react';
import { Icon } from '@chakra-ui/react';
import { IoIosArrowForward } from 'react-icons/io';
import { Box, Flex, Text, Card, CardHeader, CardBody, Progress, Button } from "@chakra-ui/react";
import Navbar from '../components/Navbar';
// Define the Task interface
interface Task {
  id: string;
  title: string;
  link: string;
  reward: number;
}

// Define props interface for the Task component
interface TaskProps {
  task: Task;
}

const tasks: Task[] = [
    {
      id: "task1",
      title: "Follow Zentari X account",
      link: "https://twitter.com/ZentariHQ",
      reward: 1500
    },
    {
      id: "task2",
      title: "Join the channel",
      link: "https://t.me/ZentariHQ",
      reward: 1000
    },
    {
      id: "task3",
      title: "Subscribe to the channel",
      link: "https://www.youtube.com/@ZentariStudio",
      reward: 1500
    },
    {
      id: "task4",
      title: "Follow Zentari on instagram",
      link: "https://www.instagram.com/zentarihq/",
      reward: 1500
    }
];

export default function Tasks() {
  const completedTasks = 0; // For demonstration, set to 0

  return (
    <Flex justify="center" overflow="hidden" align="center">
  <Box width={["100%", "360px"]} bg="transparent">
    <Box p={4} bg="transparent">
      <Card bg="transparent" boxShadow="none">
        <CardHeader bg="transparent">
          <Box mb={4} textAlign="center">
            <Text fontSize="4xl" fontWeight="bold" color="white">Tasks</Text>
          </Box>
          <Box textAlign="center">
            <Text fontSize="sm" color="white">Complete Tasks To Get A Reward!</Text>
          </Box>
        </CardHeader>
        
        <CardBody bg="transparent">
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </CardBody>
      </Card>
    </Box>
  </Box>
  <Navbar userId={123} name="SKALEZ" />
</Flex>
  );
}

function Task({ task }: TaskProps) {
  return (
    <Flex
      p={2}
      mb={1}
      align="center"
      justify="space-between"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ bg: 'gray.900' }}
    >
      <Box
        width="100%"
        height="80px"
        background="rgba(25, 40, 74, 1)"
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
          <Text
            fontSize="md"
            color="yellow.500"
            mt={1}
          >
            +{task.reward} 🪙
          </Text>
        </Box>
        <Button
          as="a"
          href={task.link}
          target="_blank"
          rel="noopener noreferrer"
          ml={4}
          size="sm"
        >
          <Icon as={IoIosArrowForward} />
        </Button>
      </Box>
    </Flex>
  );
}