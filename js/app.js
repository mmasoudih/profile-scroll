getProfile()
    .then(data => {
        let profile = nextUser(data);
        let user = profile.next().value;
        showProfile(user);
        document.querySelector('button').addEventListener('click',e=>{
            user = profile.next().value;
            if(user !== undefined){
                showProfile(user);
            }else{
                profile = nextUser(data);
                user = profile.next().value;
                showProfile(user);
            }
        });
    });
function* nextUser(data) {
    for (let user of data) {
        yield user;
    }
}
function showProfile(user) {
    console.log(user);
    let profileContent = document.querySelector('.display-profile');

    profileContent.innerHTML = `
        <img src="${user.picture.large}" class="uk-border-circle uk-animation-scale-up">
        <ul class="uk-list uk-list-striped uk-animation-slide-top-small">
            <li>${user.name.first} ${user.name.last}</li>
            <li>${user.phone}</li>
            <li>${user.location.country}</li>
        </ul>
        
    `;
}
async function getProfile() {
    showLoading();
    return await fetch('https://randomuser.me/api/?results=100')
        .then(res => res.json() )
        .then(data => data.results)
        .catch(err => err)
        .finally( ()=>{ setTimeout(()=>{hideLoading();},1000) });
}

function showLoading() {
    let loading = `
        <div class="uk-position-fixed uk-position-cover uk-overlay uk-overlay-default uk-flex uk-flex-center uk-flex-middle uk-position-z-index uk-animation-fade">
            <span uk-spinner="ratio: 6.5"></span>
        </div>
        `;
    document.querySelector('body').insertAdjacentHTML('afterbegin',loading);
}
function hideLoading() {
    document.querySelector('.uk-position-fixed').remove();
}