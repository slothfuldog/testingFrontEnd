import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import SignupUserPage from "./SignupUser";

const SignupPanelPage = (props) => {
  return (
    <Box boxShadow="dark-lg" className="mobile" rounded="md">
      <Tabs variant="enclosed" >
        <TabList  >
          <Tab fontWeight="semibold" _selected={{color: "green"}}>Register as user</Tab>
          <Tab fontWeight="semibold" _selected={{color: "green"}}>Register as tenant</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SignupUserPage />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SignupPanelPage;