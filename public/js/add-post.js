const addPostHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    document.location.replace('addpost');
}

document
    .querySelector('#add-post-btn')
    .addEventListener('click', addPostHandler);