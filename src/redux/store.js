import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { loginReducer } from './auth/login'
import { registerReducer } from './auth/register'
import { addProfileDetailsReducer } from './profile/addProfileDetails'
import { addUserLocationReducer } from './user/addUserLocation'
import { completeSurveyReducer } from './user/completeSurvey'
import { completeSurveyCountReducer } from './user/completeSurveyCount'
import { appUsesDataReducer } from './user/defaultQns/appUses'
import { userLocationDataReducer } from './user/defaultQns/locationData'
import { feedbackReducer } from './user/feedback'
import { getUserDetailsReducer } from './user/getUserDetails'
import { pendingSurveyCountReducer } from './user/pendingSurvey'
import { addSurveyAttmptsReducer } from './user/qns-ans/addSurveyAttempts'
import { getIncorrectAnsReducer } from './user/qns-ans/getIncorrectAns'
import { getQnsAnsReducer } from './user/qns-ans/getQnsAns'
import { qnsCountReducer } from './user/qns-ans/questionCount'
import { submitQnsAnsReducer } from './user/qns-ans/submitQnsAns'
import { userRewardToGpReducer } from './user/userRwardToGP'
import { userSaveCallbackReducer } from './user/userSaveCallback'
import { userVisibleTaskCountReducer } from './user/visibleTaskCount'
import { getCategoryReducer } from './screen/category'
import { getMissionReducer } from './screen/mission'
import { getBannerReducer } from './screen/banner'
import { getSubCategoryReducer } from './screen/subcategory'
import { getMissionBySubCatReducer } from './screen/missionbysubcategory'
import { getMissionDetailReducer } from './screen/missiondetails'
import { getQnaReducer } from './screen/getqna'
import { submitReducer } from './screen/submit'





// combine reducer
const rootReducer = combineReducers({
    // auth  -------
    login: loginReducer,
    register: registerReducer,
    addUserLocation: addUserLocationReducer,
    // screen -----
    
    getCategory:getCategoryReducer,
    getMission:getMissionReducer,
    getBanner:getBannerReducer,
    getSubcategory:getSubCategoryReducer,
    getMissionBySubCat:getMissionBySubCatReducer,
    getMissionDetail:getMissionDetailReducer,
    getQna:getQnaReducer,
    submit:submitReducer,

    // user  -------
    getUserDetails: getUserDetailsReducer,
    pendingSurveyCount: pendingSurveyCountReducer,
    completeSurvey: completeSurveyReducer,
    completeSurveyCount: completeSurveyCountReducer,
    userSaveCallback: userSaveCallbackReducer,
    submitQnsAns: submitQnsAnsReducer,
    feeback: feedbackReducer,
    userVisibleTaskCount: userVisibleTaskCountReducer,
    userRewardToGp: userRewardToGpReducer,
    // user-->default qns
    userLocationData: userLocationDataReducer,
    appUsesData: appUsesDataReducer,
    // qns ans
    getQnsAns: getQnsAnsReducer,
    qnsCount: qnsCountReducer,
    addSurveyAttmpts: addSurveyAttmptsReducer,
    getIncorrectAns: getIncorrectAnsReducer,
    
    // profile
    addProfileDetails: addProfileDetailsReducer

})

const store = configureStore({
    reducer: rootReducer,
})

export default store