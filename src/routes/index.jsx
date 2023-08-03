import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from '../screen/account/Account';
import Login from '../screen/auth/Login';
// import Register from '../screen/auth/Register';
import NotFound from "../screen/NotFound";
import QuestionAnswer from '../screen/question-answer/QuestionAnswer';
// import Splash from '../screen/splash/Splash';
// import Feedback from '../screen/feedback/Feedback';
import Home from '../screen/user/home/Home';
import Subcategory from '../screen/user/subcategory/subcategory';
import Mission from '../screen/user/mission/mission'
import MissionDetails from '../screen/user/mission-details/missiondetails'
import Qna from '../screen/user/qna/qna'
import ProtectedRoute from './ProtectedRoute';
// import PrivacyPolicy from '../screen/policy/PrivacyPolicy';
import Profile from '../screen/profile/Profile';


export default function Index() {

    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/pwa/api/save-user-callback" element={<Splash />} /> */}

                 <Route path="/home" element={<Home />}/>
                <Route path="/account" element={<Account />}/>
                <Route path="/qns-ans" element={<QuestionAnswer />} />
                {/* <Route path="/feedback/:survey_id" element={<Feedback />} /> */}
                {/* <Route path="/privacy-policy" element={<PrivacyPolicy />}/> */}
                <Route path="/profile" element={<Profile />}/> 
                <Route path="/sub-category" element={<Subcategory />}/>
                <Route path="/missions" element={<Mission />}/>
                <Route path="/mission-detail" element={<MissionDetails />}/>
                <Route path="/mission-qna" element={<Qna />}/>

                {/* <Route path="/survey" element={<ProtectedRoute><Survey /></ProtectedRoute>} />
                <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
                <Route path="/qns-ans" element={<ProtectedRoute><QuestionAnswer /></ProtectedRoute>} />
                <Route path="/feedback/:survey_id" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
                <Route path="/privacy-policy" element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> 

                {/* <Route path="/" element={<Splash />} /> */}
                <Route path="/" element={<Login />} />
                {/* <Route path="/register" element={<Register />} /> */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}
