import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import LoginUserPage from "./LoginUser";

const LoginPanelPage = (props) =>{
    return(
        <Box >
      <Tabs variant="enclosed" >
        <TabList >
          <Tab fontWeight="semibold" _selected={{color: "green"}}>Signin as user</Tab>
          <Tab fontWeight="semibold" _selected={{color: "green"}}>Signin as tenant</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LoginUserPage />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
    )
}

export default LoginPanelPage;