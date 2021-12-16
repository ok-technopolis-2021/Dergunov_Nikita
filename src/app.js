
class SkillView {
    skill

    skillItem;
    skillItemBox;
    skillTitle;
    skillName;
    skillRatio;
    progressbar;
    progressbarStrip;
    skillsButton;

    constructor(skill) {
        this.skill = skill;

        this.skillItem = document.createElement("section");
        this.skillItemBox = document.createElement("div");
        this.skillTitle = document.createElement("div");
        this.skillName = document.createElement("span");
        this.skillRatio = document.createElement("span");
        this.progressbar = document.createElement("div");
        this.progressbarStrip = document.createElement("span");
        this.skillsButton = document.createElement("div");
        this.instantClassesAndId();

        this.skillName.innerText = skill.name;
        this.skillRatio.innerText = skill.ratio + "%";
        this.progressbarStrip.style.width = this.skillRatio.innerText;

        this.installingDependencies();

        this.skillsButton.addEventListener("click", () => {
            skillsHandler.deleteSkill(this.skillsButton);
        });
    }

    getSkillItem() {
        return this.skillItem;
    }

    installingDependencies() {
        this.skillItem.appendChild(this.skillItemBox);
        this.skillItem.appendChild(this.skillsButton);
        this.skillItemBox.appendChild(this.skillTitle);
        this.skillTitle.appendChild(this.skillName);
        this.skillTitle.appendChild(this.skillRatio);
        this.skillItemBox.appendChild(this.progressbar);
        this.progressbar.appendChild(this.progressbarStrip);
    }

    instantClassesAndId() {
        this.skillItem.classList.add("skills-item");
        this.skillItem.id = this.skill.id + this.skill.name;
        this.skillItemBox.classList.add("skills-item-inner");
        this.skillTitle.classList.add("skill-item-title");
        this.progressbar.classList.add("progress-bar");
        this.skillsButton.classList.add("__minus-image");
        this.progressbarStrip.classList.add("progress-bar-strip")

        this.skillRatio.id = this.skill.id + this.skill.name + "skill-percent"
        this.progressbarStrip.id = this.skill.id + this.skill.name + "progress-bar-strip"
        this.skillsButton.id = this.skill.id;
    }

    rewriteSkill(ratioOfSkill) {
        this.skill.ratio = ratioOfSkill;

        this.skillRatio =  document.getElementById(this.skill.id + this.skill.name + "skill-percent")
        this.progressbarStrip = document.getElementById(this.skill.id + this.skill.name + "progress-bar-strip");
        this.skillRatio.innerText = ratioOfSkill + "%";
        this.progressbarStrip.style.width = this.skillRatio.innerText;
    }

}


class SkillsHandler {
    skills;
    arrayOfViewsSkill;
    presentationSkills;

    constructor() {
        this.presentationSkills = document.querySelector(".skills-list");
        this.arrayOfViewsSkill = [];
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
                this.arrayOfViewsSkill[i].rewriteSkill(this.skills[i].ratio);
                return;
            }
        }
        if (this.skills.length >= 5) {
            alert("The maximum number of skills on the page has been reached (5)!");
            return;
        }
        skill.id = this.skills.length + skill.name;
        this.skills.push(skill);
        this.arrayOfViewsSkill.push(new SkillView(skill));
        this.presentationSkills.appendChild(this.arrayOfViewsSkill[this.skills.length - 1].getSkillItem());
    }

    deleteSkill(skillNode) {
        this.skills.splice(skillNode.id, 1);
        this.arrayOfViewsSkill.splice(skillNode.id, 1);
        skillNode.parentNode.remove();
    }

    show() {
        this.presentationSkills.innerHTML = "";
        for (let i = 0; i < this.skills.length; i++) {
            this.arrayOfViewsSkill.push(new SkillView(this.skills[i]));
            this.presentationSkills.appendChild(this.arrayOfViewsSkill[i].getSkillItem());
        }
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