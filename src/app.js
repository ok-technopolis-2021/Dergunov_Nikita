
class SkillsHandler {
    skills;
    arrayOfSkills;

    constructor() {
        this.arrayOfSkills = document.querySelector(".skills-list");
        this.skills = [
            new Skill("C++", 30, "0C++"),
            new Skill("Java", 40, "1Java"),
            new Skill("Python", 25, "2Python"),
            new Skill("JavaScript", 1, "3JavaScript"),
            new Skill("Do not sleep", 100, "4Do not sleep"),
        ];
        this.show();
    }

    addNewSkillItem(skill) {
        if (Number.isInteger(skill.ratio)) {
            alert("Ratio must be integer number (from 0 to 100 percent)!");
            return;
        }
        if (skill.ratio > 100 || skill.ratio < 0) {
            alert("Please input correct skill ratio (from 0 to 100 percent)!");
            return;
        }
        for (let i = 0; i < this.skills.length; i++) {
            if (this.skills[i].name === skill.name) {
                if (this.skills[i].ratio === skill.ratio) {
                    return;
                }
                this.skills[i].ratio = skill.ratio
                this.rewriteSkill(i);
                return;
            }
        }
        if (this.skills.length >= 5) {
            alert("The maximum number of skills on the page has been reached (5)!");
            return;
        }
        this.skills.push(skill);
        this.createSkill(this.skills.length - 1);
    }

    deleteSkill(skillNode) {
        this.skills.splice(skillNode.id, 1);
        skillNode.parentNode.remove();
    }

    show() {
        this.arrayOfSkills.innerHTML = "";
        for (let i = 0; i < this.skills.length; i++) {
            this.createSkill(i);

        }
    }

    rewriteSkill(numberOfSkill) {
        let skillRatio =  document.getElementById(numberOfSkill + this.skills[numberOfSkill].name
            + "skill-percent")
        let progressbarStrip = document.getElementById(numberOfSkill + this.skills[numberOfSkill].name
            + "progress-bar-strip");
        skillRatio.innerText = this.skills[numberOfSkill].ratio + "%";
        progressbarStrip.style.width = skillRatio.innerText;
    }

    createSkill(numberOfSkill) {
        let skillItem = document.createElement("section");
        let skillItemBox = document.createElement("div");
        let skillTitle = document.createElement("div");
        let skillName = document.createElement("span");
        let skillRatio = document.createElement("span");
        let progressbar = document.createElement("div");
        let progressbarStrip = document.createElement("span");
        let skillsButton = document.createElement("div");
        this.instantClassesAndId(skillItem, numberOfSkill, skillItemBox, skillTitle, progressbar, skillsButton,
            progressbarStrip, skillRatio);

        skillName.innerText = this.skills[numberOfSkill].name;
        skillRatio.innerText = this.skills[numberOfSkill].ratio + "%";
        progressbarStrip.style.width = skillRatio.innerText;

        this.installingDependencies(skillItem, skillItemBox, skillsButton, skillTitle, skillName, skillRatio,
            progressbar, progressbarStrip);

        skillsButton.addEventListener("click", () => {
            skillsHandler.deleteSkill(skillsButton);
        });

        this.arrayOfSkills.appendChild(skillItem);
    }

    installingDependencies(skillItem, skillItemBox, skillsButton, skillTitle, skillName, skillRatio, progressbar, progressbarStrip) {
        skillItem.appendChild(skillItemBox);
        skillItem.appendChild(skillsButton);
        skillItemBox.appendChild(skillTitle);
        skillTitle.appendChild(skillName);
        skillTitle.appendChild(skillRatio);
        skillItemBox.appendChild(progressbar);
        progressbar.appendChild(progressbarStrip);
    }

    instantClassesAndId(skillItem, numberOfSkill, skillItemBox, skillTitle, progressbar, skillsButton, progressbarStrip, skillRatio) {
        skillItem.classList.add("skills-item");
        skillItem.id = numberOfSkill + this.skills[numberOfSkill].name
        skillItemBox.classList.add("skills-item-inner");
        skillTitle.classList.add("skill-item-title");
        progressbar.classList.add("progress-bar");
        skillsButton.classList.add("__minus-image");
        progressbarStrip.classList.add("progress-bar-strip")

        skillRatio.id = numberOfSkill + this.skills[numberOfSkill].name + "skill-percent"
        progressbarStrip.id = numberOfSkill + this.skills[numberOfSkill].name + "progress-bar-strip"
        skillsButton.id = numberOfSkill;
    }
}


class Skill {
    constructor(name, ratio, id) {
        this.name = name;
        this.ratio = ratio;
        this.id = id;
    }
}

const newSkillButton = document.getElementById("add-new-skill");
const addBlock = document.querySelector(".skill-add_dialog");
const addForm = document.forms[0];
const inputs = addForm.getElementsByClassName("skills__input");

addForm.addEventListener("submit", addNewSkillItem);

skillsHandler = new SkillsHandler();

function addNewSkillItem(event) {
    event.preventDefault();
    skillsHandler.addNewSkillItem(new Skill(inputs[0].value, inputs[1].value));
    addForm.reset();
    addBlock.classList.add("__hidden");
}

newSkillButton.addEventListener("click", () => {addBlock.classList.toggle("__hidden");});

document.addEventListener("DOMContentLoader", changeTheme, changePage);
function changeTheme() {
    let body = document.querySelector("body").classList
    body.toggle("dark-theme")
    body.toggle("light-theme")
}

function changePage() {
    let fileName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
    if (fileName === "index.html") {
        document.location = "skills.html"
    } else {
        document.location = "index.html"
    }
}