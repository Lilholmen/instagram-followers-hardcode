addToPage(...analize());

function addToPage(mutually, selfNotMutual, notMutual) {
  const mutuallyContainer = document.querySelector('#mutually');
  const selfNotMutualContainer = document.querySelector('#self-not-mutual');
  const notMutualContainer = document.querySelector('#not-mutual');

  mutually.forEach((item) => mutuallyContainer.append(createPerson(item)));
  selfNotMutual.forEach((item) =>
    selfNotMutualContainer.append(createPerson(item))
  );
  notMutual.forEach((item) => notMutualContainer.append(createPerson(item)));
}

function createPerson(data) {
  const person = document.createElement('div');
  const personPic = document.createElement('img');
  const personName = document.createElement('h3');
  const personTitle = document.createElement('span');

  person.classList.add('person');
  person.id = data.name;
  personPic.classList.add('person__pic');
  personName.classList.add('person__name');
  personTitle.classList.add('person__title');

  personPic.src = data.pic;
  personName.textContent = data.name;
  personTitle.textContent = data.title;

  person.addEventListener('click', () => {
    document.location.href = `http://www.instagram.com/${person.id}`;
  });

  person.append(personPic, personName, personTitle);

  return person;
}

function analize() {
  const mutually = [];
  const selfNotMutual = [];
  const notMutual = [];

  [followers, follows] = collectData();

  const followersVal = followers.map((item) => item.name);
  const followsVal = follows.map((item) => item.name);

  for (let i = 0; i < followers.length; i++) {
    const cur = followers[i];

    if (followsVal.includes(cur.name)) {
      mutually.push(cur);
      followersVal.splice(followersVal.indexOf(cur.name), 1);
      followsVal.splice(followsVal.indexOf(cur.name), 1);
    } else {
      selfNotMutual.push(cur);
      followersVal.splice(followersVal.indexOf(cur.name), 1);
    }
  }

  follows.forEach((item) => {
    if (followsVal.includes(item.name)) {
      notMutual.push(item);
    }
  });

  return [mutually, selfNotMutual, notMutual];
}

function collectData() {
  const followers = [];
  const follows = [];

  let profilePic = document.querySelectorAll('.raw-data-followers ._6q-tv');
  let profileName = document.querySelectorAll('.raw-data-followers .FPmhX');
  let profileTitle = document.querySelectorAll('.raw-data-followers .wFPL8');

  for (let i = 0; i < profileName.length; i++) {
    const follower = {};

    follower.name = profileName[i].title;
    follower.pic = profilePic[i].src;
    follower.title = profileTitle[i].textContent;

    followers.push(follower);
  }

  profilePic = document.querySelectorAll('.raw-data-follows ._6q-tv');
  profileName = document.querySelectorAll('.raw-data-follows .FPmhX');
  profileTitle = document.querySelectorAll('.raw-data-follows .wFPL8');

  for (let i = 0; i < profileName.length; i++) {
    const follow = {};

    follow.name = profileName[i].title;
    follow.pic = profilePic[i].src;
    follow.title = profileTitle[i].textContent;

    follows.push(follow);
  }

  return [followers, follows];
}
