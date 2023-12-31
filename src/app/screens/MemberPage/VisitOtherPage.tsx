import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import {Box, Container, Pagination, PaginationItem, Stack} from "@mui/material";
import React, { useState } from "react";
import {MemberPosts} from "./memberPosts";
import {MemberFollowers} from "./memberFollowers";
import {MemberFollowing} from "./memberFollowing";
import {MySettings} from "./mySettings";
import SettingsIcon from "@mui/icons-material/Settings";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
/** others*/
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TabList from "@mui/lab/TabList";
import {Button, Tab} from "@mui/material";
import {TViewer} from "../../components/tuiEditor/TViewer";
/** Redux */
import {Dispatch} from "@reduxjs/toolkit";
import {Member} from "../../../types/user";
import {setChosenMember, setChosenMemberBoArticles, setChosenSingleBoArticle} from "./slice";
import {BoArticle} from "../../../types/boArticle";
import {createSelector} from "reselect";
import {retrieveChosenMember, retrieveChosenMemberBoArticles, retrieveChosenSingleBoArticle} from "./selector";
import {useDispatch, useSelector} from "react-redux";



/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
    setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
    setChosenMemberBoArticles: (data: BoArticle[]) =>
        dispatch(setChosenMemberBoArticles(data)),
    setChosenSingleBoArticle: (data: BoArticle) =>
        dispatch(setChosenSingleBoArticle(data)),
});
/** REDUX SELECTOR **/
const chosenMemberRetriever = createSelector(
    retrieveChosenMember,
    (chosenMember) => ({
        chosenMember,
    })
);
const chosenMemberBoArticlesRetriever = createSelector(
    retrieveChosenMemberBoArticles,
    (chosenMemberBoArticles) => ({
        chosenMemberBoArticles,
    })
);
const chosenSingleBoArticleRetriever = createSelector(
    retrieveChosenSingleBoArticle,
    (chosenSingleBoArticle) => ({
        chosenSingleBoArticle,
    })
);

export function VisitOtherPage(props: any) {
    /** INITIALIZATIONS */
    const {
        setChosenMember,
        setChosenMemberBoArticles,
        setChosenSingleBoArticle,
    } = actionDispatch(useDispatch());
    const { chosenMember } = useSelector(chosenMemberRetriever);
    const { chosenMemberBoArticles } = useSelector(chosenMemberBoArticlesRetriever);
    const { chosenSingleBoArticle } = useSelector(chosenSingleBoArticleRetriever);
    const [value, setValue] = useState("1");

    /** HANDLERS */
    const handleChange = (event: any, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div className={"my_page"}>
            <Container maxWidth="lg" sx={{mt: "50px", mb: "50px",}}>
                <Stack className={"my_page_frame"}
                       sx={{flexDirection: "row"}}
                >
                    <TabContext value={value}>
                        <Stack className={"my_page_left"}>
                            <Box display={"flex"} flexDirection={"column"}>
                                <TabPanel value={"1"}>
                                    <Box className={"menu_name"}> contents</Box>
                                    <Box className={"menu_content"}>
                                        <MemberPosts/>
                                        <Stack
                                            sx={{my: "40px"}}
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Box className={"bottom_box"}>
                                                <Pagination
                                                    count={3}
                                                    page={1}
                                                    renderItem={(item) => (
                                                        <PaginationItem
                                                            components={{
                                                                previous: ArrowBackIcon,
                                                                next: ArrowForwardIcon,
                                                            }}
                                                            {...item}
                                                            color={"secondary"}
                                                        />
                                                    )}
                                                />
                                            </Box>
                                        </Stack>
                                    </Box>
                                </TabPanel>

                                <TabPanel value={"4"}>
                                    <Box className={"menu_name"}> tanlangan maqola</Box>
                                    <Box className={"menu_content"}>
                                        <TViewer text={`<h3>hello</h3>`} />
                                        <Stack
                                            sx={{my: "40px", height: "600px"}}
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Box className={"bottom_box"}>
                                                <Pagination
                                                    count={3}
                                                    page={1}
                                                    renderItem={(item) => (
                                                        <PaginationItem
                                                            components={{
                                                                previous: ArrowBackIcon,
                                                                next: ArrowForwardIcon,
                                                            }}
                                                            {...item}
                                                            color={"secondary"}
                                                        />
                                                    )}
                                                />

                                            </Box>
                                        </Stack>
                                    </Box>
                                </TabPanel>

                                <TabPanel value={"2"}>
                                    <Box className={"menu_name"}>Followers</Box>
                                    <Box className={"menu_content"}>
                                        <MemberFollowers actions_enabled={false}/>
                                    </Box>
                                </TabPanel>

                                <TabPanel value={"3"}>
                                    <Box className={"menu_name"}>Following</Box>
                                    <Box className={"menu_content"}>
                                        <MemberFollowing actions_enabled={false}/>
                                    </Box>
                                </TabPanel>
                            </Box>
                        </Stack>
                        <Stack className={"my_page_right"}
                               style={{ height: "355px"}}
                        >
                            <Box className={"order_info_box"}>

                                <a onClick={() => setValue("6")} className={"settings_btn"}>
                                    <SettingsIcon/>
                                </a>
                                <Box
                                    display={"flex"}
                                    flexDirection={"column"}
                                    alignItems={"center"}
                                >
                                    <div className={"order_user_img"}>
                                        <img
                                            src={"/community/Dilnoza_K.jpeg"}
                                            className={"order_user_avatar"}
                                        />

                                    </div>
                                    <span className={"order_user_name"}>Dilzona.K</span>
                                    <span className={"order_user_prof"}>foydalanuchchi</span>
                                </Box>
                                <Box className={"user_media_box"}
                                     sx={{
                                         color: "#a1a1a1",
                                         justifyContent: "space-between",
                                         alignItems: "center",
                                     }}>
                                    <FacebookIcon/>
                                    <InstagramIcon/>
                                    <TelegramIcon/>
                                    <YouTubeIcon/>
                                </Box>
                                <Box className={"user_media_box_follow"}
                                     sx={{
                                         flexDirection: "row",
                                     }}

                                >
                                    <p className={"follows"}>Followers: 3 Following: 2</p>
                                </Box>
                                <p className={"user_desc"}>qushimcha ma'lumotlar mavjud emas</p>
                                {/*<Box*/}
                                {/*    display={"flex"}*/}
                                {/*    justifyContent={"flex-end"}*/}
                                {/*    sx={{mb: "10px"}}*/}
                                {/*>*/}
                                {/*    <TabList*/}
                                {/*        onChange={handleChange}*/}
                                {/*        aria-label="lab API tabs example"*/}
                                {/*    >*/}
                                {/*        <Tab*/}
                                {/*            style={{flexDirection: "column"}}*/}
                                {/*            value={"4"}*/}
                                {/*            component={(e) => (*/}
                                {/*                <Button*/}
                                {/*                    variant={"contained"}*/}
                                {/*                    onClick={() => setValue("4")}*/}
                                {/*                >*/}
                                {/*                    Bekor qilish*/}
                                {/*                </Button>*/}
                                {/*            )}*/}
                                {/*        />*/}
                                {/*    </TabList>*/}
                                {/*</Box>*/}
                            </Box>

                            <Box className={"my_page_menu"}
                                 sx={{ flexDirection: "column", }}
                            >
                                <TabList onChange={handleChange} aria-label="lab API tabs example" >
                                    <Stack flexDirection={"column"} >
                                        <Tab
                                            style={{flexDirection: "column",}}
                                            value={"1"}
                                            component={() => (
                                                <div className={`menu_box ${value}`} onClick={() => setValue("1")} >
                                                    <img src={"/icons/Pencil.svg"} alt=""/>
                                                    <span> Contents</span>
                                                </div>
                                            )}
                                        />
                                        <Tab
                                            style={{flexDirection: "column",}}
                                            value={"1"}
                                            component={() => (
                                                <div className={`menu_box ${value}`} onClick={() => setValue("4")} >
                                                    <img src={"/icons/Pencil.svg"} alt=""/>
                                                    <span> tanlangan maqola</span>
                                                </div>
                                            )}
                                        />

                                        <Tab
                                            style={{flexDirection: "column",}}
                                            value={"2"}
                                            component={() => (
                                                <div className={`menu_box ${value}`} onClick={() => setValue("2")} >
                                                    <img src={"/icons/Group.svg"} alt=""/>
                                                    <span>Follower</span>
                                                </div>
                                            )}
                                        />
                                        <Tab
                                            style={{flexDirection: "column",}}
                                            value={"3"}
                                            component={() => (
                                                <div className={`menu_box ${value}`} onClick={() => setValue("3")}>
                                                    <img src={"/icons/user.svg"} alt=""/>
                                                    <span>Following</span>
                                                </div>
                                            )}
                                        />

                                    </Stack>

                                </TabList>
                            </Box>

                        </Stack>
                    </TabContext>
                </Stack>

            </Container>

        </div>
    );
}