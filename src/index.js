const KEYS = {
    END: 35,
    HOME: 36,
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    DELETE: 46
};

document.querySelectorAll('.nav-tabs .nav-link').forEach(item => {
    item.addEventListener('click', e => clickEventListener(e))
    item.addEventListener('keyup', e => keyupEventListener(e))
})

export const clickEventListener = (e) => activateTab(e.target)

const keyupEventListener = (e) => {
    let key = e.keyCode
    let currTab = e.target
    switch (key) {
        case KEYS.END:
            activateLastTab(currTab)
            break
        case KEYS.HOME:
            activateFirstTab(currTab)
            break
        case KEYS.LEFT:
            activateLeftTab(currTab)
            break
        case KEYS.RIGHT:
            activateRightTab(currTab)
            break
        case KEYS.UP:
            activateUpTab(currTab)
            break 
        case KEYS.DOWN:
            activateDownTab(currTab)
            break 
        case KEYS.DELETE:
            deleteTab(currTab)
            break                                    
    }
}

export const activateLastTab = (currTab) => {
    let tabs = getTabs(currTab)
    if (tabs.length > 0) { activateTab(tabs[tabs.length-1]) }
}

const activateFirstTab = (currTab) => {
    let tabs = getTabs(currTab)
    if (tabs.length > 0) { activateTab(tabs[0]) }
}

const activateLeftTab = (currTab) => {
    if (currTab.dataset.orientation != "vertical") {
        switchTab(currTab, "decrease")
    }
}

const activateRightTab = (currTab) => {
    if (currTab.dataset.orientation != "vertical") {
        switchTab(currTab)
    }
}

const activateUpTab = (currTab) => {
    if (currTab.dataset.orientation == "vertical") {
        switchTab(currTab, "decrease")
    }
}

const activateDownTab = (currTab) => {
    if (currTab.dataset.orientation == "vertical") {
        switchTab(currTab)
    }
}

/**
 * Switch tab with keyboard
 * 
 * @param {HTMLElement} currTab
 * @param {string} dir 
 */
export const switchTab = (currTab, dir="increase") => {
    let tabs = getTabs(currTab)
    if (tabs && tabs.length > 1) {
        let index = tabs.indexOf(currTab)
        if (dir == "decrease") {
            if (index > 0) {
                activateTab(tabs[index - 1])
            }
        } else {
            if (index < tabs.length - 1) {
                activateTab(tabs[index + 1])
            }
        }
    }
}

/**
 * Activate a tab so it is highlighted and its corresponding pane is shown
 * 
 * @param {*} currTab 
 */
export const activateTab = (currTab) => {
    currTab.focus()
    updateTabs(currTab)
    updatePanes(document.querySelector(currTab.dataset.targetPane))
}

/**
 * Get all tabs in an array
 * 
 * @param {HTMLElement} currTab 
 */
const getTabs = (currTab) => getParentChildren(currTab, null).filter(e => hasClass(e,"nav-link"))

/**
 * Update the tabs status
 * 
 * @param {HTMLElement} currTab 
 */
const updateTabs = (currTab) => toggleActiveClass(currTab, "nav-link")

/**
 * Update the pane status
 * 
 * @param {HTMLElement} currPane 
 */
const updatePanes = (currPane) => {
    toggleActiveClass(currPane, "tab-pane")
}

/**
 * Get node siblings
 * 
 * @param {HTMLElement} node 
 */
const getSiblings = (node) => getParentChildren(node, node)

const removeClass = (e, className) => e.classList.remove(className)

const addClass = (e, className) => e.classList.add(className)

const hasClass = (e, className) => e.classList.contains(className)

/**
 * Delete selected tab and it's according pane
 * 
 * @param {HTMLElement} currTab 
 */
export const deleteTab = (currTab) => {
    let pane = document.querySelector(currTab.dataset.targetPane);
    pane.parentElement.removeChild(pane);
    currTab.parentElement.removeChild(currTab);
};

/**
 * Only toggle the node with specified class name
 * 
 * @param {HTMLElement} node 
 * @param {string} className 
 */
export const toggleActiveClass = (node, className) => {
    addClass(node, "active");

    getSiblings(node)
        .filter(e => hasClass(e, className))
        .forEach(e => removeClass(e, "active"))
}

/**
 *  Return current node's parent's all children
 *
 *  @param  currNode    current node
 *  @param  skipMe      the child to be escaped
 * 
 *  @return 
 */
export const getParentChildren = (currNode, skipMe) => {
    let r = [];
    let n = currNode.parentNode.firstChild

    for (; n; n = n.nextSibling)
        if (n.nodeType == 1 && n != skipMe)
            r.push(n);

    return r;
};