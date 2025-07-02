
function add_to(child, parent) {
    if (!parent.contains(child)) {
        parent.appendChild(child);
    }
} 

function remove_to(child, parent) {
    if (parent.contains(child)) {
        parent.removeChild(child);
    }
}

export { add_to, remove_to }