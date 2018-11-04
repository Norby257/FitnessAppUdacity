export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES' //fetch data 
export const ADD_ENTRY = "ADD_ENTRY" // submit 


export function receiveEntries (entries) {
    return {
        type: RECEIVE_ENTRIES,
        entries
    }
}

export function addEntry (entry) {
    return {
        type: ADD_ENTRY,
        entry
    }
}