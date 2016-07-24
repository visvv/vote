var User = function (name, type, value) {
	this.name = name;
	this.type = type;
	this.value = value;
}

var Block = function (code, msg) {
	this.code = code;
	this.msg = msg;
}

var team = {
	master : {},
	member : []
}

var teams = {};
function createTeam(teamName, masterName) {
	if (teams[teamName]) {
		console.log('Team already exists');
		return new Block(404, 'Team already exists');
	}
	teams[teamName] = {
		master : new User(masterName, 'MASTER', undefined),
		member : []
	};
	return new Block(200, 'Team created Succcessfully');
}

function deleteTeam(teamName) {
	if (teams[teamName]) {
		teams[teamName] = undefined;
		return new Block(200, 'Team deleted');
	} else {
		return new Block(404, 'Team not found');
	}
}

function addMemeber(teamName, user) {
	var team = teams[teamName];

	if (team) {
		var members = team.member;
		for (var i in members) {
			if (members[i].name == user.name) {
				console.log('User already exists');
				return new Block(404, 'Memeber already exists for this user');
			}
		}
		team.member.push(user);
		// update status to master
		return new Block(200, 'User has been added to the team');
	} else
		return new Block(404, 'Team not found');
}

function doPoll(teamName, memberName, pollValue) {
	var team = teams[teamName];
	if (team) {
		var members = team.member;
		for (var i in members) {
			if (members[i].name == memberName) {
				members[i].value = pollValue;
				return new Block(200, 'Poll value added for ' + memberName);
			}
		}
	}
}

function restAllMemebers(teamName) {
	var team = teams[teamName];
	if (team) {
		var members = team.member;
		for (var i in members) {
			members[i].value = undefined;
		}
	}
}