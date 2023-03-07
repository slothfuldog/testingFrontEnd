import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPanelPage from "./LoginPanel";
import LoginPage from "./LoginUser";
import SignupPage from "./SignupUser";

const HomePage = (props) => {
  const [loginPop, setLoginPop] = useState(false);
  const [signupPop, setSignupPop] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal, setModal] = useState(<LoginPage />)
  

  return (
    <div style={{ transition: "all 0.5s ease-in-out" }}>
      <Button onClick={() =>{
        setModal(<LoginPanelPage /> );
        onOpen()}}>Sign in</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {modal}
          </ModalBody>
        </ModalContent>
      </Modal>
      
    
      {/* Please make sure that the LoginPage for modal is on the last line*/}
      {loginPop && <LoginPage closePop={() => setLoginPop(false)} />}
      {signupPop && <SignupPage closePop={() => setSignupPop(false)} />}
    </div>
  );
};

export default HomePage;
