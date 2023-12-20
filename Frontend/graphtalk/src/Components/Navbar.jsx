import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Heading,
    Spacer,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useColorMode,
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import logo from "../Images/logo.png";
//   import { CgSearch } from "react-icons/cg";
//   import { BsHandbag } from "react-icons/bs";

import { color } from "framer-motion";



const Navbar = () => {
    return (
        <div >
            <Box>
                <Flex>
                    <Box>
                        <Tabs size='sm' variant='' width={1280} bg="#5bb0b0" color='#fff'>
                            <TabList justifyContent='space-around'>
                                   <img src={logo} alt="" style={{width:"60px",height:"50px", paddingTop:"10px"}} />
                                <Box display='flex' height='60px'>
                                    <Tab>
                                        <NavLink style={{ fontWeight: '700', fontSize: '25px' ,paddingRight:"450px", color:"lightgrey"}} to='/'>Dashboard</NavLink>
                                    </Tab>
                                   
                                </Box>

                            </TabList>
                        </Tabs>
                    </Box>
                </Flex>
            </Box>
        </div>
    )
}

export default Navbar