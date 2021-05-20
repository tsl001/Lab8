/**
 * @jest-environment jsdom
 */
import { pushToHistory } from '../scripts/router.js';


describe('settings state push',() =>{
    var stackState = pushToHistory('settings',1);

    test('Adds a state to history,expects history length to be 2', () => {
        console.log(window.location.href);
        expect(stackState.length).toBe(2); 
    });

    test('Adds a state to history,expects latest state to be the pushed state', () => {
        console.log(window.location.href);
        expect(stackState.state.page).toBe('settings'); 
    });
});

describe('entry state push',() =>{
    var stackStateEntry = pushToHistory('entry',8);

    test('Adds an entry to History and expects the entry number to be 8', () => {
        //console.log(window.location.href);
        expect(stackStateEntry.state.page).toBe("entry8"); 
    });

    test('Adds an entry and expects url to be http://localhost/#entry8', () => {
        console.log(stackStateEntry.url);
        expect(stackStateEntry.url).toBe('http://localhost/#settings'); 
    });
});
