"use strict";

let userName = document.getElementsByClassName("person-avatar name");
let userPosition = document.getElementsByClassName("person-avatar position");
let userLinksContainer = document.getElementsByClassName("person-links items");
let userSkillsList = document.getElementsByClassName("container list-skills");
let userExperience = document.getElementsByClassName("wrapper-content data");
let userEducationList = document.getElementsByClassName(
  "container list-education"
);
let userProfileData = document.getElementsByClassName(
  "wrapper-content profile"
);
let userEnglish = document.getElementsByClassName(
  "wrapper-content__low english"
);
let userProjectImems = document.getElementsByClassName(
  "wrapper-content__low projects"
);
let userRecomendation = document.getElementsByClassName(
  "wrapper-footer recomendation"
);
let userAvatar = document.getElementsByClassName("person-avatar image");
(async () => {
  let promise = await fetch("./data.json").then((res) => res.json());
  let result = await promise;
  userAvatar[0].src = result.avatar;
  userAvatar[0].alt = 'user-avatar';
  console.log(userAvatar[0]);
  userName[0].innerText = result?.fullname;
  userPosition[0].innerText = result?.position;
  userExperience[0].innerText = result?.experience;
  userProfileData[0].innerText = result?.profile;
  userEnglish[0].innerText = result?.language;
  userAvatar[0].innerHTML = result.avatar;
  let liSkills;
  let listSkills = Object.values(result.skills[0]);
  for (let i = 0; i < listSkills.length; i++) {
    liSkills = document.createElement("li");
    liSkills.className = "list-skills item";
    liSkills.append(document.createTextNode(listSkills[i]));
    userSkillsList[0].append(liSkills);
  }
  let liEducationItem;
  let listEducationItem = Object.values(result.education[0]);
  for (let i = 0; i < listEducationItem.length; i++) {
    liEducationItem = document.createElement("li");
    liEducationItem.className = "list-edication item";
    liEducationItem.append(document.createTextNode(listEducationItem[i]));
    userEducationList[0].append(liEducationItem);
  }
  let projectLink;
  let projectLinks = result.projects.split(", ");
  for (let i = 0; i < projectLinks.length; i++) {
    projectLink = document.createElement("a");
    projectLink.href = `https://${projectLinks[i]}`;
    projectLink.target = "blank_";
    projectLink.append(document.createTextNode(projectLinks[i]));
    userProjectImems[0].append(projectLink);
  }
  result?.recommendations.map((item) => {
    let recommendationDiv;
    let reccomendationName;
    let recommendationText;
    let name = Object.keys(item);
    let text = Object.values(item);
    let len = Object.entries(item).length;
    for (let i = 0; i < len; i++) {
      reccomendationName = document.createElement("p");
      reccomendationName.className = "reccomendation-name";
      recommendationDiv = document.createElement("div");
      recommendationDiv.className = "recomendation item";
      recommendationText = document.createElement("p");

      recommendationText.className = "reccomendation-text";
      reccomendationName[i] = reccomendationName.append(name[i]);
      recommendationText[i] = recommendationText.append(text[i]);
      recommendationDiv.append(reccomendationName, recommendationText);
      userRecomendation[0].append(recommendationDiv);
    }
  });
  result.contacts.forEach((element) => {
    let containerItem;
    let containerItemName;
    let containerItemLink;
    let name = Object.keys(element);
    let link = Object.values(element);
    let len = Object.entries(element).length;
    let nameWithUpperFirstLetter = (str) => str[0].toUpperCase() + str.slice(1);
    for (let i = 0; i < len; i++) {
      containerItemName = document.createElement("p");
      containerItemName.className = "items item-description";
      containerItem = document.createElement("div");
      containerItem.className = "items item-container";
      containerItemLink = document.createElement("a");
      containerItemLink.className = "items item-link";
      containerItemLink.target = "blank_";
      containerItemLink.href =
        name[i] === "email" ? `mailto://${link[i]}` : `https://${link[i]}`;
      containerItemName[i] = containerItemName.append(
        nameWithUpperFirstLetter(name[i])
      );
      containerItemLink[i] = containerItemLink.append(link[i]);
      containerItem.append(containerItemName, containerItemLink);
      userLinksContainer[0].append(containerItem);
    }
  });
})();
