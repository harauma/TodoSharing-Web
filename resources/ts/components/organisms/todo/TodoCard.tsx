import React from "react";
import { useCallback } from "react";
import { memo, VFC } from "react";
import { Box, Checkbox, Stack, Text } from "@chakra-ui/react";
import { Todo } from "../../../types/api/todo";

type Props = {
  todo: Todo;
};

export const TodoCard: VFC<Props> = memo((props) => {
  const { todo } = props;

  const onChangeCompleted = useCallback((e) => {
    console.log(e.target.checked);
    todo.completed = e.target.checked;
    // todo更新API
  }, []);

  return (
    <Box
      w="200px"
      h="200px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
    >
      <Stack justify="center">
        <Text fontSize="lg" fontWeight="bold">
          {todo.todo}
        </Text>
        <Text fontSize="md">{todo.detail}</Text>
        <Text fontSize="sm" color="gray">
          {todo.account_name}
        </Text>
        <Checkbox
          size="md"
          colorScheme="green"
          value={todo.id}
          isChecked={todo.completed}
          onChange={onChangeCompleted}
        >
          <Text fontSize="md">完了しました？</Text>
        </Checkbox>
      </Stack>
    </Box>
  );
});
