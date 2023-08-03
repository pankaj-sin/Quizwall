import { Button, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import loginImg from "../../assets/img/loginImg.png";
import LoadingUI from "../../comman/LoadingUI";
import SnackBarUI from "../../comman/SnackBarUI";
import Style from "../../css/screens/Login.module.scss";
import { loginAction } from "../../redux/auth/login";
import { app } from "../../services/firebase";
import LocationBackDrop from "./LocationBackDrop";

const provider = new GoogleAuthProvider();


export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { search } = useLocation();

    const query = new URLSearchParams(search);
    const platform = query.get("platform");
    const pwa_reward_user_id = query.get("user_id");
    const publisher_id = query.get("publisher_id");

    const isAuthenticatedPublisherId = JSON.parse(
        localStorage.getItem("pwa_publisher_id")
    );
    const platform_local = JSON.parse(localStorage.getItem("pwa_platfrom"));
    const token = JSON.parse(localStorage.getItem("pwa_token"));

    const request = window.indexedDB.open("pwa_db", 1);

    request.onerror = () =>
    // event
    { };

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore("platform", { keyPath: platform });
    };

    const loginSelector = useSelector((state) => state.login);
    const { status, message } = loginSelector;
    const addUserLocationSelector = useSelector((state) => state.addUserLocation);
    const { status: locationStatus, message: locationMessage } =
        addUserLocationSelector;

    const [snack, setSnack] = useState(false);
    const [locationSnack, setLocationSnack] = useState(false);
    const [location, setLocation] = useState({});
    const [backDrop, setBackDrop] = useState(false);
    const [locationAccess, setLocationAccess] = useState(false);

    // fn
    const handleLogin = async () => {
        navigate("/home");

        // setBackDrop(true);
        // const auth = getAuth(app);
        // const response = await signInWithPopup(auth, provider);
        // const user = response?.user;
        // const { email, displayName } = user;
        // const loginData = await dispatch(
        //     loginAction({
        //         publisher_id: publisher_id,
        //         user_id: pwa_reward_user_id,
        //         platform: platform,
        //         name: displayName,
        //         email: email,
        //         lat: location?.lat,
        //         long: location?.long,
        //     })
        // );

        // if (loginData?.payload?.status == 200) {
        //     localStorage.setItem(
        //         "pwa_user_id",
        //         JSON.stringify(loginData?.payload?.data?._id)
        //     );
        //     localStorage.setItem(
        //         "pwa_publisher_id",
        //         JSON.stringify(loginData?.payload?.data?.publisher_id)
        //     );
        //     localStorage.setItem(
        //         "pwa_platfrom",
        //         JSON.stringify(loginData?.payload?.data?.platform)
        //     );
        //     localStorage.setItem(
        //         "pwa_token",
        //         JSON.stringify(loginData?.payload?.token)
        //     );
        //     window.location.reload();
        //     setSnack(true);
        // }
        // setSnack(true);
        // setBackDrop(false);
    };

    // location given or not
    navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
            permissionStatus.onchange = () => {
                setBackDrop(true);
                if (permissionStatus.state == "granted") {
                    setLocationAccess(true);
                } else {
                    setLocationAccess(false);
                    setBackDrop(false);
                    setLocationSnack(true)
                }
            };
        });

    const locationSuccessCallback = async (position) => {

        if (position?.coords?.latitude && position?.coords?.longitude) {
            setLocation({
                lat: position?.coords?.latitude,
                long: position?.coords?.longitude,
            });
            setBackDrop(false);
        }
    };

    const locationErrorCallback = (error) => {
        if (error?.GeolocationPositionError?.code == 1) {
            setLocation({});
        }
    };

    let userLocation = async () => {
        navigator.geolocation.getCurrentPosition(
            locationSuccessCallback,
            locationErrorCallback
        );
    };

    // use effect
    // get location
    useEffect(() => {
        userLocation();
    }, []);

    useEffect(() => {
        localStorage.setItem("pwa_platfrom", JSON.stringify(platform));
        localStorage.setItem("pwa_reward_user_id", JSON.stringify(pwa_reward_user_id));
        localStorage.setItem("pwa_publisher_id", JSON.stringify(publisher_id));
    }, []);

    useEffect(() => {
        if (Object?.keys(location)?.length) {
            setLocationAccess(true);
        }
    }, [location]);

    useEffect(() => {
        window.addEventListener("beforeunload", (event) => {
            event.preventDefault();
        });
    }, []);

    useEffect(() => {
        if (isAuthenticatedPublisherId && token && platform_local) {
            navigate("/survey");
        }
    }, []);

    return (
        <>
            <Stack
                alignItems={"center"}
                sx={{ p: 2, height: "100vh" }}
                justifyContent={"center"}
            >
                <Stack
                    alignItems={"center"}
                    sx={{ p: 2, height: "100%" }}
                    justifyContent={"center"}
                    spacing={2}
                >
                    <Stack alignItems={"center"} spacing={1}>
                        <Stack sx={{ my: 2, width: "100%" }} alignItems="center">
                            <img src={loginImg} width={"100%"} className={Style.infoImage} />
                        </Stack>
                        <Stack spacing={2} alignItems="center">
                            <Typography variant="h4">Welcome !</Typography>
                            <Typography align="center" variant="subtitle1">
                                {`Best place to earn daily rewards by playing`}
                                <span style={{ fontSize: "1.2rem ", color: "#071D45", marginLeft: '10px' }}>
                                    Quiz wall.
                                </span>
                            </Typography>
                        </Stack>
                    </Stack>

                    {/* {!locationAccess || location == {} ? (
                        <LoadingUI />
                    ) : ( */}
                        <Button
                            onClick={handleLogin}
                            variant="contained"
                            sx={{ mt: 2 }}
                            type="submit"
                            size="large"
                            fullWidth
                        >
                            Login / Register
                        </Button>
                    {/* )} */}
                </Stack>
            </Stack>
            <SnackBarUI
                state={snack}
                setState={setSnack}
                status={status || locationStatus}
                message={message || locationMessage}
            />
            {backDrop && <LocationBackDrop state={backDrop} />}
            <SnackBarUI snackActiveTime={10000} state={locationSnack} setState={setLocationSnack} status={404} messageHtml={
                <>
                    <Typography variant="h6">Please Allow location permission to see survey wall.</Typography>
                    <List
                        sx={{ mt: 2 }}
                        subheader={
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>How to allow your location permission ?</Typography>
                        }>
                        <ListItem disablePadding>
                            <ListItemText primary="Step 1 : Click on info button at the top of your browser." />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText primary="Step 2 : Go to location section and click on reset button then refresh your page." />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText primary="Step 3 : You will be able to see the permission popup." />
                        </ListItem>
                    </List>
                </>
            }
            />
        </>
    );
}
