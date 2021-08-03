const createNewPost = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const post_title = document.querySelector('#post-title');
    const post_message = document.querySelector('#post-message');

    if (post_title && post_message) {
        const response = await fetch('/api/posts/createpost', {
            method: 'POST',
            body: JSON.stringify({ post_title, post_message }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
            response.json().then(data => {
                alert(data.message);
            });
        } else {
            document.location.reload('/addpost');
            response.json().then(data => {
                alert(data.message);
            });
        }
    } else {
        document.location.reload('/addpost');
        alert('Please provide a post title and message.')
    };
};

document   
    .querySelector('#create-post')
    .addEventListener('click', createNewPost);