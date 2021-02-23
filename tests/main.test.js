import { activateTab, getParentChildren, switchTab, toggleActiveClass, deleteTab } from '../src/index'

describe('index.js unit tests', () => {
    // Set up our document body
    document.body.innerHTML =
        `
        <div class="nav-tabs">
            <button class="nav-link active" id="nav-home-tab" type="button" data-target-pane="#nav-home">Home</button>
            <button class="nav-link" id="nav-profile-tab" type="button" data-target-pane="#nav-profile">Profile</button>
            <button class="nav-link" id="nav-contact-tab" type="button" data-target-pane="#nav-contact">Contact</button>
        </div>
        <div class="tab-content">
            <div class="tab-pane active" id="nav-home">home</div>
            <div class="tab-pane" id="nav-profile">profile</div>
            <div class="tab-pane" id="nav-contact">content</div>
        </div>
        <hr>
        <div class="nav-vertical">
            <div class="nav-tabs">
                <button class="nav-link active" type="button" data-target-pane="#nav-home-v" data-orientation="vertical">Home</button><br>
                <button class="nav-link" type="button" data-target-pane="#nav-profile-v" data-orientation="vertical">Profile</button><br>
                <button class="nav-link" type="button" data-target-pane="#nav-contact-v" data-orientation="vertical">Contact</button><br>
            </div>
            <div class="tab-content">
                <div class="tab-pane active" id="nav-home-v">home</div>
                <div class="tab-pane" id="nav-profile-v">profile</div>
                <div class="tab-pane" id="nav-contact-v">content</div>
            </div>
        </div>
    `

    /**
     * Test getParentChildren function.
     * 
     * When this function is called with selected node, the selected node with its siblings will 
     * be returned in an array.
     */
    test('getParentChildren', () => {
        const currentNode = document.getElementById('nav-home-tab')
        const children = getParentChildren(currentNode)

        expect(children[0].getAttribute('id')).toBe('nav-home-tab')
        expect(children[1].getAttribute('id')).toBe('nav-profile-tab')
        expect(children[2].getAttribute('id')).toBe('nav-contact-tab')
    })

    /**
     * Test activateTab function.  
     * 
     * When this function is called with selected tab, the active class will be added to this tab 
     * and the other tab's active class will be removed.  And the according pane will be updated
     * as well.
     */
    test('activateTab', () => {
        const currentNode = document.getElementById('nav-profile-tab')

        activateTab(currentNode)

        expect(document.getElementById('nav-home-tab').classList.contains("active")).toBe(false)
        expect(document.getElementById('nav-profile-tab').classList.contains("active")).toBe(true)
        expect(document.getElementById('nav-contact-tab').classList.contains("active")).toBe(false)

        expect(document.getElementById('nav-home').classList.contains("active")).toBe(false)
        expect(document.getElementById('nav-profile').classList.contains("active")).toBe(true)
        expect(document.getElementById('nav-contact').classList.contains("active")).toBe(false)
    })

    /**
     * Test switchTab function.
     * 
     * This function is called when user hit the arrows keyboard.  It updates the selected tabs
     * and shown panes based on the tab UI orientation and arrow keys.
     */
    test('switchTab', () => {
        const currentNode = document.getElementById('nav-home-tab')

        switchTab(currentNode)

        expect(document.getElementById('nav-home-tab').classList.contains("active")).toBe(false)
        expect(document.getElementById('nav-home').classList.contains("active")).toBe(false)
        expect(document.getElementById('nav-profile-tab').classList.contains("active")).toBe(true)
        expect(document.getElementById('nav-profile').classList.contains("active")).toBe(true)

        const currentNode2 = document.getElementById('nav-profile-tab')

        switchTab(currentNode2, "decrease")

        expect(document.getElementById('nav-home-tab').classList.contains("active")).toBe(true)
        expect(document.getElementById('nav-home').classList.contains("active")).toBe(true)
        expect(document.getElementById('nav-profile-tab').classList.contains("active")).toBe(false)
        expect(document.getElementById('nav-profile').classList.contains("active")).toBe(false)
    })

    /**
     * Test switchTab function.
     * 
     * This function should do nothing when the current tab is the first tab and user
     * clicks the left arraw.
     */
    test('switchTab should do nothing when user clicks the left arraw key when current tab is the first tab', () => {
        const currentNode = document.getElementById('nav-home-tab')

        switchTab(currentNode, "decrease")

        expect(document.getElementById('nav-home-tab').classList.contains("active")).toBe(true)
        expect(document.getElementById('nav-home').classList.contains("active")).toBe(true)
        expect(document.getElementById('nav-profile-tab').classList.contains("active")).toBe(false)
        expect(document.getElementById('nav-profile').classList.contains("active")).toBe(false)
        expect(document.getElementById('nav-contact-tab').classList.contains("active")).toBe(false)
        expect(document.getElementById('nav-contact').classList.contains("active")).toBe(false)
    })

    /**
     * Test toggleActiveClass function.
     * 
     * This function is used when a tab or a pane should be activated, accordingly the other tabs
     * or panes should be de-activated
     */
    test('toggleActiveClass', () => {
        const currentNode = document.getElementById('nav-contact-tab')

        toggleActiveClass(currentNode, "nav-link")

        expect(document.getElementById('nav-home-tab').classList.contains("active")).toBe(false)
        expect(document.getElementById('nav-profile-tab').classList.contains("active")).toBe(false)
        expect(document.getElementById('nav-contact-tab').classList.contains("active")).toBe(true)
    })

    /**
     * Test deleteTab function.
     * 
     * This function is called when user selected a tab and hit delete key
     */
    test('deleteTab', () => {
        const currentNode = document.getElementById('nav-contact-tab')

        deleteTab(currentNode)

        expect(document.getElementById('nav-contact-tab')).toBe(null)
        expect(document.getElementById('nav-contact')).toBe(null)
    })
});