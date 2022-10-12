import {TrackActionTypes, TracksAction, TrackState} from "../../types/track";


const initialState: TrackState = {
    tracks: [],
    error: null
}

export const trackReducer = (state = initialState, action: TracksAction): TrackState => {
    switch (action.type) {
        case TrackActionTypes.FETCH_TRACKS:
            return {...state, tracks: action.payload}
        case TrackActionTypes.FETCH_TRACKS_ERROR:
            return {...state, error: action.payload}
        default:
            return state
    }
}