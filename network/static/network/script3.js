document.addEventListener('DOMContentLoaded', () => {
    const following_page = document.querySelector('#following-page')

    const posts = document.querySelector('#posts')
    load_posts(posts, 1)
})

load_posts = (posts, num) => {
    posts.innerHTML = ''
    console.log(num)
    fetch(`/posts/following-page/${num}`)
    .then(response => response.json())
    .then(data => {
        console.log(data.posts)
        data.posts.forEach(post => {
            console.log(post)
            const div = document.createElement('div')
            div.className = 'post-div'
            const b = document.createElement('b')
            const a1 = document.createElement('a')
            a1.innerHTML = post.poster
            a1.className = 'profile-link'
            a1.href = `/profile/${post.poster}`
            b.append(a1)
            div.append(b)
            div.innerHTML += `<div id="content-${post.id}">${post.content}</div>${post.timestamp}<br><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-suit-heart-fill" viewBox="0 0 16 16"><path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/></svg> ${post.likes}`
            posts.append(div)
            if (username === post.poster) {
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
                        fetch('/new-post', {
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
                div.innerHTML += '<br>'
                div.append(a2)
            }
        })
        if (!data.previous && !data.next) {
            document.querySelector('#nav').style.display = 'none'
        } else if (!data.previous) {
            document.querySelector('#nav').style.display = 'block'
            document.querySelector('#previous').style.display = 'none'
            document.querySelector('#next').style.display = 'block'
            document.querySelector('#next').addEventListener('click', () => {
                console.log(num)
                load_posts(posts, num+1)
            })
        } else if (!data.next) {
            document.querySelector('#nav').style.display = 'block'
            document.querySelector('#previous').style.display = 'block'
            document.querySelector('#next').style.display = 'none'
            document.querySelector('#previous').addEventListener('click', () => {
                load_posts(posts, num-1)
            })
        } else {
            document.querySelector('#previous').style.display = 'block'
            document.querySelector('#nav').style.display = 'block'
            document.querySelector('#next').addEventListener('click', () => {
                load_posts(posts, num+1)
            })
            document.querySelector('#previous').addEventListener('click', () => {
                load_posts(posts, num-1)
            })
        }
    })
}