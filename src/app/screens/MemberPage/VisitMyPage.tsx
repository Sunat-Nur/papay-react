import React, {useEffect, useState} from "react";

import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import {Box, Container, Pagination, PaginationItem, Stack} from "@mui/material";
import {MemberPosts} from "./memberPosts";
import {MemberFollowers} from "./memberFollowers";
import {MemberFollowing} from "./memberFollowing";
import {MySettings} from "./mySettings";
import {TuiEditor} from "../../components/tuiEditor/TuiEditor";
import {TViewer} from "../../components/tuiEditor/TViewer"
/** others  */
import SettingsIcon from "@mui/icons-material/Settings";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TabList from "@mui/lab/TabList";
import {Button, Tab} from "@mui/material";
/** Redux*/
import {Dispatch} from "@reduxjs/toolkit";
import {Member} from "../../../types/user";
import {setChosenMember, setChosenMemberBoArticles, setChosenSingleBoArticles} from "./slice";
import {retrieveChosenMember, retrieveChosenMemberBoArticles, retrieveChosenSingleBoArticles} from "./selector";
import {BoArticle, SearchMemberArticlesObj} from "../../../types/boArticle";
import {createSelector} from "reselect";
import {useDispatch, useSelector} from "react-redux";
import {sweetErrorHandling, sweetFailureProvider} from "../../../lib/sweetAlert";
import CommunityApiService from "../../apiServices/communityApiService";
import MemberApiService from "../../apiServices/memberApiService";


/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
    setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
    setChosenMemberBoArticles: (data: BoArticle[]) =>
        dispatch(setChosenMemberBoArticles(data)),
    setChosenSingleBoArticle: (data: BoArticle) =>
        dispatch(setChosenSingleBoArticles(data)),
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
    retrieveChosenSingleBoArticles,
    (chosenSingleBoArticle) => ({
        chosenSingleBoArticle,
    })
);

export function VisitMyPage(props: any) {
    /** INITIALIZATIONS */
    const {verifiedMemberData} = props;
    const {
        setChosenMember,
        setChosenMemberBoArticles,
        setChosenSingleBoArticle,
    } = actionDispatch(useDispatch());

    const {chosenMember} = useSelector(chosenMemberRetriever);
    const {chosenSingleBoArticle} = useSelector(chosenSingleBoArticleRetriever);
    const {chosenMemberBoArticles} = useSelector(chosenMemberBoArticlesRetriever);
    const [value, setValue] = useState("1");
    const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
    const [memberArticleSearchObj, setMemberArticleSearchObj] =
        useState<SearchMemberArticlesObj>({mb_id: "none", page: 1, limit: 5});

    useEffect(() => {
        if (!localStorage.getItem("member_data")) {
            sweetFailureProvider("Please login first", true, true);
        }

        const communityService = new CommunityApiService();
        communityService.getMemberCommunityArticles(memberArticleSearchObj)
            .then(data => setChosenMemberBoArticles(data))
            .catch((err) => console.log(err));

        const memberService = new MemberApiService();
        memberService.getChosenMember(verifiedMemberData?._id)
            .then((data) => setChosenMember(data))
            .catch((err) => console.log(err));

    }, [memberArticleSearchObj, articlesRebuild]);

    /** HANDLERS */
    const handleChange = (event: any, newValue: string) => {
        setValue(newValue);
    };
    const handlePaginationChange = (event: any, value: number) => {
        memberArticleSearchObj.page = value
        setMemberArticleSearchObj({...memberArticleSearchObj});
    };

    const renderChosenArticleHandler = async (art_id: string) => {
        try {
            const communityService = new CommunityApiService()
            communityService.getChosenArticle(art_id)
                .then((data) => {
                    setChosenSingleBoArticle(data);
                    setValue("5");
                })
                .catch((err) => console.log(err));

        } catch (err: any) {
            console.log(err);
            sweetErrorHandling(err).then()
        }
    }


    return (
        <div className={"my_page"}>
            <Container maxWidth="lg" sx={{mt: "50px", mb: "50px",}}>
                <Stack className={"my_page_frame"} sx={{flexDirection: "row"}}>
                    <TabContext value={value}>
                        <Stack className={"my_page_left"}>
                            <Box display={"flex"} flexDirection={"column"}>
                                <TabPanel value={"1"}>
                                    <Box className={"menu_name"}>Contents</Box>
                                    <Box className={"menu_content"}>
                                        <MemberPosts
                                            chosenMemberBoArticles={chosenMemberBoArticles}
                                            renderChosenArticleHandler={renderChosenArticleHandler}
                                            setArticlesRebuild={setArticlesRebuild}
                                        />
                                        <Stack
                                            sx={{my: "40px"}}
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Box className={"bottom_box"}>
                                                <Pagination
                                                    count={memberArticleSearchObj.limit}
                                                    page={memberArticleSearchObj.page}
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
                                                    onChange={handlePaginationChange}
                                                />
                                            </Box>
                                        </Stack>
                                    </Box>
                                </TabPanel>
                                <TabPanel value={"2"}>
                                    <Box className={"menu_name"}>Followers</Box>
                                    <Box className={"menu_content"}>
                                        <MemberFollowers actions_enabled={true}/>
                                    </Box>
                                </TabPanel>
                                <TabPanel value={"3"}>
                                    <Box className={"menu_name"}>Following</Box>
                                    <Box className={"menu_content"}>
                                        <MemberFollowing actions_enabled={true}/>
                                    </Box>
                                </TabPanel>
                                <TabPanel value={"4"}>
                                    <Box className={"menu_name"}>Maqola yozish</Box>
                                    <Box className={"write_content"}>
                                        <TuiEditor/>
                                    </Box>
                                </TabPanel>
                                <TabPanel value={"5"}>
                                    <Box className={"menu_name"}>tanlangan maqola</Box>
                                    <Box className={"menu_content"}>
                                        <TViewer chosenSingleBoArticle={chosenSingleBoArticle} />
                                    </Box>
                                </TabPanel>
                                <TabPanel value={"6"}>
                                    <Box className={"menu_name"}>Ma'lumotlarni o'zgartirish</Box>
                                    <Box className={"menu_content"}>
                                        <MySettings/>
                                    </Box>
                                </TabPanel>
                            </Box>
                        </Stack>
                        <Stack className={"my_page_right"}>
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
                                            src={"/community/sunat_nur.png"}
                                            className={"order_user_avatar"}
                                        />

                                    </div>
                                    <span className={"order_user_name"}>sunat_nur</span>
                                    <span className={"order_user_prof"}>USER</span>
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
                                     sx={{flexDirection: "row"}}
                                >
                                    <p>Followers: 2</p>
                                    <p>Followings: 2</p>
                                </Box>
                                {/*<p className={"user_desc"}>qushimcha ma'lumotlar mavjud emas</p>*/}
                                <Box
                                    display={"flex"}
                                    justifyContent={"flex-end"}
                                >
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab
                                            style={{flexDirection: "column"}}
                                            value={"4"}
                                            component={(e) => (
                                                <Button variant={"contained"} onClick={() => setValue("4")}>
                                                    Maqola Yozish
                                                </Button>
                                            )}
                                        />
                                    </TabList>
                                </Box>
                            </Box>
                            <Box className={"my_page_menu"}
                                 sx={{flexDirection: "column"}}
                            >
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Stack flexDirection={"column"}>
                                        <Tab
                                            style={{flexDirection: "column",}}
                                            value={"1"}
                                            component={() => (
                                                <div className={`menu_box ${value}`} onClick={() => setValue("1")}>
                                                    <img src={"/icons/Pencil.svg"} alt=""/>
                                                    <span>My Contents</span>
                                                </div>
                                            )}
                                        />
                                        <Tab
                                            style={{flexDirection: "column",}}
                                            value={"2"}
                                            component={() => (
                                                <div className={`menu_box ${value}`} onClick={() => setValue("2")}>
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