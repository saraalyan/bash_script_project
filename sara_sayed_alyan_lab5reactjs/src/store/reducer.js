//بيقارن القيم الموجوده بالقيم الي عايزه تتغير 
const INITIAL_VALUE = {
    lang: "en"
    }
    export default function languageReducer(state =
    INITIAL_VALUE, action){
    switch(action.type){
    case "CHANGE_LANG":
    return{
    ...state,
    lang: action.payload
    
    }
    default:
    return state
    }
}
