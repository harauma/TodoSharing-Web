import React, { useRef } from "react";
import {
  ChangeEvent,
  KeyboardEvent,
  memo,
  useCallback,
  useState,
  VFC,
} from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useCreateAccount } from "../../hooks/useCreateAccount";
import { Account } from "../../types/api/account";
import { useHistory } from "react-router-dom";

export const Signup: VFC = memo(() => {
  const history = useHistory();
  const { createAccount, loading } = useCreateAccount();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const userNameElement = useRef<HTMLInputElement>(null);
  const passwordElement = useRef<HTMLInputElement>(null);

  const handleClick = () => setShow(!show);
  const onClickSubmit = () => {
    const account: Account = {
      login_id: userId,
      name: userName,
      password: password,
    };
    createAccount(account);
  };
  const onClickGotoLogin = useCallback(() => history.push("login"), []);
  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) =>
    setUserName(e.target.value);

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onKeyPressInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      const element = e.target as HTMLElement;
      switch (element.id) {
        case "userId":
          userNameElement.current?.focus();
          break;
        case "userName":
          passwordElement.current?.focus();
          break;
        case "password":
          if (canSumbit()) {
            onClickSubmit();
          }
          break;
        default:
          break;
      }
    }
  };

  const canSumbit = (): boolean => {
    return userId !== "" && userName !== "" && password !== "";
  };

  return (
    <Flex align="center" justify="center" height="80vh">
      <Box bg="white" w="lg" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ????????????
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <FormControl id="userId" isRequired>
            <FormLabel>?????????ID</FormLabel>
            <Input
              isRequired={true}
              placeholder="?????????ID"
              value={userId}
              onChange={onChangeUserId}
              onKeyPress={onKeyPressInput}
            />
          </FormControl>
          <FormControl id="userName" isRequired>
            <FormLabel>????????????</FormLabel>
            <Input
              ref={userNameElement}
              isRequired={true}
              placeholder="????????????"
              value={userName}
              onChange={onChangeUserName}
              onKeyPress={onKeyPressInput}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>???????????????</FormLabel>
            <InputGroup size="md">
              <Input
                ref={passwordElement}
                pr="4.5rem"
                type={show ? "text" : "password"}
                isRequired={true}
                placeholder="???????????????"
                value={password}
                onChange={onChangePassword}
                onKeyPress={onKeyPressInput}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "?????????" : "??????"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <PrimaryButton
            disabled={!canSumbit()}
            isLoading={loading}
            onClick={onClickSubmit}
          >
            ????????????
          </PrimaryButton>
          <Text align="center">
            <Link color="teal.500" onClick={onClickGotoLogin}>
              ????????????
            </Link>
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
});
