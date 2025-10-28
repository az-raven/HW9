// HW7
// step 1
console.log("Hello world!");

// step 2
function resumeDownloaded() {
	// incrementDownloadCounter();

	if (hasDownloadedResume)
		return;

	hasDownloadedResume = true;

	// extra credit 1
	setTimeout(showResumeAlert, 2000);

}

function showResumeAlert() {
	alert("Your resume is downloaded successfully!");
}

// step 3
const myName = "Rose";
let hasDownloadedResume = false;

// step 4
function showGreeting(name) {
	// extra credit 2
	const date = new Date();
	const time = date.getHours();

	if (time < 12) {
		// morning: 00:00 - 12:00
		return `Good morning, my name is ${name}! Welcome to my portfolio!`;
	} else if (time < 16) {
		// afternoon: 12:00 - 16:00
		return `Good afternoon, my name is ${name}! Welcome to my portfolio!`;
	} else {
		// evening: 17:00 - 23:59
		return `Good evening, my name is ${name}! Welcome to my portfolio!`;
	}
}
$("#greeting").text(showGreeting(myName));

const education = [
	{
		location: "Northern Arizona University",
		date: "2025 - 2028",
		description: "I am currently working towards a Bachelor's of Science in Computer Science with honors at Northern Arizona University, with an expected graduation in Spring 2028."
	},
	{
		location: "Cochise College",
		date: "2023 - 2025",
		description: "After graduating from high school at 15, I enrolled at Cochise College in the Spring 2023 semester. In Spring 2025, I earned an Associate's of Applied Science with honors in Computer Programming, specializing in Virtual Reality Development. I was also one of four students nominated by Cochise College for the 2025 All-Arizona Academic Team scholarship."
	}
];

const experience = [
	{
		location: "Subsurface Studios",
		date: "2021 - present",
		description: "In early 2021 I founded the indie game development team Subsurface Studios along with one other developer. I worked alongside this team to create Compensation Social as well as a large number of internal prototypes."
	},
	{
		location: "Anycompany LLC",
		date: "2006-2026",
		description: "This is a placeholder entry to show that the system for populating both tables is functional."
	}
];


// HW9
// Step 1: Skill List
let skills = [
	{
		title: "C#",
		duration: 7 // years
	},
	{
		title: "JavaScript",
		duration: 4
	},
	{
		title: "C",
		duration: 3
	},
	{
		title: "GDScript",
		duration: 2
	}
];

$("#add-skill-button").click(() => {
	// get the skill's name from the form
	const skillName = $("#add-skill-name").val();
	const skillLower = skillName.toLowerCase();
	
	// get the skill's number of years from the form
	const skillYears = $("#add-skill-years").val();
	
	let index = skills.findIndex(
		element => element.title.toLowerCase() === skillLower
	);

	if (index < 0) {
		// if the skill isn't already in the array, add it
		skills.push({
			title: skillName,
			duration: skillYears
		});
	} else {
		// if it is already present, simply modify the date
		skills[index].duration = skillYears;
	}

	// update the skills list
	regenerateSkills();
});

function regenerateSkills() {
	// clear child elements
	$("#skill-list").empty();

	// generate new skill elements
	for (let i = 0; i < skills.length; i++)
	{
		const skill = skills[i];

		const name = $(`<b></b>`);
		name.text(skill.title);

		const listElement = $("<li></li>");
		listElement.text(` - ${skill.duration} years`);
		listElement.prepend(name);

		listElement.append(" ");

		// 1.1
		const edit = $('<input type="button" value="Edit">');
		edit.click(() => editSkill(skill.title));
		listElement.append(edit);

		listElement.append(" ");
		
		// 1.2
		const remove = $('<input type="button" value="Remove">');
		remove.click(() => deleteSkill(skill.title));
		listElement.append(remove);
		
		$("#skill-list").append(listElement);

		listElement.fadeToggle(0);
		listElement.fadeIn(400);
	}
}

function editSkill(skillName) {
	const index = skills.findIndex(
		element => element.title.toLowerCase() === skillName.toLowerCase()
	);

	$("#add-skill-name").val(skills[index].title);
	$("#add-skill-years").val(skills[index].duration);
}

function deleteSkill(skillName) {
	const index = skills.findIndex(
		element => element.title.toLowerCase() === skillName.toLowerCase()
	);

	skills.splice(index);

	regenerateSkills();
}

regenerateSkills();



// Step 2: Navigation Menu

// 2.1
const navigationItems = [
	{
		title: "Summary",
		selector: "#summary"
	},
	{
		title: "Skills",
		selector: "#skills"
	},
	{
		title: "Education",
		selector: "#summary"
	},
	{
		title: "Experience",
		selector: "#experience"
	},
	{
		title: "Projects",
		selector: "#projects"
	},
];

// 2.2
function regenerateNavigation() {
	$(".navbar").empty();

	// generate large navbar
	for (let i = 0; i < navigationItems.length; i++) {
		const container = $('<div class="nav-link btn btn-secondary"></div>');
		container.click(event => {
			event.preventDefault();
			scrollToElement($(navigationItems[i].selector));
		});

		const link = $('<a></a>');
		link.text(navigationItems[i].title);
		container.append(link);

		$(".large.navbar").append(container);
	}

	// generate resume button
	const resumeContainer =
		$('<div class="nav-link btn btn-primary resume-button"></div>');
	
	const resumeLink =
		$('<a target="_blank"></a>');
	resumeLink.text("Resume");
	resumeLink.attr('href', "./Hankins, Rose - Resume.pdf");
	resumeLink.click(() => resumeDownloaded());

	resumeContainer.append(resumeLink);

	$(".large.navbar").append(resumeContainer);

	// copy all elements from the large navbar to the small one
	const children = $(".large.navbar").children();
	for (let i = 0; i < children.length; i++) {
		const element = $(children[i]).clone();
		element.appendTo($(".small.navbar"));
	}
}

// 2.2.1
function scrollToElement(element) {
	$("html, body").animate({
		scrollTop: element.offset().top
	}, "slow");
}

// generate initial navigation
regenerateNavigation();



// Step 3: Projects Section

// Step 3.1
const projects = [
	{
		title: "CS 408H",
		description:
			"In the Summer 2026 term, I intend to complete an internship for academic" +
			"credit towards my Honors Capstone, which will most likely start on 1 June 2025.",
		deadline: new Date("1 June 2026"),
		imageSource: "assets/vrd244-3.png"
	},
	{
		title: "VRD 264",
		description:
			"While taking VRD 264 at Cochise College, I created a " +
			"number of advanced and interconnecting systems. This included " +
			"a completely bespoke set of vehicle physics, " +
			"a realistic firearms system complete with weapon jamming & accurate holographic sight parallax, " +
			"a physically-based construction system using a saw & nailgun, " +
			"a bespoke humanoid and vehicle navigation system, and more.",
		deadline: new Date("1 May 2025"),
		imageSource: "assets/vrd244-1.png"
	},
	{
		title: "VRD 144",
		description:
			"During my time in VRD 144 at Cochise College, I created a fully" +
			"physics-based player rig for VR games. The rig integrated physically-based" +
			"climbing, grabbing, and movement, creating emergent and intuitive game mechanics from simple behavior. " +
			"These mechanics included functional ice climbing using ice axes, sliding down a zipline with a crowbar, " +
			"and climbing a radio broadcast tower in VR.",
		deadline: new Date("1 December 2024"),
		imageSource: "assets/vrd144-1.png"
	},
	{
		title: "Compensation Social",
		description:
			"Compensation Social was a live-service multiplayer VR game I developed " +
			"for the Meta Quest series of headsets as well as tethered VR. I worked " +
			"alongside a small team of developers as the lead backend developer and head artist. I developed and maintained " +
			"the backend system the game used to manage player data over the course of the game's 3-year lifecycle. I also " +
			"developed the UGC creation tools of the game, which were -at the time- " +
			"entirely unmatched on standalone VR. At its peak, Compensation amassed over " +
			"200 registered users.",
		deadline: new Date("31 December 2023"),
		imageSource: "assets/cvr-2.jpg"
	}
];

$('#reverse-order').change(() => regenerateProjects());

function regenerateProjects() {
	const reverse = $('#reverse-order').prop('checked');

	projects.sort(
		(a, b) => reverse
			? b.deadline - a.deadline
			: a.deadline - b.deadline
	);

	$("#project-list").empty();
	for (let i = 0; i < projects.length; i++) {
		const card = $('<div class="card project"></div>');

		const img = $('<img class="card-img-top">');
		img.attr("src", projects[i].imageSource);
		card.append(img);

		const body = $('<div class="card-body"></div>');
		card.append(body);

		const title = $('<h3 class="project-header card-title"></h3>');
		const date = new Date(projects[i].deadline);
		if (date < new Date()) {
			title.text(`${projects[i].title} • Completed (${projects[i].deadline.toDateString()})`);
		} else {
			title.text(`${projects[i].title} • Upcoming (${projects[i].deadline.toDateString()})`);
		}
		body.append(title);

		const p = $('<p class="card-text"></p');
		p.text(projects[i].description);
		body.append(p);

		$("#project-list").append(card);
	}
}
regenerateProjects();

// generate education and experience sections

function regenerateEducation() {
	for (let i = 0; i < education.length; i++) {
		const entry = education[i];

		const row = $('<tr></tr>');

		const location = $('<td></td>');
		location.text(entry.location);
		row.append(location);

		const date = $('<td class="date"></td>');
		date.text(entry.date);
		row.append(date);

		const description = $("<p></p>");
		description.text(entry.description);
		row.append(description);

		$("#education-table").append(row);
	}
}
regenerateEducation();


function regenerateExperience() {
	for (let i = 0; i < experience.length; i++) {
		const entry = experience[i];

		const row = $("<tr></tr>");

		const location = $("<td></td>");
		location.text(entry.location);
		row.append(location);

		const date = $('<td class="date"></td>');
		date.text(entry.date);
		row.append(date);

		const description = $("<p></p>")
		description.text(entry.description);
		row.append(description);

		$("#experience-table").append(row);
	}
}
regenerateExperience();

// Step 4
$("#add-skill-name").on('keydown', event => {
	switch (event.which) {
		case 13: // Enter
			$("#add-skill-button").click();
			break;
		case 27: // Escape
			$("#add-skill-name").val("");
			$("#add-skill-years").val(1);
			break;
	}
});

