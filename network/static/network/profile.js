let page_num = 1
let user_username = ''
let poster_username = ''
const dislike_button_html = '<button class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16"><path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"></path></svg> Dislike</button>'
const like_button_html = '<button class="btn btn-outline-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16"><path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"></path></svg> Like</button>'
const like_button_inner_html = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16"><path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"></path></svg> Like'
const dislike_button_inner_html = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16"><path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"></path></svg> Dislike'
let y = 0
const follow_form = null
let followValue = 0

document.addEventListener('DOMContentLoaded', () => {
    y = window.scrollY
    const index = document.querySelector('#posts-link')
    const following = document.querySelector('#following-link')
    index.innerHTML = 'All Posts'
    following.innerHTML = 'Following'
    const page_div = document.querySelector('#profile-page')

    try{
        user_username = document.querySelector('#username').innerHTML
        console.log(user_username)
        const posts_div = document.querySelector('#posts-div')
        poster_username = document.querySelector('#poster-username').innerHTML
        load_data(poster_username)
        // console.log('Printing Posts')
        load_posts(posts_div, page_num, poster_username)
        // console.log('Printed Posts')
        console.log(`load_data(${poster_username}, ${posts_div}), load_posts(${posts_div}, ${page_num}, ${poster_username})`)
        document.querySelector('#next').addEventListener('click', () => {
            console.log('Clicked')
            load_posts(posts_div, page_num+1, poster_username)
            page_num += 1
        })
        document.querySelector('#previous').addEventListener('click', () => {
            load_posts(posts_div, page_num-1, poster_username)
            page_num -= 1
        })
        follow_form = document.querySelector('#follow-form')
        follow_form.addEventListener('submit', () => {
            fetch(`/follow/${poster_username}`, {
                method: 'PUT',
                body: JSON.stringify({
                    follow: followValue
                })
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
            });
        })
    } catch(e) {
        console.log(e)
        page_div.innerHTML = 'Please log in to view the posts'
    }
    setTimeout(function(){
        window.scrollTo(window.scrollX, y)
    },700);
    console.log(follow_form.onsubmit)

})

load_posts = (posts_div, num, username) => {
    console.log(`${posts_div}, ${num}, ${username}`)
    posts_div.innerHTML = ''
    fetch(`/profile-api/${poster_username}/${num}`)
    .then(response => response.json())
    .then(data => {
        data.posts.forEach(post => {
            console.log('Creating')
            console.log(post)
            const post_div = document.createElement('div')
            post_div.className = 'post-div'
            const b = document.createElement('b')
            const a1 = document.createElement('a')
            a1.innerHTML = post.poster
            a1.className = 'profile-link'
            a1.href = `/profile/${post.poster}`
            b.append(a1)
            post_div.append(b)
            post_div.innerHTML += `<div id="content-${post.id}">${post.content}</div>${post.timestamp}<br><svg id="post-like-${post.id}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-suit-heart-fill" viewBox="0 0 16 16"><path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/></svg> ${post.likes}`
            posts_div.append(post_div)
            if (user_username === post.poster) {
                const a2 = document.createElement('button')
                a2.className = 'btn btn-outline-primary'
                a2.innerHTML = 'Edit'
                a2.addEventListener('click', () => {
                    const text = document.createElement('textarea')
                    text.id = `content${post.id}`
                    text.className = 'form-control'
                    text.innerHTML = post.content
                    const save = document.createElement('button')
                    save.className = 'btn btn-outline-primary'
                    save.innerHTML = 'Save'
                    save.onclick = () => {
                        const content = document.querySelector(`#content${post.id}`).value
                        fetch(`/edit-post/${post.id}`, {
                            method: 'POST',
                            body: JSON.stringify({
                                content: content
                            })
                        })
                        .then(response => response.json())
                        .then(result => {
                            console.log(result);
                        });
                        a2.style.display = 'block'
                        document.querySelector(`#content-${post.id}`).innerHTML = content
                    }
                    document.querySelector(`#content-${post.id}`).innerHTML = '<br>'
                    document.querySelector(`#content-${post.id}`).append(text)
                    document.querySelector(`#content-${post.id}`).innerHTML += '<br>'
                    document.querySelector(`#content-${post.id}`).append(save)
                    a2.style.display = 'none'
                })
                post_div.innerHTML += `<br>`
                post_div.append(a2)
            } else {
                const dive = document.createElement('div')
                dive.className = 'form-check form-switch'
                const like_label = document.createElement('label')
                like_label.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16"><path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"></path></svg> Like'
                like_label.className = 'form-check-label'
                like_label.for = 'flexSwitchCheckChecked'
                like_label.style.color = 'blue'
                const like_checkbox = document.createElement('input')
                like_checkbox.className = 'form-check-input'
                like_checkbox.type = 'checkbox'
                like_checkbox.id = 'flexSwitchCheckChecked'

                if(post.liked === 1){
                    like_checkbox.checked = true
                } else {
                    like_checkbox.checked = false
                }

                like_checkbox.addEventListener('change', () => {
                    setTimeout(function(){
                        load_posts(posts_div, num, username)
                    },500);
                    console.log('Liking')
                    fetch(`/posts/${post.id}/like`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            like: 1
                        })
                    })
                    console.log('Liked')
                    if(post.liked === 1){
                        post_div.innerHTML = post_div.innerHTML.replace(`${post.likes}<br>`,`${post.likes - 1}<br>`)
                    } else {
                        post_div.innerHTML = post_div.innerHTML.replace(`${post.likes}<br>`,`${post.likes + 1}<br>`)
                    }
                    // if(post.liked === 1){
                    //     post.liked = 0
                    //     console.log(post.liked)
                    //     div.innerHTML = div.innerHTML.replace(`${post.likes}<br>`,`${post.likes - 1}<br>`)
                    // } else {
                    //     post.liked = 1
                    //     console.log(post.liked)
                    //     like_checkbox.checked = true
                    //     console.log(like_checkbox.checked)
                    //     div.innerHTML = div.innerHTML.replace(`${post.likes}<br>`,`${post.likes + 1}<br>`)
                    // }
                    // if(post.liked === 1){
                    //     like_checkbox.checked = true
                    // } else {
                    //     like_checkbox.checked = false
                    // }
                    // console.log(like_checkbox.checked)
                    y = window.scrollY

                })

                dive.append(like_label)
                dive.append(like_checkbox)

                post_div.append(dive)
            }
        })
        // if (!data.previous && !data.next) {
        //     document.querySelector('#nav').style.display = 'none'
        //     document.querySelector('#previous').style.display = 'none'
        //     document.querySelector('#next').style.display = 'none'
        // } else if (!data.previous && data.next) {
        //     document.querySelector('#nav').style.display = 'block'
        //     document.querySelector('#previous').style.display = 'none'
        //     document.querySelector('#next').style.display = 'block'
        //     // document.querySelector('#next').addEventListener('click', () => {
        //     //     console.log('Clicked')
        //     //     load_posts_page(num+1)
        //     // })
        // } else if (!data.next  && data.previous) {
        //     document.querySelector('#nav').style.display = 'block'
        //     document.querySelector('#previous').style.display = 'block'
        //     document.querySelector('#next').style.display = 'none'
        //     // document.querySelector('#previous').addEventListener('click', () => {
        //     //     load_posts_page(num-1)
        //     // })
        // } else if (data.previous && data.next) {
        //     document.querySelector('#nav').style.display = 'block'
        //     document.querySelector('#previous').style.display = 'block'
        //     document.querySelector('#next').style.display = 'block'
        //     // document.querySelector('#next').addEventListener('click', () => {
        //     //     load_posts_page(num+1)
        //     // })
        //     // document.querySelector('#previous').addEventListener('click', () => {
        //     //     load_posts_page(num-1)
        //     // })
        // }
    })
    setTimeout(function(){
        window.scrollTo(window.scrollX, y)
    },700);
}

const num0 = 1

load_data = (username) => {
    fetch(`/profile-api/${username}/${num0}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector('#follower-count').innerHTML = data.follower
        document.querySelector('#following-count').innerHTML = data.following
        const follow = data.follow
        console.log(data.follow)
        const follow_form = document.querySelector('#follow-form')
        const button = document.querySelector('#follow-button')
        const follow_value = document.querySelector('#follow')
        if (follow === 1) {
            console.log("User doesn't follow")
            button.innerHTML = 'Follow'
            follow_value.value = 1
            button.style.display = 'block'
        } else if (follow === 2) {
            console.log("User already follows")
            button.innerHTML = 'Unfollow'
            follow_value.value = 0
            button.style.display = 'block'
        } else {
            console.log("User is same as the person")
        }
        followValue = data.follow
        // follow_form.onsubmit = () => {
        //     console.log('getting data')
        //     load_data(username)
        // }
    })
}

// subtract = a,b => {
//     var x = a.replace('Hullabalooo', '')
//     return x
// }
// 
// like = {
    
// }