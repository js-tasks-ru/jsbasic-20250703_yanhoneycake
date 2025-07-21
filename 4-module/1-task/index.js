function makeFriendsList(friends) {
    const ul = document.createElement('ul');
    
    friends.forEach(friend => {
        const li = document.createElement('li');
        const fullName = `${friend.firstName} ${friend.lastName}`;
        
        li.textContent = fullName;
        ul.appendChild(li);
    });

    return ul;
}
